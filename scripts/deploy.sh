#!/bin/sh
set -eu

# Usage: CLOUDFLARE_PROJECT_NAME=... ./scripts/deploy.sh preview|production
mode="${1:-}"
if [ "$mode" != "preview" ] && [ "$mode" != "production" ]; then
  echo "Usage: scripts/deploy.sh preview|production" >&2
  exit 2
fi
: "${CLOUDFLARE_PROJECT_NAME:?Set CLOUDFLARE_PROJECT_NAME}"
if [ ! -d dist ] || [ ! -f dist/RELEASE-MANIFEST.json ]; then
  echo "Build the dist directory first" >&2
  exit 2
fi
if [ "$mode" = "production" ]; then
  python3 scripts/validate.py dist --docs --release
  branch=main
else
  python3 scripts/validate.py dist
  branch=preview
fi
# Auth: wrangler login, or CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_API_TOKEN.
npx wrangler pages deploy dist --project-name "$CLOUDFLARE_PROJECT_NAME" --branch "$branch"
