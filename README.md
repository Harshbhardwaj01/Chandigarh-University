# Chandigarh University Website

A React and Vite website for Chandigarh University with an Express API for campus news, academic programs, and contact form submissions.

## Requirements

- Node.js 18 or newer
- npm

## Setup

```bash
npm install
```

## Run Locally

Start the backend in one terminal:

```bash
npm run backend
```

Start the frontend in another terminal:

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000).

The frontend runs on port `5000` and proxies `/api` requests to the backend on port `5001`.

## Scripts

- `npm run dev` - Start the Vite development server.
- `npm run backend` - Start the Express API server.
- `npm run build` - Create a production frontend build.
- `npm test` - Run the backend smoke test.

## Jenkins CI

The repository includes a `Jenkinsfile` for Pipeline-as-Code. The pipeline installs dependencies with `npm ci`, runs the TypeScript check, builds the Vite application, and archives the `dist` directory.

To configure Jenkins:

1. Install Jenkins with Node.js and Git support on the agent.
2. Create a new **Pipeline** job.
3. Under **Pipeline**, choose **Pipeline script from SCM**.
4. Select **Git** and use `https://github.com/Harshbhardwaj01/Chandigarh-University.git`.
5. Set the branch to `*/main` and the script path to `Jenkinsfile`.
6. Enable **GitHub hook trigger for GITScm polling**.
7. Add a GitHub webhook pointing to `https://YOUR-JENKINS-HOST/github-webhook/` using `application/json`.

Each push to `main` will then run the validation and build pipeline. Jenkins credentials should be stored in Jenkins Credentials Manager rather than committed to this repository.

## API Endpoints

- `GET /api/news` - Return campus news items.
- `GET /api/programs` - Return academic programs.
- `POST /api/contact` - Submit a contact form with `name`, `email`, and `message`.

## Project Structure

- `main.tsx` - React application entry point.
- `chandigarh_university_website.tsx` - Main website UI and API client.
- `chandigarh_university_backend.js` - Express backend.
- `vite.config.js` - Vite and API proxy configuration.
- `styles.css` - Global styles and Tailwind CSS entry point.
