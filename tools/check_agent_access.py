#!/usr/bin/env python3
"""Verify real public HTML access, including the unmodified urllib user agent.

User-agent probes use the local test network, not the providers' own networks.
"""
import argparse
import json
import re
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen

AGENTS = (
    ("urllib_default", None),
    ("identified_agent", "Forma-Agent-Check/1.0"),
    ("chatgpt_user_header", "ChatGPT-User/1.0"),
    ("oai_search_header", "OAI-SearchBot/1.3; +https://openai.com/searchbot"),
    ("claude_user_header", "Claude-User/1.0"),
    ("perplexity_user_header", "Perplexity-User/1.0"),
)


def probe(url, agent):
    name, user_agent = agent
    request = Request(url, headers={} if user_agent is None else {"User-Agent": user_agent})
    try:
        try:
            response = urlopen(request, timeout=30)
        except HTTPError as error:
            response = error
        with response:
            body = response.read()
            content_type = response.headers.get("Content-Type", "")
            valid_html = (
                "text/html" in content_type
                and re.search(rb'<link\s+rel="canonical"\s+href="https://formasl.org/', body) is not None
                and re.search(rb"<h1\b", body, re.I) is not None
            )
            return {"agent": name, "status": response.status, "final_url": response.url,
                    "valid_site_html": valid_html, "cf_mitigated": response.headers.get("cf-mitigated"),
                    "pass": response.status == 200 and valid_html
                    and response.headers.get("cf-mitigated") is None}
    except (URLError, TimeoutError) as error:
        return {"agent": name, "pass": False, "error": str(error)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("url")
    parser.add_argument("--out", type=Path)
    args = parser.parse_args()
    url = urlsplit(args.url)
    if url.scheme != "https" or not url.hostname or url.username or url.password or url.fragment:
        parser.error("Expected a public HTTPS URL without credentials or fragment")
    start = datetime.now(timezone.utc).isoformat(timespec="seconds")
    with ThreadPoolExecutor(max_workers=3) as pool:
        results = list(pool.map(lambda agent: probe(args.url, agent), AGENTS))
    report = {"url": args.url, "start_utc": start,
              "end_utc": datetime.now(timezone.utc).isoformat(timespec="seconds"),
              "status": "PASS" if all(row["pass"] for row in results) else "FAIL",
              "scope": "Local-network HTTP probes; provider user agents are simulated.",
              "checks": results}
    output = json.dumps(report, indent=2, ensure_ascii=False) + "\n"
    if args.out:
        args.out.parent.mkdir(parents=True, exist_ok=True)
        args.out.write_text(output)
    print(output, end="")
    return 0 if report["status"] == "PASS" else 1


if __name__ == "__main__":
    raise SystemExit(main())
