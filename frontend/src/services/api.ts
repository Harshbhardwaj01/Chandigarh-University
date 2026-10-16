const apiBaseUrl = import.meta.env.VITE_API_URL || '/api';

const sampleNews = [
  { id: '1', title: 'CU ranks among top 50 in NIRF Rankings 2026', date: 'Sept 10, 2026', category: 'Accolades' },
  { id: '2', title: 'International Tech Symposium announced for October', date: 'Sept 08, 2026', category: 'Events' },
  { id: '3', title: 'Placement drive: 500+ top companies visiting campus', date: 'Sept 05, 2026', category: 'Placements' },
];

const samplePrograms = [
  { id: 'eng', name: 'Engineering', icon: '💻', count: '30+ Programs' },
  { id: 'biz', name: 'Business Management', icon: '📊', count: '15+ Programs' },
  { id: 'law', name: 'Law', icon: '⚖️', count: '5 Programs' },
  { id: 'art', name: 'Arts & Humanities', icon: '🎨', count: '20+ Programs' },
  { id: 'sci', name: 'Sciences', icon: '🔬', count: '25+ Programs' },
  { id: 'med', name: 'Allied Health Sciences', icon: '⚕️', count: '10+ Programs' },
];

async function requestApi(endpoint, options = {}) {
  const response = await fetch(`${apiBaseUrl}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || 'The request failed.');
  return body;
}

export const API_CLIENT = {
  async getNews() {
    try {
      const news = await requestApi('/news');
      return news.length ? news : sampleNews;
    } catch {
      return sampleNews;
    }
  },
  submitContactForm(data) {
    return requestApi('/contact', { method: 'POST', body: JSON.stringify(data) });
  },
  submitApplication(data) {
    const normalizedData = {
      ...data,
      name: data.name.trim().replace(/\s+/g, ' '),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      program: data.program.trim(),
      city: data.city.trim(),
    };
    return requestApi('/applications', { method: 'POST', body: JSON.stringify(normalizedData) });
  },
  async getPrograms() {
    try {
      const programs = await requestApi('/programs');
      return programs.length ? programs : samplePrograms;
    } catch {
      return samplePrograms;
    }
  },
};
