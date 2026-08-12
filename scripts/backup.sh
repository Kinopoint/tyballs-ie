#!/bin/sh
set -eu

umask 077

backup_directory=${BACKUP_DIRECTORY:-/backups}
media_directory=${CMS_MEDIA_DIRECTORY:-/media}
retention_days=${BACKUP_RETENTION_DAYS:-30}
interval_seconds=${BACKUP_INTERVAL_SECONDS:-86400}

case "$retention_days:$interval_seconds" in
  *[!0-9:]*|0:*|*:0) printf '%s\n' "Backup retention and interval must be positive integers." >&2; exit 1 ;;
esac

mkdir -p "$backup_directory"

temporary=""
media_temporary=""

cleanup() {
  [ -z "$temporary" ] || rm -f -- "$temporary"
  [ -z "$media_temporary" ] || rm -f -- "$media_temporary"
}
trap cleanup EXIT INT TERM

create_backup() {
  timestamp=$(date -u +%Y%m%dT%H%M%SZ)
  temporary="$backup_directory/.tyballs-$timestamp.dump.tmp"
  destination="$backup_directory/tyballs-$timestamp.dump"
  media_temporary="$backup_directory/.tyballs-media-$timestamp.tar.gz.tmp"
  media_destination="$backup_directory/tyballs-media-$timestamp.tar.gz"

  pg_dump --format=custom --no-owner --no-privileges --file="$temporary" "$DATABASE_URL"
  pg_restore --list "$temporary" >/dev/null
  tar -czf "$media_temporary" -C "$media_directory" .
  tar -tzf "$media_temporary" >/dev/null
  mv "$temporary" "$destination"
  mv "$media_temporary" "$media_destination"
  find "$backup_directory" -type f -name 'tyballs-*.dump' -mtime "+$retention_days" -delete
  find "$backup_directory" -type f -name 'tyballs-media-*.tar.gz' -mtime "+$retention_days" -delete
  printf '%s\n' "Database and media backup completed: $destination, $media_destination"
}

while :; do
  create_backup
  [ "${1:-}" = "--once" ] && break
  sleep "$interval_seconds"
done
