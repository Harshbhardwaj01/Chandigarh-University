#!/usr/bin/env bash
set -euo pipefail

cd "${APP_DIR:-/opt/chandigarh-university}"
git pull --ff-only
docker compose up -d --build
docker compose ps
