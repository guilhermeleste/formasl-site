#!/usr/bin/env python3
"""Run read-only HTTP checks against a deployed Cloudflare Pages URL."""
from __future__ import annotations
import argparse
import json
import sys
from urllib.parse import urlsplit
from urllib.request import Request, urlopen

COMMON = ["/", "/assets/style.css", "/assets/main.js", "/pt/index.html", "/en/index.html",
          "/zh-CN/index.html", "/pt/documentacao.html", "/pt/componente/formagraph.html",
          "/en/formasl.html", "/zh-CN/arquitetura.html"]
DOCS = ["/docs/index.html", "/docs/forma-docs.css",
        "/docs/en/conceitos-02-modelo-de-mundo.html", "/docs/conceitos/02-modelo-de-mundo.html"]


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("origin")
    ap.add_argument("--docs", action="store_true")
    opts = ap.parse_args()
    origin = opts.origin.rstrip("/")
    parsed = urlsplit(origin)
    if parsed.scheme != "https" or not parsed.netloc or parsed.path not in {"", "/"}:
        raise ValueError("Expected HTTPS origin without a path")
    problems = []
    result = []
    for path in COMMON + (DOCS if opts.docs else []):
        url = origin + path
        try:
            request = Request(url, headers={"User-Agent":"Forma-Release-Check/1.0"})
            with urlopen(request, timeout=20) as response:
                body = response.read()
                lang = None
                if path.startswith("/pt/"):
                    lang = 'lang="pt-BR"'
                elif path.startswith("/en/"):
                    lang = 'lang="en"'
                elif path.startswith("/zh-CN/"):
                    lang = 'lang="zh-CN"'
                if response.status != 200 or len(body) < 50:
                    problems.append(f"Bad response: {path} ({response.status}, {len(body)} bytes)")
                if lang and lang.encode() not in body[:500]:
                    problems.append(f"Wrong locale on {path}")
                if not response.headers.get("X-Content-Type-Options"):
                    problems.append(f"Missing security header on {path}")
                result.append({"path":path,"status":response.status,"bytes":len(body)})
        except Exception as exc:
            problems.append(f"{path}: {exc}")
    report = {"status":"PASS" if not problems else "FAIL", "url":origin,
              "checks":result, "errors":problems, "note":"Read-only HTTP checks; manual UI/keyboard/mobile QA remains required"}
    print(json.dumps(report,indent=2,ensure_ascii=False))
    return 0 if not problems else 1

if __name__ == "__main__":
    raise SystemExit(main())
