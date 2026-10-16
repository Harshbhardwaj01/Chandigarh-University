# Project Structure Notes

- `frontend/` contains the Vite application, API client, static assets, Nginx configuration, and frontend image build.
- `backend/` contains the Express entry points, API routes, controllers, application service, validation, PostgreSQL/JSON repository, and tests.
- `database/schema.sql` defines the PostgreSQL `applications` table and its indexes. The backend applies it when PostgreSQL is configured.
- `compose.yaml` runs the frontend, backend, and persistent PostgreSQL service together.
Root npm scripts delegate to the frontend and backend workspaces. See the root README and `docs/architecture.md`, `docs/deployment.md`, and `docs/database.md` for current setup and operations.
