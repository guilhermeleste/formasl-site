#!/usr/bin/env python3
"""Produce a Cloudflare Pages static artifact from approved Forma sources.

This script never alters the original FormaSL repository. For mdBook, it stages
only the required documentation, projection builder, and referenced artifacts.
It fails closed on missing assets, incorrect source revisions, or build failures.
"""
from __future__ import annotations

import argparse
import hashlib
import html
import json
import os
import posixpath
import re
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit
from xml.sax.saxutils import escape as xml_escape

HERE = Path(__file__).resolve().parent.parent
DEFAULT_SITE = HERE / "public-src" / "site"
LOCALES = ("pt", "en", "zh-CN")
REPO_URL = "https://github.com/guilhermeleste/FormaSL"
DOC_STYLES = HERE / "docs-theme" / "forma-docs.css"
DOC_TOC = HERE / "docs-theme" / "forma-docs-toc.js"
SITE_NAME = "Forma"
OG_IMAGE_PATH = "/assets/mineral-claro-02.webp"
OG_LOCALE = {"pt": "pt_BR", "en": "en_US", "zh-CN": "zh_CN"}
# Cloudflare injects the single beacon with its same-origin collector.
# A manual copy initializes first and bypasses that collector.
CSP_POLICY = (
    "default-src 'self'; "
    "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; "
    "style-src 'self' 'unsafe-inline'; "
    "img-src 'self' data:; "
    "font-src 'self' data:; "
    "connect-src 'self' https://cloudflareinsights.com https://*.cloudflareinsights.com; "
    "object-src 'none'; base-uri 'self'; form-action 'none'; "
    "frame-ancestors 'none'; upgrade-insecure-requests"
)


def canonical_suffix(rel_path: str) -> str:
    """Cloudflare Pages serves the canonical form without .html; index.html -> directory."""
    if rel_path.endswith("/index.html"):
        return rel_path[: -len("index.html")]
    if rel_path.endswith(".html"):
        return rel_path[: -len(".html")]
    return rel_path


def canonical_page_url(origin: str | None, rel_path: str) -> str | None:
    if not origin:
        return None
    return origin + "/" + canonical_suffix(rel_path)


def _extract_tag(markup: str, pattern: str) -> str | None:
    found = re.search(pattern, markup)
    if not found:
        return None
    return html.unescape(found.group(1)).strip() or None


def social_head_markup(origin: str, canonical_url: str, locale: str, markup: str,
                       og_type: str = "website") -> str:
    """Open Graph / Twitter metadata, derived only from existing page metadata."""
    title = _extract_tag(markup, r"<title[^>]*>(.*?)</title>")
    description = _extract_tag(markup, r'<meta\s+name="description"\s+content="([^"]*)"')
    image = origin + OG_IMAGE_PATH
    parts = [
        '<meta property="og:site_name" content="' + html.escape(SITE_NAME, quote=True) + '">',
        '<meta property="og:type" content="' + og_type + '">',
        '<meta property="og:url" content="' + html.escape(canonical_url, quote=True) + '">',
        '<meta property="og:image" content="' + html.escape(image, quote=True) + '">',
        '<meta property="og:locale" content="' + OG_LOCALE[locale] + '">',
    ]
    if title:
        parts.append('<meta property="og:title" content="' + html.escape(title, quote=True) + '">')
        parts.append('<meta name="twitter:title" content="' + html.escape(title, quote=True) + '">')
    if description:
        parts.append('<meta property="og:description" content="' + html.escape(description, quote=True) + '">')
        parts.append('<meta name="twitter:description" content="' + html.escape(description, quote=True) + '">')
    for alternate in LOCALES:
        if alternate != locale:
            parts.append('<meta property="og:locale:alternate" content="' + OG_LOCALE[alternate] + '">')
    parts.append('<meta name="twitter:card" content="summary_large_image">')
    parts.append('<meta name="twitter:image" content="' + html.escape(image, quote=True) + '">')
    return "\n".join(parts)


