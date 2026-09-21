import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { once } from 'node:events';
import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

const port = 5101;
const baseUrl = `http://127.0.0.1:${port}`;

test('backend returns campus news', async () => {
  const server = spawn(process.execPath, ['chandigarh_university_backend.js'], {
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  try {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Backend did not start in time')), 5000);
      server.stdout.on('data', (chunk) => {
        if (chunk.toString().includes('Server running on port')) {
          clearTimeout(timeout);
          resolve();
        }
      });
      server.once('error', reject);
      server.once('exit', (code) => reject(new Error(`Backend exited with code ${code}`)));
    });

    const response = await fetch(`${baseUrl}/api/news`);
    const news = await response.json();

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(news));
    assert.ok(news.length > 0);
    assert.ok(news[0].title);
  } finally {
    server.kill();
    await once(server, 'exit').catch(() => {});
  }
});

test('backend stores an admission application', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'cu-applications-'));
  const databasePath = path.join(directory, 'applications.json');
  const applicationBaseUrl = `http://127.0.0.1:${port + 1}`;
  const server = spawn(process.execPath, ['chandigarh_university_backend.js'], {
    env: { ...process.env, PORT: String(port + 1), APPLICATIONS_DB_PATH: databasePath },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  try {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Backend did not start in time')), 5000);
      server.stdout.on('data', (chunk) => {
        if (chunk.toString().includes('Server running on port')) {
          clearTimeout(timeout);
          resolve();
        }
      });
      server.once('error', reject);
      server.once('exit', (code) => reject(new Error(`Backend exited with code ${code}`)));
    });

    const response = await fetch(`${applicationBaseUrl}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Asha Singh', email: 'ASHA@example.com', phone: '9876543210', program: 'Engineering', city: 'Chandigarh' })
    });
    const body = await response.json();
    const saved = JSON.parse(await readFile(databasePath, 'utf8'));

    assert.equal(response.status, 201);
    assert.equal(body.success, true);
    assert.equal(saved[0].email, 'asha@example.com');
    assert.equal(saved[0].program, 'Engineering');
  } finally {
    server.kill();
    await once(server, 'exit').catch(() => {});
    await rm(directory, { recursive: true, force: true });
  }
});
