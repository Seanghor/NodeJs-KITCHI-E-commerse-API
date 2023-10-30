#!/bin/bash
until PGPASSWORD=$POSTGRES_PASSWORD psql  -U "$POSTGRES_USER"  -d "$POSTGRES_DB" -c "\q"; do
  echo "Waiting for the PostgreSQL service to be ready..."
  sleep 5
done

PGPASSWORD=$POSTGRES_PASSWORD psql  -U "$POSTGRES_USER"  -d "$POSTGRES_DB" -f "/docker-entrypoint-initdb.d/backup.sql"

echo "Backup data restored successfully."