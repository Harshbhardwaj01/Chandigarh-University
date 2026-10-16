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
  { id: 'med', name: 'Allied Health Sciences', icon: '⚕️', count: '10+ Programs' },
];

export function health(req, res) {
  res.json({ message: 'Backend API is running successfully!' });
}

export function getNews(req, res) {
  res.json(newsData);
}

export function getPrograms(req, res) {
  res.json(programsData);
}

export function submitContact(req, res) {
  const { name, email, message } = req.body ?? {};
  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and Email are required.' });
  }

  console.log('--- New Contact Submission Received ---');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);
  console.log('---------------------------------------');
  res.status(200).json({ success: true, message: 'Message received successfully!' });
}
