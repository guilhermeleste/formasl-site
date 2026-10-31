#!/usr/bin/env python3
"""Test locally served static URLs without external network access."""
from __future__ import annotations
import argparse
import http.server
import json
import threading
from pathlib import Path
from urllib.request import urlopen

URLS = ["/index.html", "/assets/style.css", "/assets/main.js",
        "/pt/index.html", "/en/index.html", "/zh-CN/index.html",
        "/pt/documentacao.html", "/en/componente/formagraph.html",
        "/zh-CN/componente/spatial.html", "/docs/index.html"]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("directory", type=Path)
    opts = parser.parse_args()
    base = opts.directory.resolve()
    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kw):
            super().__init__(*args, directory=str(base), **kw)
        def log_message(self, *args):
            pass
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    worker = threading.Thread(target=server.serve_forever, daemon=True)
    worker.start()
    failures = []
    try:
        origin = f"http://127.0.0.1:{server.server_port}"
        for path in URLS:
            try:
                with urlopen(origin + path, timeout=4) as result:
                    payload = result.read()
                    if result.status != 200 or len(payload) < 50:
                        failures.append([path, result.status, len(payload)])
            except Exception as exc:
                failures.append([path, str(exc)])
    finally:
        server.shutdown()
        worker.join(timeout=3)
    print(json.dumps({"smoke": "PASS" if not failures else "FAIL", "count": len(URLS), "failures": failures}, indent=2))
    return 0 if not failures else 1

if __name__ == "__main__":
    raise SystemExit(main())
