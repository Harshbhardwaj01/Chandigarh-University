import assert from 'node:assert/strict';
import { once } from 'node:events';
import { spawn } from 'node:child_process';
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
