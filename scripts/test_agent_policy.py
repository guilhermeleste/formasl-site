#!/usr/bin/env python3
"""Check agent inference permission separately from training crawler access."""
import tempfile
import unittest
from pathlib import Path
from urllib.robotparser import RobotFileParser

from build import add_cf_files


class AgentPolicyTests(unittest.TestCase):
    def robots(self, origin):
        with tempfile.TemporaryDirectory(prefix="forma-agent-policy-") as directory:
            root = Path(directory)
            add_cf_files(root, origin)
            return (root / "robots.txt").read_text()

    def test_production_allows_inference_without_authorizing_training(self):
        text = self.robots("https://formasl.org")
        self.assertIn("Content-Signal: search=yes,ai-input=yes,ai-train=no\n", text)
        self.assertNotIn("use=reference", text)
        self.assertNotIn("use=full", text)
        self.assertIn("Sitemap: https://formasl.org/sitemap.xml\n", text)
        parser = RobotFileParser()
        parser.parse(text.splitlines())
        for agent in ("Forma-Agent-Test/1.0", "Python-urllib/3.14", "ChatGPT-User",
                      "OAI-SearchBot", "Claude-User", "Perplexity-User"):
            for path in ("/pt/", "/en/", "/zh-CN/", "/docs/en/"):
                with self.subTest(agent=agent, path=path):
                    self.assertTrue(parser.can_fetch(agent, path))
        # Preserve the training crawler restrictions previously served by the zone.
        for agent in ("Amazonbot", "Applebot-Extended", "Bytespider", "CCBot",
                      "ClaudeBot", "Diffbot", "Google-Extended", "GPTBot", "omgili",
                      "anthropic-ai", "Claude-Web", "cohere-ai", "MistralAI-Training",
                      "meta-externalagent", "GoogleOther", "Baiduspider", "PetalBot",
                      "AwarioSmartBot", "AwarioRssBot", "Google-CloudVertexBot",
                      "QualifiedBot", "Cotoyogi", "ICC-Crawler", "atlassian-bot",
                      "FishBot", "BorderxBot", "NavuBot", "SemrushBot-SWA", "WARDBot",
                      "magpie-crawler", "KimiBot", "CitibotSiteCrawler"):
            with self.subTest(training_agent=agent):
                self.assertFalse(parser.can_fetch(agent, "/pt/"))

    def test_local_preview_remains_disallowed(self):
        parser = RobotFileParser()
        parser.parse(self.robots(None).splitlines())
        self.assertFalse(parser.can_fetch("Forma-Agent-Test/1.0", "/pt/"))


if __name__ == "__main__":
    unittest.main()
