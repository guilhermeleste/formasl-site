#!/usr/bin/env python3
"""Static, fail-closed validation of a Cloudflare Pages release artifact."""
from __future__ import annotations

import argparse
import json
import posixpath
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from xml.etree import ElementTree

LOCALES = ("pt", "en", "zh-CN")
EXPECTED_PAGES = 23


class HtmlRefs(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links = []
        self.ids = set()
        self.duplicate_ids = []
        self.lang = None
        self.headings = 0
        self.image_alts_missing = 0

    def handle_starttag(self, tag, attrs):
        props = dict(attrs)
        ident = props.get("id")
        if ident:
            if ident in self.ids:
                self.duplicate_ids.append(ident)
            self.ids.add(ident)
        if tag == "html":
            self.lang = props.get("lang")
        if tag in {"a", "link"} and props.get("href"):
            self.links.append((tag, props["href"]))
        if tag in {"script", "img", "source"} and props.get("src"):
            self.links.append((tag, props["src"]))
        if tag == "img" and "alt" not in props:
            self.image_alts_missing += 1
        if tag == "h1":
            self.headings += 1


def parse(page):
    parser = HtmlRefs()
    parser.feed(page.read_text(encoding="utf-8"))
    return parser


def resolve_href(root: Path, page: Path, href: str) -> tuple[Path | None, str]:
    parsed = urlsplit(href)
    if parsed.scheme in {"http", "https", "mailto", "tel", "data"} or parsed.netloc:
        return None, ""
    if parsed.scheme or href.lower().strip().startswith("javascript:"):
        raise ValueError("Unsafe or unsupported link scheme: " + href)
    path = unquote(parsed.path)
    if not path:
        return page, unquote(parsed.fragment)
    if path.startswith("/"):
        target = path.lstrip("/")
    else:
        parent = page.parent.relative_to(root).as_posix()
        target = posixpath.normpath(posixpath.join(parent, path))
    if target.startswith("../") or target == "..":
        raise ValueError("Link escapes site root: " + href)
    return root / target, unquote(parsed.fragment)


def verify_site(root: Path, errors: list[str]) -> dict:
    metrics = {"pages": 0, "assets": 0, "links_checked": 0, "anchors_checked": 0}
    if not (root / "assets" / "style.css").is_file():
        errors.append("Missing site stylesheet assets/style.css")
    if not (root / "assets" / "main.js").is_file():
        errors.append("Missing JavaScript assets/main.js")
    if not (root / "index.html").is_file():
        errors.append("Missing language-selection index.html")
    names = None
    cache = {}
    for locale in LOCALES:
        locroot = root / locale
        pages = sorted(locroot.rglob("*.html"))
        relative_names = {p.relative_to(locroot).as_posix() for p in pages}
        if len(relative_names) != EXPECTED_PAGES:
            errors.append(f"Locale {locale}: expected {EXPECTED_PAGES} pages; got {len(relative_names)}")
        if names is None:
            names = relative_names
        elif names != relative_names:
            errors.append(f"Locale {locale} URL inventory differs from another locale")
        for p in pages:
            metrics["pages"] += 1
            try:
                data = parse(p)
                cache[p] = data
            except Exception as exc:
                errors.append(f"Cannot parse {p}: {exc}")
                continue
            expected_lang = {"pt": "pt-BR", "en": "en", "zh-CN": "zh-CN"}[locale]
            if data.lang != expected_lang:
                errors.append(f"Wrong HTML lang in {p}: {data.lang}")
            if data.headings != 1:
                errors.append(f"Expected one h1 in {p}, found {data.headings}")
            if data.duplicate_ids:
                errors.append(f"Duplicate IDs in {p}: {data.duplicate_ids}")
            if data.image_alts_missing:
                errors.append(f"Missing image alt attribute in {p}")
    for page, refs in cache.items():
        for tag, href in refs.links:
            try:
                target, frag = resolve_href(root, page, href)
            except ValueError as exc:
                errors.append(f"{page}: {exc}")
                continue
            if target is None:
                continue
            metrics["links_checked"] += 1
            if target.is_dir():
                target = target / "index.html"
            if not target.is_file():
                errors.append(f"Broken local {tag} link in {page.relative_to(root)}: {href}")
                continue
            if frag:
                metrics["anchors_checked"] += 1
                if target.suffix.lower() == ".html":
                    try:
                        ids = cache[target].ids if target in cache else parse(target).ids
                        if frag not in ids:
                            errors.append(f"Missing anchor #{frag} in {target.relative_to(root)} from {page.relative_to(root)}")
                    except Exception as exc:
                        errors.append(f"Could not check anchor: {exc}")
    metrics["assets"] = len([p for p in (root / "assets").rglob("*") if p.is_file()])
    return metrics


def verify_docs(root: Path, errors: list[str]) -> dict:
    required = [root / "docs" / "index.html",
                root / "docs" / "en" / "conceitos-02-modelo-de-mundo.html",
                root / "docs" / "forma-docs.css",
                root / "docs" / "forma-docs-toc.js"]
    for p in required:
        if not p.is_file():
            errors.append("Missing compiled mdBook file: " + str(p.relative_to(root)))
    data = {"manual_html_pages": len(list((root / "docs").rglob("*.html")))}
    if data["manual_html_pages"] < 30:
        errors.append("The compiled mdBook appears incomplete (<30 HTML files)")
    if required[1].is_file():
        sample = required[1].read_text(encoding="utf-8")
        if 'href="/docs/forma-docs.css"' not in sample:
            errors.append("Docs theme CSS is not referenced by English sample chapter")
        if 'src="/docs/forma-docs-toc.js"' not in sample:
            errors.append("Docs TOC script is not referenced by English sample chapter")
        if 'lang="en"' not in sample:
            errors.append("English documentation sample lacks html lang=en")
    return data


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("output", type=Path)
    ap.add_argument("--docs", action="store_true")
    ap.add_argument("--release", action="store_true")
    ap.add_argument("--report", type=Path)
    args = ap.parse_args()
    output = args.output.resolve()
    errors = []
    if not output.is_dir():
        errors.append("Missing output directory")
        metrics = {}
    else:
        metrics = verify_site(output, errors)
    for required in ("_headers", "_redirects", "robots.txt", "404.html", "RELEASE-MANIFEST.json"):
        if not (output / required).is_file():
            errors.append(f"Missing deployment artifact {required}")
    if args.docs and output.is_dir():
        metrics.update(verify_docs(output, errors))
    if args.release and output.is_dir():
        manifest = json.loads((output / "RELEASE-MANIFEST.json").read_text())
        if not manifest.get("origin") or not manifest.get("docs_integrated") or not manifest.get("translations_reviewed"):
            errors.append("Production release gates missing (origin/docs/native translation review)")
        if not (output / "sitemap.xml").is_file():
            errors.append("Production sitemap absent")
        else:
            try:
                ElementTree.parse(output / "sitemap.xml")
            except Exception as exc:
                errors.append("Malformed sitemap: " + str(exc))
    result = {"status": "PASS" if not errors else "FAIL", "metrics": metrics, "errors": errors}
    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(result, indent=2))
    return 0 if not errors else 1


if __name__ == "__main__":
    raise SystemExit(main())