def file_hash(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def git_head(repo: Path) -> str | None:
    result = subprocess.run(
        ["git", "-C", str(repo), "rev-parse", "HEAD"],
        capture_output=True, text=True, check=False,
    )
    value = result.stdout.strip()
    return value if result.returncode == 0 and re.fullmatch(r"[0-9a-f]{40}", value) else None


def validate_origin(origin: str | None) -> str | None:
    if not origin:
        return None
    parsed = urlsplit(origin)
    if parsed.scheme != "https" or not parsed.netloc or parsed.path not in ("", "/"):
        raise ValueError("--origin must be an HTTPS origin without path or query")
    if parsed.username or parsed.password or parsed.query or parsed.fragment:
        raise ValueError("--origin must not include credentials, query, or fragment")
    return origin.rstrip("/")


def copy_site(source: Path, dest: Path) -> None:
    required = [source / "index.html", source / "assets" / "style.css", source / "assets" / "main.js"]
    for item in required:
        if not item.is_file():
            raise FileNotFoundError(f"Approved site source is incomplete: {item}")
    dest.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source / "index.html", dest / "index.html")
    shutil.copytree(source / "assets", dest / "assets")
    expected_names = None
    for locale in LOCALES:
        locale_root = source / locale
        if not locale_root.is_dir():
            raise FileNotFoundError(f"Missing locale: {locale_root}")
        shutil.copytree(locale_root, dest / locale)
        pages = {p.relative_to(locale_root).as_posix() for p in locale_root.rglob("*.html")}
        if expected_names is None:
            expected_names = pages
        elif pages != expected_names:
            raise ValueError(f"Locale {locale} has a different URL surface")
        if len(pages) != 23:
            raise ValueError(f"Locale {locale} should contain 23 pages; found {len(pages)}")


def update_site_html(out: Path, origin: str | None, ref: str | None) -> int:
    count = 0
    for locale in LOCALES:
        for page in sorted((out / locale).rglob("*.html")):
            page_path = page.relative_to(out).as_posix()
            markup = page.read_text(encoding="utf-8")
            if origin:
                canonical = canonical_page_url(origin, page_path)
                assert canonical is not None
                page_dir = posixpath.dirname(page_path)
                hreflang_regex = re.compile(
                    r'(<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href=")([^"]+)(")')

                def absolutize(match: re.Match[str]) -> str:
                    lang = match.group(2)
                    href = match.group(3)
                    if href.startswith("http:") or href.startswith("https:"):
                        return match.group(0)
                    if lang == "x-default":
                        absolute = origin + "/"
                    else:
                        target_rel = posixpath.normpath(posixpath.join(page_dir, href))
                        absolute = origin + "/" + canonical_suffix(target_rel)
                    return match.group(1) + html.escape(absolute, quote=True) + match.group(4)

                markup = hreflang_regex.sub(absolutize, markup)
                if 'rel="canonical"' not in markup:
                    markup = markup.replace("</head>",
                        '<link rel="canonical" href="' + html.escape(canonical, quote=True) + '">\n</head>', 1)
                head_injection = social_head_markup(origin, canonical, locale, markup)
                markup = markup.replace("</head>", head_injection + "\n</head>", 1)
            if ref:
                markup = markup.replace(REPO_URL + "/blob/master/", REPO_URL + "/blob/" + ref + "/")
                markup = markup.replace(REPO_URL + "/tree/master/", REPO_URL + "/tree/" + ref + "/")
            page.write_text(markup, encoding="utf-8")
            count += 1
    return count


def copy_safe(src: Path, dst: Path) -> None:
    if src.is_dir():
        shutil.copytree(src, dst, dirs_exist_ok=True, ignore=shutil.ignore_patterns(".git", "book"))
    elif src.is_file():
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
    else:
        raise FileNotFoundError(f"Missing projection reference in source repo: {src}")


