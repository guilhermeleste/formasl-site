#!/usr/bin/env python3
"""Render check with inlined assets when HTTP navigation is sandbox-blocked.

This is a VISUAL-ONLY check, not a replacement for real HTTP browser QA.
"""
from __future__ import annotations
import argparse
import base64
import json
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

PAGES = ("index.html", "fundamentos.html", "formasl.html", "arquitetura.html", "ecossistema.html", "documentacao.html")


def inlined_markup(root: Path, page: Path) -> str:
    markup = page.read_text(encoding="utf-8")
    stylesheet = (root / "assets" / "style.css").read_text(encoding="utf-8")
    for image in (root / "assets").glob("*.webp"):
        data = base64.b64encode(image.read_bytes()).decode("ascii")
        uri = "data:image/webp;base64," + data
        stylesheet = re.sub(r"(?<=\()(['\"]?)(?:\./)?" + re.escape(image.name) + r"\1(?=\))", lambda _: uri, stylesheet)
    markup = re.sub(r'<link\s+rel="stylesheet"\s+href="[^"]*assets/style\.css"\s*/?>',
                    lambda _: "<style>" + stylesheet + "</style>", markup)
    # The inline-document base URL is about:blank; omit navigation scripts.
    markup = re.sub(r'<script\s+src="[^"]*assets/main\.js"\s+defer></script>', "", markup)
    return markup


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("directory", type=Path)
    parser.add_argument("--out", type=Path, default=Path("evidence/browser-inline-qa.json"))
    opts = parser.parse_args()
    root = opts.directory.resolve()
    results = []
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True, executable_path="/usr/bin/chromium",
            args=["--no-sandbox", "--disable-dev-shm-usage"])
        for locale in ("pt", "en", "zh-CN"):
            for viewport in ((1440,900),(390,844)):
                context = browser.new_context(viewport={"width":viewport[0],"height":viewport[1]})
                page = context.new_page()
                errors = []
                page.on("pageerror", lambda e, errors=errors: errors.append(str(e)))
                for name in PAGES:
                    page.set_content(inlined_markup(root, root / locale / name), wait_until="load")
                    page.wait_for_timeout(30)
                    overflow = page.evaluate("document.documentElement.scrollWidth > window.innerWidth + 2")
                    h1 = page.locator("h1").first.is_visible()
                    styled = page.evaluate("getComputedStyle(document.body).backgroundColor")
                    results.append({"locale":locale,"page":name,"viewport":viewport[0],"overflow":overflow,
                                    "h1_visible":h1,"body_background":styled,"js_errors":list(errors),
                                    "type":"inlined-assets-not-http"})
                    errors.clear()
                context.close()
        browser.close()
    errors = [r for r in results if r["overflow"] or not r["h1_visible"] or r["js_errors"] or r["body_background"] == "rgba(0, 0, 0, 0)"]
    report = {"status":"PASS" if not errors else "FAIL","cases":len(results),"limitations":"Browser uses set_content, not HTTP; scripts and CSS are inlined", "failures":errors, "cases_detail":results}
    opts.out.parent.mkdir(parents=True,exist_ok=True)
    opts.out.write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(json.dumps({"status":report["status"],"cases":len(results),"failures":len(errors)},indent=2))
    return 0 if not errors else 1

if __name__ == "__main__":
    raise SystemExit(main())
