# Chandigarh University

React + Vite frontend, Express API, and PostgreSQL database.

## Requirements

- Node.js 20 or newer
- npm
- Docker Desktop for the full local stack

## Install and Run

Install the npm workspaces from the repository root:

```sh
npm ci
```

Run the Vite frontend and API in separate terminals with `npm run dev` and `npm run backend`. Without PostgreSQL environment variables, the backend uses the JSON file fallback for local development and tests.

For the full PostgreSQL-backed stack, copy `.env.example` to `.env`, set a unique `POSTGRES_PASSWORD`, then run:

```sh
docker compose up --build
```

Open the frontend at [http://localhost:5000](http://localhost:5000). The API is also exposed at `http://localhost:5001/api`. PostgreSQL data persists in the `postgres_data` volume.

## Scripts

- `npm run dev` - Start the frontend.
- `npm run backend` - Start the Express API.
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
