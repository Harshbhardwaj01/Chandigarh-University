// To run this locally:
// 1. Install dependencies: npm install express cors
// 2. Run the server: node server.js

import express from 'express';
import cors from 'cors';
import pg from 'pg';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = process.env.PORT || 5001;
const DATABASE_PATH = process.env.APPLICATIONS_DB_PATH || path.join(path.dirname(fileURLToPath(import.meta.url)), 'data', 'applications.json');
const { Pool } = pg;
const databasePool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

// Middleware to parse JSON and allow cross-origin requests from the React frontend
app.use(cors());
app.use(express.json());

async function readApplications() {
  try {
    return JSON.parse(await fs.readFile(DATABASE_PATH, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function saveApplication(application) {
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
  applications.push(application);
  await fs.mkdir(path.dirname(DATABASE_PATH), { recursive: true });
  await fs.writeFile(DATABASE_PATH, JSON.stringify(applications, null, 2) + '\n');
  return application;
}

async function getApplications() {
  if (databasePool) {
    const result = await databasePool.query(
      'SELECT id, name, email, phone, program, city, submitted_at FROM applications ORDER BY submitted_at DESC'
    );
    return result.rows;
  }

  return readApplications();
}

// These arrays act as our database for this basic backend implementation.
const newsData = [
  { id: 1, title: 'CU ranks among top 50 in NIRF Rankings 2026', date: 'Sept 10, 2026', category: 'Accolades' },
  { id: 2, title: 'International Tech Symposium announced for October', date: 'Sept 08, 2026', category: 'Events' },
  { id: 3, title: 'Placement drive: 500+ top companies visiting campus', date: 'Sept 05, 2026', category: 'Placements' },
];

const programsData = [
  { id: 'eng', name: 'Engineering', icon: '💻', count: '30+ Programs' },
  { id: 'biz', name: 'Business Management', icon: '📊', count: '15+ Programs' },
  { id: 'law', name: 'Law', icon: '⚖️', count: '5 Programs' },
  { id: 'art', name: 'Arts & Humanities', icon: '🎨', count: '20+ Programs' },
  { id: 'sci', name: 'Sciences', icon: '🔬', count: '25+ Programs' },
  { id: 'med', name: 'Allied Health Sciences', icon: '⚕️', count: '10+ Programs' }
];

// Health check route
app.get('/api', (req, res) => {
  res.json({ message: "Backend API is running successfully!" });
});

//application routes
app.get('/api/applications', async (req, res) => {
  try {
    res.json(await getApplications());
  } catch (error) {
    console.error('Failed to fetch applications:', error.message);
    res.status(500).json({ success: false, error: 'Applications could not be loaded.' });
  }
});

// GET /api/news - Fetch latest news
app.get('/api/news', (req, res) => {
  // Simulating a slight database/network delay
  setTimeout(() => {
    res.json(newsData);
  }, 500);
});

// GET /api/programs - Fetch available programs
app.get('/api/programs', (req, res) => {
  setTimeout(() => {
    res.json(programsData);
  }, 300);
});

// POST /api/contact - Submit contact form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation on the backend
  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and Email are required.' });
  }

  // Here you would typically save the submission to a database or send an automated email
  console.log('--- New Contact Submission Received ---');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);
  console.log('---------------------------------------');

  // Respond with success
  setTimeout(() => {
    res.status(200).json({ success: true, message: 'Message received successfully!' });
  }, 800);
});

function validateApplication(application) {
  const namePattern = /^[\p{L}][\p{L}\p{M} .'-]{1,79}$/u;
  const locationPattern = /^[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N} .,'-]{1,99}$/u;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+\d\s()\-\.]{7,20}$/;

  if (!namePattern.test(application.name)) return 'Enter a valid name.';
  if (!emailPattern.test(application.email)) return 'Enter a valid email address.';
  if (!phonePattern.test(application.phone) || application.phone.replace(/\D/g, '').length < 7 || application.phone.replace(/\D/g, '').length > 15) {
    return 'Enter a valid phone number with 7 to 15 digits.';
  }
  if (!application.program || application.program.length > 100) return 'Select a valid program.';
  if (!locationPattern.test(application.city)) return 'Enter a valid city.';

  return null;
}

// POST /api/applications - Save a 2026 admission application
app.post('/api/applications', async (req, res) => {
  const { name, email, phone, program, city } = req.body;

  if ([name, email, phone, program, city].some((value) => typeof value !== 'string')) {
    return res.status(400).json({ success: false, error: 'Name, email, phone, program, and city are required.' });
  }

  const application = {
    name: name.trim().replace(/\s+/g, ' '),
    email: email.trim().toLowerCase(),
    phone: phone.trim().replace(/\s+/g, ' '),
    program: program.trim().replace(/\s+/g, ' '),
    city: city.trim().replace(/\s+/g, ' '),
    submittedAt: new Date().toISOString(),
  };

  const validationError = validateApplication(application);
  if (validationError) {
    return res.status(400).json({ success: false, error: validationError });
  }

  try {
    const savedApplication = await saveApplication(application);
    res.status(201).json({ success: true, message: 'Application submitted successfully.', applicationId: savedApplication.id });
  } catch (error) {
    console.error('Failed to save application:', error);
    res.status(500).json({ success: false, error: 'Application could not be saved.' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`Chandigarh University Backend Server `);
  console.log(`Server running on port ${PORT}`);
  console.log(`- API available at http://localhost:${PORT}/api`);
  console.log(`========================================`);
});