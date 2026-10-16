# Architecture

The React and Vite application lives in `frontend/` and uses the Express API for content and submissions.

The Express API lives in `backend/`, with routes, controllers, application services, validators, and repository code separated under `backend/src/`. The repository uses PostgreSQL when connection settings are present and retains JSON-file storage for isolated local tests.

The `database/` directory owns the PostgreSQL schema. `compose.yaml` runs the frontend Nginx container, API, and PostgreSQL with a persistent named volume.