def staged_docs_repository(repo: Path, stage: Path) -> Path:
    """Copy the original mdBook plus its projection dependencies, not the repo tree."""
    repo = repo.resolve(strict=True)
    book = repo / "docs" / "book"
    publication = repo / "scripts" / "book-publication"
    if not (book / "book.toml").is_file() or not (book / "src" / "SUMMARY.md").is_file():
        raise FileNotFoundError("FormaSL docs/book/book.toml or src/SUMMARY.md was not found")
    if not (publication / "build_projected.py").is_file() or not (publication / "map.json").is_file():
        raise FileNotFoundError("Required official projection builder is not present")
    staged_book = stage / "docs" / "book"
    staged_book.parent.mkdir(parents=True, exist_ok=True)
    shutil.copytree(book, staged_book,
        ignore=shutil.ignore_patterns("book", "proj", ".git", "__pycache__"))
    staged_pub = stage / "scripts" / "book-publication"
    staged_pub.parent.mkdir(parents=True, exist_ok=True)
    shutil.copytree(publication, staged_pub,
        ignore=shutil.ignore_patterns("proj-manifest.json", "__pycache__", ".git"))
    links = json.loads((publication / "map.json").read_text(encoding="utf-8"))
    repo_real = repo.resolve()
    for group in links.values():
        for info in group.values():
            if not isinstance(info, dict) or info.get("no_copy"):
                continue
            relative = Path(info["repo_target"])
            if relative.is_absolute() or ".." in relative.parts:
                raise ValueError(f"Unsafe projection path: {relative}")
            src = (repo / relative).resolve()
            if not src.is_relative_to(repo_real):
                raise ValueError(f"Projection path escapes source repository: {relative}")
            dst = stage / relative
            if dst.exists():
                continue
            copy_safe(src, dst)
    return staged_book


def docs_crumb_markup(locale: str) -> str:
    if locale == "en":
        label, status = "Technical edition: English", "English technical edition"
    else:
        label, status = "Edicao derivada: portugues", "Portuguese derivative edition"
    return (
        '<nav class="forma-docs-breadcrumb" aria-label="Forma documentation links">'
        '<span><a href="/' + locale + '/documentacao.html"><span class="forma-docs-brand">FORMA.</span>'
        ' ' + html.escape(label) + '</a></span>'
        '<span class="forma-docs-languages"><a href="/docs/en/index.html">EN</a>'
        '<a href="/docs/pt/index.html">PT</a><a href="/docs/zh-CN/index.html">&#31616;&#20307;&#20013;&#25991;</a></span>'
        '<span class="forma-docs-state">' + html.escape(status) + '</span>'
        '</nav>'
    )


def brand_mdbook(doc_out: Path, origin: str | None) -> dict:
    shutil.copy2(DOC_STYLES, doc_out / "forma-docs.css")
    shutil.copy2(DOC_TOC, doc_out / "forma-docs-toc.js")
    changed = 0
    with_crumb = 0
    pages = sorted(doc_out.rglob("*.html"))
    if not (doc_out / "index.html").exists():
        raise RuntimeError("mdBook did not generate index.html")
    for page in pages:
        relative = page.relative_to(doc_out)
        lang = "en" if relative.parts[0] == "en" else "pt-BR"
        locale = "en" if lang == "en" else "pt"
        markup = page.read_text(encoding="utf-8")
        if "</head>" not in markup:
            raise RuntimeError(f"Invalid HTML from mdBook: {page}")
        if 'href="/docs/forma-docs.css"' not in markup:
            markup = markup.replace("</head>",
                '<link rel="stylesheet" href="/docs/forma-docs.css">\n'
                '<script src="/docs/forma-docs-toc.js" defer></script>\n</head>', 1)
        markup = re.sub(r'(<html\b[^>]*\blang=)[\"\'][^\"\']+[\"\']',
                        lambda m: m.group(1) + '"' + lang + '"', markup, count=1)
        main = re.search(r"<main\b[^>]*>", markup, re.IGNORECASE)
        if main and page.name not in {"404.html", "print.html"}:
            markup = markup[:main.end()] + '\n' + docs_crumb_markup(locale) + markup[main.end():]
            with_crumb += 1
        if origin:
            current = canonical_page_url(origin, "docs/" + relative.as_posix())
            assert current is not None
            if 'rel="canonical"' not in markup:
                markup = markup.replace("</head>",
                    '<link rel="canonical" href="' + html.escape(current, quote=True) + '">\n</head>', 1)
            head_injection = social_head_markup(origin, current, "en" if lang == "en" else "pt",
                                                markup, og_type="article")
            markup = markup.replace("</head>", head_injection + "\n</head>", 1)
        page.write_text(markup, encoding="utf-8")
        changed += 1
    return {"themed_pages": changed, "branded_chapter_breadcrumbs": with_crumb}


