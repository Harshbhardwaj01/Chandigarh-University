// To run this locally:
// 1. Install dependencies: npm install express cors
// 2. Run the server: node server.js

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON and allow cross-origin requests from the React frontend
app.use(cors());
app.use(express.json());

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

// Start the Express server
app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`Chandigarh University Backend Server `);
  console.log(`Server running on port ${PORT}`);
  console.log(`- API available at http://localhost:${PORT}/api`);
  console.log(`========================================`);
});