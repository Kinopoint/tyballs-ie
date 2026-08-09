#!/bin/sh
set -eu

backup_path=${1:-}
if [ -z "$backup_path" ]; then
  backup_path=$(find backups -type f -name 'tyballs-*.dump' -print | sort | tail -1)
fi

if [ -z "$backup_path" ] || [ ! -f "$backup_path" ]; then
  printf '%s\n' "No database backup was found." >&2
  exit 1
fi

restore_database="tyballs_restore_$(date -u +%Y%m%d%H%M%S)"
case "$restore_database" in *[!a-zA-Z0-9_]*) printf '%s\n' "Unsafe restore database name." >&2; exit 1 ;; esac

cleanup() {
  docker compose exec -T database dropdb --if-exists -U tyballs "$restore_database" >/dev/null
}
trap cleanup EXIT INT TERM

docker compose exec -T database createdb -U tyballs "$restore_database"
docker compose exec -T database pg_restore -U tyballs --dbname="$restore_database" --no-owner --no-privileges < "$backup_path"

tables=$(docker compose exec -T database psql -U tyballs -d "$restore_database" -Atc "SELECT count(*) FROM pg_catalog.pg_tables WHERE schemaname = 'public' AND tablename IN ('enquiries', 'submission_windows');")
if [ "$tables" != "2" ]; then
  printf '%s\n' "Restore test failed: expected application tables were not restored." >&2
  exit 1
fi

printf '%s\n' "Restore test passed for $backup_path."