def build_docs(repo: Path, destination: Path, origin: str | None) -> dict:
    mdbook = shutil.which("mdbook")
    if not mdbook:
        raise RuntimeError("mdbook binary unavailable; install mdbook 0.5.2 before --docs-repo")
    with tempfile.TemporaryDirectory(prefix="forma-docs-stage-") as tmp:
        stage = Path(tmp)
        staged_book = staged_docs_repository(repo, stage)
        subprocess.run([sys.executable, str(stage / "scripts/book-publication/build_projected.py")],
                       cwd=stage, check=True)
        destination.mkdir(parents=True, exist_ok=True)
        subprocess.run([mdbook, "build", str(staged_book), "--dest-dir", str(destination.resolve())],
                       cwd=staged_book, check=True)
    stats = brand_mdbook(destination, origin)
    if not (destination / "en" / "conceitos-02-modelo-de-mundo.html").is_file():
        raise RuntimeError("Expected English world-model chapter missing from built mdBook")
    return stats


def link_published_chapters(out: Path) -> dict:
    """Change GitHub markdown links to compiled manual only when target exists."""
    changed = 0
    left = 0
    src_prefix = REPO_URL + "/blob/"
    # Ref may be master or a 40-hex SHA. Rewrites are gated by actual output paths.
    rx = re.compile(r'https://github\.com/guilhermeleste/FormaSL/blob/(?:master|[0-9a-f]{40})/docs/book/src/([^"#?\s]+\.md)')
    for locale in LOCALES:
        for page in (out / locale).rglob("*.html"):
            markup = page.read_text(encoding="utf-8")
            def repl(match):
                nonlocal changed, left
                stem = match.group(1)
                candidates = ["docs/" + stem[:-3] + ".html"]
                if stem == "README.md":
                    candidates.append("docs/index.html")
                for dest in candidates:
                    if (out / dest).is_file():
                        changed += 1
                        return "/" + dest
                left += 1
                return match.group(0)
            markup = rx.sub(repl, markup)
            page.write_text(markup, encoding="utf-8")
    return {"compiled_links": changed, "remaining_github_markdown_links": left}


def doc_entry_page(lang: str, docs_built: bool, origin: str | None) -> str:
    entries = {
        "pt": ("Documentacao Forma", "Edicao portuguesa derivada.", "/docs/index.html", "Abrir manual em portugues"),
        "en": ("Forma documentation", "English is the primary technical edition.", "/docs/en/README.html", "Open the English manual"),
        "zh-CN": ("Forma \u6280\u672f\u6587\u6863", "\u7b80\u4f53\u4e2d\u6587\u5b8c\u6574\u6280\u672f\u6587\u6863\u5c1a\u672a\u53d1\u5e03\u3002\u4ee5\u82f1\u6587\u6280\u672f\u7248\u4e3a\u53c2\u8003\u3002", "/docs/en/README.html", "\u67e5\u770b\u82f1\u6587\u624b\u518c"),
    }
    title, message, target, cta = entries[lang]
    if not docs_built:
        message = {
            "pt": "Manual mdBook nao incluido neste build. Consulte as fontes no repositorio.",
            "en": "mdBook was not included in this build. Read the sources in the repository.",
            "zh-CN": "\u672c\u7248\u672a\u96c6\u6210 mdBook\uff0c\u8bf7\u8bbf\u95ee\u6e90\u4ee3\u7801\u4ed3\u5e93\u3002",
        }[lang]
        target = REPO_URL + "/tree/master/docs/book"
    link = "https://" + urlsplit(origin).netloc + target if origin and target.startswith("/docs/") else target
    return ("<!doctype html><html lang=\"" + ("zh-CN" if lang == "zh-CN" else "pt-BR" if lang == "pt" else "en") +
        "\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">"
        "<title>" + html.escape(title) + "</title><link rel=\"stylesheet\" href=\"/assets/style.css\">"
        "</head><body style=\"background:#efe8dd;color:#192122;min-height:100svh;\">"
        "<main style=\"max-width:700px;margin:12vh auto;padding:24px\">"
        "<a href=\"/" + lang + "/documentacao.html\">FORMA. / " + html.escape(title) + "</a>"
        "<h1 style=\"font-size:clamp(44px,8vw,72px);letter-spacing:-.06em;margin:24px 0\">" + html.escape(title) + "</h1>"
        "<p style=\"font-size:20px;line-height:1.6\">" + html.escape(message) + "</p>"
        "<p style=\"margin-top:32px\"><a href=\"" + html.escape(link, quote=True) + "\">" + html.escape(cta) + " &rarr;</a></p>"
        "</main></body></html>")


