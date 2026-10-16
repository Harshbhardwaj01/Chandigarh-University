import pg from 'pg';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { Pool } = pg;
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const schemaPath = path.join(projectRoot, 'database', 'schema.sql');

export const databasePool = !process.env.APPLICATIONS_DB_PATH && (process.env.DATABASE_URL || process.env.PGHOST)
  ? new Pool(process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {})
  : null;

export const databaseReady = databasePool
  ? fs.readFile(schemaPath, 'utf8').then((schema) => databasePool.query(schema))
  : Promise.resolve();

export const applicationsFilePath = process.env.APPLICATIONS_DB_PATH
  || path.join(projectRoot, 'data', 'applications.json');
