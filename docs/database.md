# Database

The `applications` table is defined in `database/schema.sql`. The backend applies this idempotent schema at startup when PostgreSQL is configured.

For Compose, set `POSTGRES_PASSWORD` in a root `.env` file and run `docker compose up --build`. PostgreSQL data is stored in the `postgres_data` volume. To inspect records:

```sh
docker compose exec postgres psql -U cu_app -d university_applications
```

To export applications as CSV from PowerShell:

```powershell
docker compose exec -T postgres psql -U cu_app -d university_applications -c "\copy applications TO STDOUT WITH CSV HEADER" > applications.csv
```

Create a custom-format backup with `bash infrastructure/scripts/backup-db.sh`. Store backups outside the source repository and protect them as sensitive applicant data.
