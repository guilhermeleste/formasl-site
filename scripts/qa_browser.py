#!/usr/bin/env python3
"""Optional Chromium QA. Requires python package playwright and Chromium."""
from __future__ import annotations

import argparse
import http.server
import json
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

PAGES = ("index.html", "fundamentos.html", "formasl.html", "arquitetura.html",
         "ecossistema.html", "documentacao.html")
LOCALES = ("pt", "en", "zh-CN")
SIZES = ((1440, 900), (390, 844))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("directory", type=Path)
    parser.add_argument("--out", type=Path, default=Path("evidence/browser-qa.json"))
    parser.add_argument("--chromium", default="/usr/bin/chromium")
    args = parser.parse_args()
    output = args.out.resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    root = args.directory.resolve()

    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *a, **kw):
            super().__init__(*a, directory=str(root), **kw)
        def log_message(self, *a):
            pass
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base = "http://127.0.0.1:" + str(server.server_port)
    results = []
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True, executable_path=args.chromium,
                args=["--no-sandbox", "--disable-dev-shm-usage"])
            for lang in LOCALES:
                for width, height in SIZES:
                    ctx = browser.new_context(locale={"pt":"pt-BR","en":"en-US","zh-CN":"zh-CN"}[lang], viewport={"width":width,"height":height})
                    page = ctx.new_page()
                    errs = []
                    page.on("pageerror", lambda e, errs=errs: errs.append(str(e)))
                    for document in PAGES:
                        url = f"{base}/{lang}/{document}"
                        response = page.goto(url, wait_until="domcontentloaded")
                        page.wait_for_timeout(120)
                        overflow = page.evaluate("document.documentElement.scrollWidth > window.innerWidth + 2")
                        visible_title = page.locator("h1").first.is_visible()
                        results.append({"lang":lang,"page":document,"viewport":width,
                                        "status":response.status if response else None,"overflow":overflow,
                                        "h1_visible":visible_title,"errors":list(errs)})
                        errs.clear()
                    page.goto(f"{base}/index.html", wait_until="domcontentloaded")
                    page.wait_for_url(f"**/{lang}/index.html")
                    results.append({"locale_detection":lang,"viewport":width,"ok":lang in page.url})
                    ctx.close()
            browser.close()
    finally:
        server.shutdown()
        thread.join(timeout=3)
    failures = [r for r in results if ("status" in r and (r["status"] != 200 or r["overflow"] or not r["h1_visible"] or r["errors"]))
                or ("locale_detection" in r and not r["ok"])]
    summary = {"status":"PASS" if not failures else "FAIL","cases":len(results),"failures":failures}
    output.write_text(json.dumps({"summary":summary,"results":results},indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    print(json.dumps(summary,indent=2))
    return 0 if not failures else 1

if __name__ == "__main__":
    raise SystemExit(main())
