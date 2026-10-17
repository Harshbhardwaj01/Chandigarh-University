# Chandigarh University

Chandigarh University information and admissions site with a React + Vite frontend, an Express API, and PostgreSQL-backed application submissions.

## Requirements

- Node.js 20 or newer
- npm
- Docker Desktop for the full local stack

## Install and Run

Install the npm workspaces from the repository root:

```sh
npm ci
```

For local development, start the frontend and API in separate terminals from the repository root:

```sh
npm run dev
```

```sh
npm run backend
```

Open the Vite frontend at [http://localhost:5000](http://localhost:5000). The API runs at [http://localhost:5001/api](http://localhost:5001/api). Without PostgreSQL connection settings, admissions applications are stored in `data/applications.json`.

For the full PostgreSQL-backed stack, copy `.env.example` to `.env`, set a unique `POSTGRES_PASSWORD`, then run:

```sh
docker compose up --build
```

Open the Compose frontend at [http://localhost](http://localhost). The API is exposed at [http://localhost:5001/api](http://localhost:5001/api). PostgreSQL data persists in the `postgres_data` volume. Set `BACKEND_PORT` in `.env` if the default API port is unavailable; the frontend container maps to port 80.

## Submissions

- Admissions applications are saved to PostgreSQL when the database is configured. Without PostgreSQL, they are saved to `data/applications.json`.
- Contact form submissions are currently printed to the backend logs only. They are not emailed or persisted. With Docker Compose, view them using `docker compose logs -f backend`; when running the API directly, check the backend terminal.

## Scripts

- `npm run dev` - Start the Vite frontend on port 5000.
- `npm run backend` - Start the Express API on port 5001.
- `npm run build` - Build the frontend.
- `npm run typecheck` - Check frontend TypeScript.
- `npm test` - Run backend tests.

## Structure

- `frontend/` - Vite app, UI source, API client, Nginx config, and frontend container.
- `backend/` - Express app, route/controller/service/repository layers, tests, and API container.
- `database/` - PostgreSQL schema, migration guidance, and seed guidance.
- `infrastructure/` - Docker notes, deployment and backup scripts, and EC2 guidance.
- `docs/` - Architecture, deployment, and database documentation.
- `compose.yaml` - Local frontend, API, and PostgreSQL stack.

## CI and EC2

GitHub CI runs from `.github/workflows/ci.yml`. The manual EC2 deployment workflow is `.github/workflows/deploy.yml`; configure its documented repository secrets and prepare the EC2 checkout and `.env` first. Jenkins automation remains available in `Jenkinsfile`.

See [docs/deployment.md](docs/deployment.md), [docs/database.md](docs/database.md), and [docs/architecture.md](docs/architecture.md) for operational details.
