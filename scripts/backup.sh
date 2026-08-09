#!/bin/sh
set -eu

umask 077

backup_directory=${BACKUP_DIRECTORY:-/backups}
retention_days=${BACKUP_RETENTION_DAYS:-30}
interval_seconds=${BACKUP_INTERVAL_SECONDS:-86400}

case "$retention_days:$interval_seconds" in
  *[!0-9:]*|0:*|*:0) printf '%s\n' "Backup retention and interval must be positive integers." >&2; exit 1 ;;
esac

mkdir -p "$backup_directory"

create_backup() {
  timestamp=$(date -u +%Y%m%dT%H%M%SZ)
  temporary="$backup_directory/.tyballs-$timestamp.dump.tmp"
  destination="$backup_directory/tyballs-$timestamp.dump"

  pg_dump --format=custom --no-owner --no-privileges --file="$temporary" "$DATABASE_URL"
  mv "$temporary" "$destination"
  find "$backup_directory" -type f -name 'tyballs-*.dump' -mtime "+$retention_days" -delete
  printf '%s\n' "Database backup completed: $destination"
}

while :; do
  create_backup
  [ "${1:-}" = "--once" ] && break
  sleep "$interval_seconds"
done
