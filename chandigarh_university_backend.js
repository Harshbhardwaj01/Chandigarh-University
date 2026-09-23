// To run this locally:
// 1. Install dependencies: npm install express cors
// 2. Run the server: node server.js

import express from 'express';
import cors from 'cors';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = process.env.PORT || 5001;
const DATABASE_PATH = process.env.APPLICATIONS_DB_PATH || path.join(path.dirname(fileURLToPath(import.meta.url)), 'data', 'applications.json');

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
  const applications = await readApplications();
  applications.push(application);
  await fs.mkdir(path.dirname(DATABASE_PATH), { recursive: true });
  await fs.writeFile(DATABASE_PATH, JSON.stringify(applications, null, 2) + '\n');
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
app.get('/api/applications', (req, res) => {
  // Later, you will replace this with a database query (e.g., Application.find())
  res.json({ message: "This route is working! Here is where your list of applications will go." });
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

// POST /api/applications - Save a 2026 admission application
app.post('/api/applications', async (req, res) => {
  const { name, email, phone, program, city } = req.body;

  if (!name || !email || !phone || !program || !city) {
    return res.status(400).json({ success: false, error: 'Name, email, phone, program, and city are required.' });
  }

  const application = {
    id: `APP-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    program: program.trim(),
    city: city.trim(),
    submittedAt: new Date().toISOString(),
  };

  try {
    await saveApplication(application);
    res.status(201).json({ success: true, message: 'Application submitted successfully.', applicationId: application.id });
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