def add_docs_entrypoints(out: Path, built: bool, origin: str | None) -> None:
    docs = out / "docs"
    docs.mkdir(parents=True, exist_ok=True)
    if not built:
        (docs / "index.html").write_text(doc_entry_page("en", False, origin), encoding="utf-8")
    for lang in LOCALES:
        directory = docs / lang
        directory.mkdir(parents=True, exist_ok=True)
        entry = directory / "index.html"
        if not entry.exists():
            entry.write_text(doc_entry_page(lang, built, origin), encoding="utf-8")


def add_cf_files(out: Path, origin: str | None) -> None:
    (out / "_redirects").write_text(
        "# Intentional short aliases; do not redirect explicit locale URLs automatically.\n"
        "/pt /pt/index.html 302\n/en /en/index.html 302\n/zh-CN /zh-CN/index.html 302\n"
        "/docs/pt /docs/pt/index.html 302\n/docs/en /docs/en/index.html 302\n"
        "/docs/zh-CN /docs/zh-CN/index.html 302\n", encoding="utf-8")
    (out / "_headers").write_text(
        "/*\n  X-Content-Type-Options: nosniff\n  X-Frame-Options: DENY\n"
        "  Referrer-Policy: strict-origin-when-cross-origin\n"
        "  Permissions-Policy: camera=(), microphone=(), geolocation=()\n"
        "  Content-Security-Policy: " + CSP_POLICY + "\n"
        "/assets/*\n  Cache-Control: public, max-age=3600\n"
        "/docs/forma-docs.css\n  Cache-Control: public, max-age=3600\n",
        encoding="utf-8",
    )
    if origin:
        robots = "User-agent: *\nAllow: /\nSitemap: " + origin + "/sitemap.xml\n"
        add_sitemap(out, origin)
    else:
        robots = "User-agent: *\nDisallow: /\n"
    (out / "robots.txt").write_text(robots, encoding="utf-8")
    (out / "404.html").write_text(
        '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        '<meta name="robots" content="noindex"><title>404 - Forma</title>'
        '<link rel="stylesheet" href="/assets/style.css"></head>'
        '<body style="background:#efe8dd;color:#192122"><main style="margin:14vh auto;padding:30px;max-width:700px">'
        '<a href="/">FORMA.</a><h1>404</h1><p>Pagina nao encontrada / Page not found / &#39029;&#38754;&#26410;&#25214;&#21040;</p>'
        '<p><a href="/pt/index.html">Portugues</a> &nbsp; <a href="/en/index.html">English</a> &nbsp; <a href="/zh-CN/index.html">&#31616;&#20307;&#20013;&#25991;</a></p>'
        '</main></body></html>', encoding="utf-8")


