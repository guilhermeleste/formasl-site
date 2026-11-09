#!/usr/bin/env python3
"""Fixture test for staging, branding, version gating and release QA (not real mdBook)."""
from __future__ import annotations
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent.parent
SHA = "a" * 40


def main() -> int:
    with tempfile.TemporaryDirectory(prefix="forma-pipeline-fixture-") as raw:
        root = Path(raw)
        repo = root / "source"
        source_book = repo / "docs/book/src"
        source_book.mkdir(parents=True)
        (source_book / "SUMMARY.md").write_text("# Summary\n- [Intro](README.md)\n")
        (source_book / "README.md").write_text("# Intro\nFixture")
        (repo / "docs/book/book.toml").write_text('[book]\nlanguage="pt-BR"\n')
        proj = repo / "scripts/book-publication"
        proj.mkdir(parents=True)
        (proj / "map.json").write_text("{}\n")
        (proj / "build_projected.py").write_text(
            'from pathlib import Path\nPath(__file__).with_name("proj-manifest.json").write_text("{}")\n')
        stubdir = root / "bin"
        stubdir.mkdir()
        mdbook = stubdir / "mdbook"
        mdbook.write_text('''#!/usr/bin/env python3
import sys
from pathlib import Path
out=Path(sys.argv[sys.argv.index('--dest-dir')+1])
out.mkdir(parents=True,exist_ok=True)
html='<html lang="pt-BR"><head><title>Fixture</title></head><body><main><h1>Fixture</h1></main></body></html>'
(out/'index.html').write_text(html)
(out/'en').mkdir()
(out/'en/conceitos-02-modelo-de-mundo.html').write_text(html)
(out/'en/README.html').write_text(html)
for i in range(33): (out/f'ch{i}.html').write_text(html)
''')
        mdbook.chmod(0o755)
        env = os.environ.copy()
        env["PATH"] = str(stubdir) + os.pathsep + env["PATH"]
        build = [sys.executable, str(HERE / "scripts/build.py"),
                 "--out", str(root / "output"), "--docs-repo", str(repo),
                 "--docs-ref", SHA, "--origin", "https://example.invalid",
                 "--translations-reviewed", "--release"]
        completed = subprocess.run(build, capture_output=True, text=True, env=env)
        if completed.returncode:
            print(completed.stdout)
            print(completed.stderr, file=sys.stderr)
            return completed.returncode
        artifact = root / "output"
        manifest = json.loads((artifact / "RELEASE-MANIFEST.json").read_text())
        sample = (artifact / "docs/en/conceitos-02-modelo-de-mundo.html").read_text()
        checks = {
            "built_site": (artifact / "pt/index.html").is_file(),
            "built_docs": manifest["docs_integrated"],
            "branded_mdbook": 'href="/docs/forma-docs.css"' in sample and "forma-docs-breadcrumb" in sample and 'src="/docs/forma-docs-toc.js"' in sample,
            "english_lang": 'lang="en"' in sample,
            "production_sitemap": (artifact / "sitemap.xml").is_file(),
            "sources_unchanged": not (repo / "scripts/book-publication/proj-manifest.json").exists(),
            "localized_canonical": 'rel="canonical" href="https://example.invalid/pt/"' in (artifact / "pt/index.html").read_text(),
            "extensionless_site_links": all(
                not href.endswith(".html")
                for locale in ("pt", "en", "zh-CN")
                for page in (artifact / locale).rglob("*.html")
                for href in re.findall(r'<a\b[^>]*\bhref="([^"]+)"', page.read_text(encoding="utf-8"))
                if not href.startswith(("http:", "https:", "#", "mailto:", "/docs/", "/assets/"))
            ),
            "analytics_owned_by_cloudflare": all(
                "static.cloudflareinsights.com/beacon" not in page.read_text()
                and "data-cf-beacon" not in page.read_text()
                for page in artifact.rglob("*.html")
            ),
        }
        print(json.dumps(checks, indent=2))
        return 0 if all(checks.values()) else 1


if __name__ == "__main__":
    raise SystemExit(main())
