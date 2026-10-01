# Chandigarh University Website

A React and Vite website for Chandigarh University with an AWS Amplify Gen 2 backend. Amplify provides Cognito guest identity, an AppSync GraphQL API, and DynamoDB-backed data models.

## Requirements

- Node.js 18 or newer
- npm

## Setup

```bash
npm install
```

## Run Locally

Start an Amplify sandbox (requires AWS credentials configured locally):

```bash
npm run amplify:sandbox
```

In another terminal, start the frontend:

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000).

The sandbox generates `amplify_outputs.json`, which the frontend loads automatically. The Express backend remains available through `npm run backend` for its existing local smoke tests, but Amplify-hosted frontend requests use Amplify Data.

## Scripts

- `npm run dev` - Start the Vite development server.
- `npm run backend` - Start the legacy local Express API.
- `npm run build` - Create a production frontend build.
- `npm run typecheck` - Check frontend and Amplify TypeScript.
- `npm run amplify:sandbox` - Provision a personal Amplify Gen 2 development backend.
- `npm test` - Run the backend smoke test.

## Deploy to Amplify Hosting

1. Push this repository to a supported Git provider.
2. In the AWS Amplify console, choose **Create new app**, connect the repository, and select the deployment branch. Amplify detects `amplify.yml`.
3. Allow Amplify to deploy backend resources. The build invokes `ampx pipeline-deploy` with the Amplify-provided `AWS_APP_ID` and `AWS_BRANCH` values.
4. Deploy. Amplify provisions Cognito, AppSync, and DynamoDB, then publishes the Vite `dist` output.
5. Add records to the `News` and `Program` models in the Amplify Data manager. Sample content is shown until those records are available.

The `Application` model uses normalized email as its DynamoDB key to reject duplicate applications. Anonymous visitors can create application and contact records but cannot list or read submissions. Before production launch, review the generated authorization policies and configure a custom domain, retention, monitoring, and suitable anti-abuse controls in AWS.

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

## Amplify Data Models

- `News` and `Program` - Publicly readable website content.
- `ContactMessage` - Public create-only contact submissions.
- `Application` - Public create-only admissions submissions, keyed by email.

## Project Structure

- `main.tsx` - React application entry point.
- `chandigarh_university_website.tsx` - Main website UI and API client.
- `amplify/` - Amplify Gen 2 auth, data, and backend resources.
- `amplify.yml` - Amplify Hosting backend and frontend build configuration.
- `chandigarh_university_backend.js` - Legacy local Express backend for smoke tests.
- `vite.config.js` - Vite and API proxy configuration.
- `styles.css` - Global styles and Tailwind CSS entry point.