def add_sitemap(out: Path, origin: str) -> None:
    entries = []
    for locale in LOCALES:
        for p in sorted((out / locale).rglob("*.html")):
            rel = p.relative_to(out).as_posix()
            alternates = []
            for alt in LOCALES:
                alt_path = f"{alt}/{p.relative_to(out / locale).as_posix()}"
                alternate = f'{origin}/{canonical_suffix(alt_path)}'
                code = "pt-BR" if alt == "pt" else alt
                alternates.append('<xhtml:link rel="alternate" hreflang="' + code + '" href="' + xml_escape(alternate) + '"/>')
            entries.append("<url><loc>" + xml_escape(f"{origin}/{canonical_suffix(rel)}") + "</loc>" + "".join(alternates) + "</url>")
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
        'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + "\n".join(entries) + "\n</urlset>\n")
    (out / "sitemap.xml").write_text(xml, encoding="utf-8")


def run_validator(output: Path, with_docs: bool, release: bool) -> None:
    argv = [sys.executable, str(HERE / "scripts" / "validate.py"), str(output)]
    if with_docs:
        argv.append("--docs")
    if release:
        argv.append("--release")
    subprocess.run(argv, check=True)


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--public", type=Path, default=DEFAULT_SITE)
    p.add_argument("--out", type=Path, default=HERE / "dist")
    p.add_argument("--origin", help="Production HTTPS origin, without a path")
    p.add_argument("--docs-repo", type=Path, help="Disposable checkout of the FormaSL repository")
    p.add_argument("--docs-ref", help="40-digit hexadecimal Git commit of the docs source")
    p.add_argument("--release", action="store_true", help="Enforce production gates")
    p.add_argument("--translations-reviewed", action="store_true",
                   help="Owner sign-off: EN and ZH site translations reviewed by native speakers")
    args = p.parse_args()
    origin = validate_origin(args.origin)
    revision = args.docs_ref or (git_head(args.docs_repo) if args.docs_repo else None)
    if revision and not re.fullmatch(r"[0-9a-f]{40}", revision):
        raise ValueError("--docs-ref must be a 40-hex-character Git commit SHA")
    if args.docs_repo and args.docs_ref:
        repo_revision = git_head(args.docs_repo)
        if repo_revision and repo_revision != args.docs_ref:
            raise ValueError(f"Docs checkout mismatch: expected {args.docs_ref}, observed {repo_revision}")
    if args.release:
        if not origin or not args.docs_repo or not revision or not args.translations_reviewed:
            raise ValueError("--release requires --origin, --docs-repo, --docs-ref, and --translations-reviewed")
    out = args.out.resolve()
    if out.exists():
        shutil.rmtree(out)
    copy_site(args.public.resolve(), out)
    site_count = update_site_html(out, origin, revision)
    docs_stats = None
    if args.docs_repo:
        docs_stats = build_docs(args.docs_repo, out / "docs", origin)
        docs_stats.update(link_published_chapters(out))
    add_docs_entrypoints(out, bool(docs_stats), origin)
    add_cf_files(out, origin)
    manifest = {
        "artifact": "forma-cloudflare-pages",
        "status": "release_candidate" if args.release else "preview_candidate",
        "site_revision": "institutional-v0.6/editorial-v0.11",
        "docs_revision": revision if docs_stats else None,
        "docs_integrated": bool(docs_stats),
        "docs_edition_structure": "one native mdBook output: English under /docs/en/, Portuguese in /docs/",
        "docs_chinese_complete": False,
        "pages_localized": site_count,
        "origin": origin,
        "translations_reviewed": args.translations_reviewed,
        "book_theme": "forma-docs.css" if docs_stats else None,
        "mdbook_stats": docs_stats,
        "site_assets_sha256": {p.name: file_hash(p) for p in sorted((out / "assets").iterdir()) if p.is_file()},
        "build_time_utc": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "notes": ["External Cloudflare deployment and real-device QA remain separate gates"],
    }
    (out / "RELEASE-MANIFEST.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    run_validator(out, bool(docs_stats), args.release)
    print(json.dumps({"out": str(out), **manifest}, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (RuntimeError, ValueError, FileNotFoundError, subprocess.CalledProcessError) as error:
        print(f"BUILD ERROR: {error}", file=sys.stderr)
        raise SystemExit(2)
