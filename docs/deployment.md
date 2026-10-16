# Deployment

## Docker Compose

1. Copy `.env.example` to `.env` and set a unique `POSTGRES_PASSWORD`.
2. Run `docker compose up --build -d` from the repository root.
3. Open the frontend at `http://localhost:5000`; the API is available at `http://localhost:5001/api`.
4. Use `docker compose logs -f` to inspect service logs. Application data persists in the `postgres_data` volume.

On an EC2 host, clone the repository, create its `.env` file, and run `bash infrastructure/scripts/deploy.sh` from the repository checkout. The optional GitHub Actions deployment workflow uses `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY`, `EC2_KNOWN_HOSTS`, and `EC2_APP_DIR` repository secrets and expects Docker Compose plus a configured `.env` on the host.

