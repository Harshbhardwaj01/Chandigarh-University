import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Users,
  Trophy,
  Globe,
  Menu,
  X,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Newspaper,
  ChevronDown
} from 'lucide-react';

// --- Full-Stack API Integration ---
// This client attempts to fetch from the local Node.js server.
// If the server isn't running (like in this preview environment), it gracefully falls back to mock data.

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const API_CLIENT = {
  getNews: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/news`);
      if (res.ok) return await res.json();
      throw new Error('Backend unavailable');
    } catch (err) {
      console.warn("Backend not running, using mock data for News.");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, title: 'CU ranks among top 50 in NIRF Rankings 2026', date: 'Sept 10, 2026', category: 'Accolades' },
            { id: 2, title: 'International Tech Symposium announced for October', date: 'Sept 08, 2026', category: 'Events' },
            { id: 3, title: 'Placement drive: 500+ top companies visiting campus', date: 'Sept 05, 2026', category: 'Placements' },
          ]);
        }, 800);
      });
    }
  },
  submitContactForm: async (data) => {
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to submit');
    } catch (err) {
      console.warn("Backend not running, using mock data for Contact.");
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!data.name || !data.email) {
            reject(new Error("Name and Email are required."));
          } else {
            resolve({ success: true, message: 'Message received successfully!' });
          }
        }, 1000);
      });
    }
  },
  getPrograms: async () => {
     try {
       const res = await fetch(`${API_BASE_URL}/programs`);
       if (res.ok) return await res.json();
       throw new Error('Backend unavailable');
     } catch (err) {
       console.warn("Backend not running, using mock data for Programs.");
       return new Promise((resolve) => {
           setTimeout(() => {
               resolve([
                   { id: 'eng', name: 'Engineering', icon: '💻', count: '30+ Programs' },
                   { id: 'biz', name: 'Business Management', icon: '📊', count: '15+ Programs' },
                   { id: 'law', name: 'Law', icon: '⚖️', count: '5 Programs' },
                   { id: 'art', name: 'Arts & Humanities', icon: '🎨', count: '20+ Programs' },
                   { id: 'sci', name: 'Sciences', icon: '🔬', count: '25+ Programs' },
                   { id: 'med', name: 'Allied Health Sciences', icon: '⚕️', count: '10+ Programs' }
               ]);
           }, 500);
       });
     }
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'programs', label: 'Programs' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      {/* Header / Navigation */}
      <header className="bg-red-800 text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            {/* Minimalist Logo Representation */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-800 font-bold text-xl shadow-inner">
              CU
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-wide">CHANDIGARH UNIVERSITY</h1>
              <p className="text-xs text-red-200 tracking-wider">Discover. Learn. Empower.</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 items-center font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`hover:text-yellow-400 transition-colors ${activeTab === link.id ? 'text-yellow-400 border-b-2 border-yellow-400 pb-1' : ''}`}
              >
                {link.label}
              </button>
            ))}
            <button className="bg-yellow-500 hover:bg-yellow-400 text-red-900 px-5 py-2 rounded-md font-bold transition-transform hover:scale-105 active:scale-95 shadow-md">
              Apply Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-red-900 border-t border-red-700 animate-slide-down">
            <div className="container mx-auto px-4 py-2 flex flex-col">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setIsMenuOpen(false);
                  }}
                  className={`py-3 text-left border-b border-red-800 last:border-none ${activeTab === link.id ? 'text-yellow-400' : 'text-gray-100'}`}
                >
                  {link.label}
                </button>
              ))}
               <button className="bg-yellow-500 text-red-900 mt-4 px-4 py-3 rounded-md font-bold text-center">
                Apply Now 2026
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        {activeTab === 'home' && <HomeSection />}
        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'programs' && <ProgramsSection />}
        {activeTab === 'contact' && <ContactSection />}
        {activeTab === 'admissions' && (
          <div className="flex-grow flex items-center justify-center bg-gray-100 p-8 text-center">
             <div className="max-w-md">
                <h2 className="text-3xl font-bold text-red-800 mb-4">Admissions 2026 Open</h2>
                <p className="text-gray-600 mb-6">Join India's leading private university. Fast-track your career with our industry-aligned programs.</p>
                <button className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-colors">Start Application</button>
             </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">CU</div>
               <h3 className="text-xl font-bold text-white">Chandigarh University</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Gharuan, Mohali, Punjab, India. <br/>
              A premier institution dedicated to excellence in education, research, and innovation.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Student Login (CUIMS)</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Alumni Network</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Careers at CU</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">NIRF Data</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2 inline-block">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-red-400 flex-shrink-0" />
                <span>NH-95 Chandigarh-Ludhiana Highway, Mohali, Punjab (INDIA)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-red-400 flex-shrink-0" />
                <span>1800 1212 88800 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-red-400 flex-shrink-0" />
                <span>admissions@cumail.in</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2 inline-block">Connect With Us</h4>
             <div className="flex gap-4">
                {/* Mock social icons */}
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer text-white">f</div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer text-white">in</div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer text-white">X</div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer text-white">ig</div>
             </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Chandigarh University. All Rights Reserved. (Demo Site)
        </div>
      </footer>
    </div>
  );
}

function HomeSection() {
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  // Fetch news data using our API client
  useEffect(() => {
    API_CLIENT.getNews().then(data => {
      setNews(data);
      setLoadingNews(false);
    });
  }, []);

  return (
    <div className="flex flex-col flex-grow w-full">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white min-h-[500px] flex items-center overflow-hidden w-full m-0 p-0">
        {/* Decorative background element mimicking a campus photo overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 to-black/80 z-10 w-full"></div>
        <div className="absolute inset-0 opacity-30 z-0 w-full" style={{
            backgroundImage: `radial-gradient(circle at center, #ffffff 1px, transparent 1px)`,
            backgroundSize: `20px 20px`
        }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-20 w-full">
          <div className="max-w-2xl w-full">
            <span className="inline-block py-1 px-3 rounded-full bg-yellow-500/20 text-yellow-300 font-semibold text-sm mb-4 border border-yellow-500/30">
              NAAC A+ Accredited
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
              Shape Your Future at <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Chandigarh University</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
              Experience world-class education, unmatched global exposure, and outstanding placement opportunities at India's youngest university to be ranked by QS World University Rankings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-md font-bold text-lg transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] flex items-center justify-center gap-2 w-full sm:w-auto">
                Explore Programs <ChevronRight size={20} />
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-md font-bold text-lg transition-colors w-full sm:w-auto">
                Virtual Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100 w-full">
        <div className="container mx-auto px-4 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center w-full">
            <StatCard icon={<BookOpen size={32}/>} number="200+" label="Programs Offered" />
            <StatCard icon={<Users size={32}/>} number="30,000+" label="Students Enrolled" />
            <StatCard icon={<Trophy size={32}/>} number="9124" label="Placement Offers (2025)" />
            <StatCard icon={<Globe size={32}/>} number="460+" label="International Tie-ups" />
          </div>
        </div>
      </section>

      {/* API Interaction Demo: Latest News */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="container mx-auto px-4 w-full">
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Newspaper className="text-red-700" /> Campus Updates
            </h2>
            <button className="text-red-700 font-semibold hover:underline hidden sm:block">View All</button>
          </div>

          <div className="w-full">
            {loadingNews ? (
              <div className="flex justify-center items-center py-12 w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {news.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer w-full">
                    <div className="flex justify-between items-start mb-4 w-full">
                       <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-1 rounded">
                         {item.category}
                       </span>
                       <span className="text-xs text-gray-500 flex items-center gap-1">
                         <Calendar size={12} /> {item.date}
                       </span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2 leading-tight hover:text-red-700 transition-colors">
                      {item.title}
                    </h3>
                    <div className="mt-4 flex items-center text-sm font-semibold text-gray-600 hover:text-red-700">
                      Read More <ChevronRight size={16} className="ml-1" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="w-full mt-6 py-3 text-red-700 font-semibold border border-red-200 rounded-md sm:hidden">
            View All Updates
          </button>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, number, label }) {
  return (
    <div className="p-4 flex flex-col items-center group w-full">
      <div className="text-red-700 mb-3 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-3xl font-extrabold text-gray-900 mb-1">{number}</div>
      <div className="text-sm text-gray-500 font-medium">{label}</div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="w-full bg-white flex-grow">
      {/* Header Banner */}
      <div className="bg-red-800 text-white py-16 px-4 text-center w-full">
        <h1 className="text-4xl font-bold mb-4">About Chandigarh University</h1>
        <p className="max-w-2xl mx-auto text-red-100">Committed to excellence in teaching, research, and innovation to develop global leaders.</p>
      </div>

      <div className="container mx-auto px-4 py-16 w-full max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">A Legacy of Excellence</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Chandigarh University (CU) is a leading Indian Institution offering its students a unique amalgamation of professional and academic excellence. The University has been accredited with the prestigious A+ grade by the National Assessment and Accreditation Council (NAAC).
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Located in the vicinity of Chandigarh, a city named as the 'City Beautiful', CU offers a sprawling 200-acre green campus. Home to students from 28 Indian states and 50 countries, we provide a truly cosmopolitan learning environment.
            </p>
            
            <div className="flex flex-col gap-4 w-full">
              <div className="border-l-4 border-red-700 pl-4 w-full">
                <h4 className="font-bold text-gray-900">Vision</h4>
                <p className="text-sm text-gray-600">To be globally recognized as a Centre of Excellence for Research, Innovation, Entrepreneurship and disseminating knowledge.</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4 w-full">
                <h4 className="font-bold text-gray-900">Mission</h4>
                <p className="text-sm text-gray-600">Providing contemporary and rigorous educational experiences that develop the students into capable professionals.</p>
              </div>
            </div>
          </div>
          
          <div className="w-full">
            {/* Placeholder for Campus Image */}
            <div className="bg-gray-200 rounded-xl aspect-video flex flex-col items-center justify-center shadow-lg relative overflow-hidden border border-gray-100 w-full">
               <div className="absolute inset-0 bg-gradient-to-tr from-gray-300 to-gray-100"></div>
               <div className="relative z-10 text-center p-6 w-full">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Globe size={40} className="text-red-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">200 Acre Campus</h3>
                  <p className="text-gray-500 text-sm">State-of-the-art infrastructure facilitating modern education.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgramsSection() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API_CLIENT.getPrograms().then(data => {
            setPrograms(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="w-full bg-gray-50 flex-grow py-12">
            <div className="container mx-auto px-4 w-full">
                <div className="text-center max-w-3xl mx-auto mb-12 w-full">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Academic Programs</h2>
                    <p className="text-gray-600">Explore a wide range of undergraduate, postgraduate, and doctoral programs designed in consultation with industry leaders to ensure you are future-ready.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20 w-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
                        {programs.map((prog) => (
                            <div key={prog.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group w-full">
                                <div className="h-2 bg-red-700 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                                <div className="p-6 w-full">
                                    <div className="text-4xl mb-4">{prog.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{prog.name}</h3>
                                    <p className="text-sm text-gray-500 mb-4 font-medium">{prog.count}</p>
                                    <button className="flex items-center text-red-700 font-semibold text-sm group-hover:gap-2 transition-all">
                                        Explore Details <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="mt-12 text-center w-full">
                    <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center gap-2">
                        Download Complete Brochure <ChevronDown size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear status on typing
    if (status.error || status.success) setStatus({ loading: false, error: null, success: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      // Calling our API client
      const response = await API_CLIENT.submitContactForm(formData);
      if (response.success) {
        setStatus({ loading: false, error: null, success: true });
        setFormData({ name: '', email: '', message: '' }); // Reset form
      }
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: false });
    }
  };

  return (
    <div className="w-full bg-white flex-grow py-12">
      <div className="container mx-auto px-4 max-w-6xl w-full">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Get in Touch</h2>
        
        <div className="grid md:grid-cols-2 gap-12 w-full">
          {/* Contact Information */}
          <div className="w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-red-700 pl-3">Admissions Office</h3>
            
            <div className="space-y-6 w-full">
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-full text-red-700 flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Address</h4>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    Chandigarh University<br/>
                    NH-95 Chandigarh-Ludhiana Highway,<br/>
                    Mohali, Punjab (INDIA)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-full text-red-700 flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Phone</h4>
                  <p className="text-gray-600 text-sm mt-1">General Inquiries: 1800 1212 88800</p>
                  <p className="text-gray-600 text-sm">International: +91-160-3051003</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-full text-red-700 flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email</h4>
                  <p className="text-gray-600 text-sm mt-1">admissions@cumail.in</p>
                  <p className="text-gray-600 text-sm">info@cumail.in</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 w-full">
                <h4 className="font-bold text-gray-800 mb-2">Office Hours</h4>
                <p className="text-sm text-gray-600">Monday - Saturday: 9:00 AM to 5:00 PM</p>
                <p className="text-sm text-gray-600">Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Form API Demo */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h3>
            <p className="text-gray-500 text-sm mb-6">Have questions? Fill out the form below and our team will get back to you.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 focus:border-red-700 outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 focus:border-red-700 outline-none transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 focus:border-red-700 outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              {status.error && (
                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200 w-full">
                  {status.error}
                </div>
              )}

              {status.success && (
                <div className="p-3 bg-green-50 text-green-700 text-sm rounded-md border border-green-200 w-full">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className={`w-full py-3 px-4 rounded-md font-bold text-white transition-all shadow-md ${
                  status.loading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-700 hover:bg-red-800'
                }`}
              >
                {status.loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}