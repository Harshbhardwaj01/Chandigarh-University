#!/usr/bin/env bash
set -euo pipefail

backup_dir="${BACKUP_DIR:-../backups}"
mkdir -p "$backup_dir"
backup_file="$backup_dir/applications-$(date -u +%Y%m%dT%H%M%SZ).dump"
docker compose exec -T postgres pg_dump -U cu_app -d university_applications --format=custom > "$backup_file"
printf 'Database backup written to %s\n' "$backup_file"
