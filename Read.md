# Chandigarh University Project Analysis

## 1) Project overview

This project is a full-stack web application for Chandigarh University that combines:

- a React + Vite frontend for the university website
- an Express.js backend for API routes
- optional PostgreSQL storage for admissions data
- local JSON-file fallback storage for smoke testing and local runs
- Tailwind CSS for styling
- Jenkins CI automation for build validation

## 2) Folder and file structure

- `main.tsx` — React app entry point
- `chandigarh_university_website.tsx` — main UI and API logic
- `chandigarh_university_backend.js` — Express server and REST endpoints
- `styles.css` — global styling and Tailwind entry
- `vite.config.js` — Vite config and frontend API proxy setup
- `index.html` — root HTML entry page
- `package.json` — dependency and script definitions
- `README.md` — setup and run instructions
- `Jenkinsfile` — CI pipeline for automation
- `test/backend.test.js` — Node.js smoke tests for backend behavior
- `data/applications.json` — JSON storage file for admissions submissions
- `node-postgres-local/` — local PostgreSQL-related folder

## 3) Module breakdown

### Frontend module
The frontend is built with React and Vite.

Key responsibilities:
- render the home page, about page, programs page, admissions form, and contact page
- fetch data from the backend API
- allow users to submit contact requests and admission applications
- render campus updates and academic program details

Main file:
- `main.tsx`
- `chandigarh_university_website.tsx`

### Backend module
The backend is an Express.js API server.

Key responsibilities:
- serve campus news
- serve academic programs
- accept and validate contact form submissions
- accept and persist admission applications
- optionally connect to PostgreSQL when configured
- fall back to a JSON file when `APPLICATIONS_DB_PATH` is set

Main file:
- `chandigarh_university_backend.js`

### Styling module
The app uses Tailwind CSS through Vite.

Main files:
- `styles.css`
- `vite.config.js`

### Database module
The app supports two data modes:

1. PostgreSQL mode
   - used when `APPLICATIONS_DB_PATH` is not set
   - uses the `pg` package and a `Pool`
   - expects a table named `applications`

2. JSON file mode
   - used when `APPLICATIONS_DB_PATH` is set
   - reads/writes `data/applications.json`
   - useful for local testing and smoke tests

### Test module
The project includes Node’s built-in test runner.

Main file:
- `test/backend.test.js`

This tests:
- backend health and `/api/news` response
- saving an admission application to JSON storage

## 4) Runtime flow

### Frontend runtime
- `main.tsx` mounts the app into `#root`
- the React app renders the page sections and navigation
- the app uses `fetch()` to call backend endpoints
- if the backend is unavailable, it falls back to mock data

### Backend runtime
The backend starts on port `5001` by default.

Routes:
- `GET /api` — health check
- `GET /api/news` — returns campus news items
- `GET /api/programs` — returns academic program list
- `POST /api/contact` — accepts contact form submissions
- `GET /api/applications` — returns all saved applications
- `POST /api/applications` — stores an admission application

### Proxy setup
The Vite dev server is configured on port `5000` and proxies `/api` requests to `http://localhost:5001`.

This allows the frontend to call the backend through the same origin during development.

## 5) Dependency analysis

### Runtime dependencies

- `react` — UI library
- `react-dom` — browser rendering
- `express` — backend HTTP server
- `cors` — cross-origin request support
- `pg` — PostgreSQL client for database access
- `lucide-react` — icon set used in UI
- `vite` — build tool and dev server
- `@vitejs/plugin-react` — React support for Vite
- `@tailwindcss/vite` — Tailwind support for Vite
- `tailwindcss` — CSS utility framework

### Dev dependencies

- `typescript` — TypeScript compiler
- `@types/node` — Node.js type support
- `@types/react` — React type support
- `@types/react-dom` — React DOM type support

## 6) Scripts in `package.json`

- `npm run dev` — starts the Vite frontend
- `npm run backend` — starts the backend server
- `npm run build` — creates production frontend build
- `npm test` — runs backend tests via Node test runner

## 7) Important configuration values

### Backend environment variables

The backend checks these values:

- `PORT` — backend port, defaults to `5001`
- `APPLICATIONS_DB_PATH` — path for JSON file storage mode
- `DATABASE_URL` — full PostgreSQL connection string
- `PGHOST` — PostgreSQL host, defaults to `localhost`
- `PGPORT` — PostgreSQL port, defaults to `5432`
- `PGDATABASE` — database name, defaults to `local_test_db`
- `PGUSER` — PostgreSQL user, defaults to `postgres`
- `PGPASSWORD` — PostgreSQL password

### Frontend environment variable

- `VITE_API_URL` — optional override for API base URL, otherwise `/api` is used

## 8) Data model

The application form submits:

- `name`
- `email`
- `phone`
- `program`
- `city`

The backend stores these values in PostgreSQL as a table named `applications` with columns like:

- `id`
- `name`
- `email`
- `phone`
- `program`
- `city`
- `submitted_at`

In JSON mode, the data is stored as objects in `data/applications.json`.

## 9) CI pipeline summary

The project includes a Jenkinsfile that:

- checks out the project
- runs `npm ci`
- runs `npm run build`
- runs `npm test`
- logs in to Docker using Jenkins credentials

This means the project is prepared for automated validation in CI.

## 10) Strengths of the codebase

- simple and beginner-friendly architecture
- clear separation between frontend and backend
- mock-data fallback for UI testing without backend
- local JSON mode is effective for demos and smoke tests
- Vite dev proxy makes local development easy
- CI pipeline is included

## 11) Potential issues or improvement areas

- The code is relatively monolithic in one React file
- The project does not auto-create the PostgreSQL `applications` table
- There is no database migration system
- Contact form submissions are only logged to the console, not persisted
- The app does not currently include robust validation beyond basic required-field checks
- A large UI file can become difficult to maintain as the project grows

## 12) Conclusion

This codebase is a lightweight but functional full-stack university website demo. It demonstrates a realistic frontend + backend split, data persistence choices, Vite-based frontend tooling, and CI readiness. It is well suited for local demo work, educational projects, and small production-like prototypes.
