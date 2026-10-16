import fs from 'node:fs/promises';
import path from 'node:path';
import { applicationsFilePath, databasePool, databaseReady } from '../config/database.js';

async function readApplications() {
  try {
    return JSON.parse(await fs.readFile(applicationsFilePath, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

export async function listApplications() {
  await databaseReady;
  if (!databasePool) return readApplications();

  const result = await databasePool.query(
    'SELECT id, name, email, phone, program, city, submitted_at FROM applications ORDER BY submitted_at DESC'
  );
  return result.rows;
}

export async function createApplication(application) {
  await databaseReady;
  if (databasePool) {
    const result = await databasePool.query(
      `INSERT INTO applications (name, email, phone, program, city, submitted_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, phone, program, city, submitted_at`,
      [application.name, application.email, application.phone, application.program, application.city, application.submittedAt]
    );
    return result.rows[0];
  }

  const applications = await readApplications();
  if (applications.some((entry) => entry.email?.toLowerCase() === application.email)) {
    const duplicateError = new Error('Duplicate email');
    duplicateError.code = '23505';
    throw duplicateError;
  }

  applications.push(application);
  await fs.mkdir(path.dirname(applicationsFilePath), { recursive: true });
  await fs.writeFile(applicationsFilePath, `${JSON.stringify(applications, null, 2)}\n`);
  return application;
}
