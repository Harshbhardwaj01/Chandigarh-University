import express from 'express';
import cors from 'cors';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import apiRoutes from './routes/api.routes.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const frontendDistPath = process.env.FRONTEND_DIST_PATH || path.join(projectRoot, 'frontend', 'dist');
const frontendDistExists = await fs.access(frontendDistPath).then(() => true).catch(() => false);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

if (frontendDistExists) {
  app.use(express.static(frontendDistPath));
  app.get(/^(?!\/api).*/, (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

export default app;
