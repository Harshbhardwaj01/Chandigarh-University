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
  submitApplication: async (data) => {
    const res = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const response = await res.json();
    if (!res.ok) throw new Error(response.error || 'Failed to submit application');
    return response;
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
              <p className="text-xs text-red-200 tracking-wider">Discover. Learn. Empower. Academics</p>
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
            <button onClick={() => setActiveTab('apply')} className="bg-yellow-500 hover:bg-yellow-400 text-red-900 px-5 py-2 rounded-md font-bold transition-transform hover:scale-105 active:scale-95 shadow-md">
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
               <button onClick={() => { setActiveTab('apply'); setIsMenuOpen(false); }} className="bg-yellow-500 text-red-900 mt-4 px-4 py-3 rounded-md font-bold text-center">
                Apply Now 2026
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        {activeTab === 'home' && (
          <HomeSection
            onExplorePrograms={() => setActiveTab('programs')}
            onVirtualTour={() => setActiveTab('virtual-tour')}
            onEngineeringPrograms={() => setActiveTab('engineering')}
            onBusinessPrograms={() => setActiveTab('business')}
          />
        )}
        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'programs' && <ProgramsSection onEngineeringPrograms={() => setActiveTab('engineering')} onBusinessPrograms={() => setActiveTab('business')} />}
        {activeTab === 'engineering' && <EngineeringProgramsSection onBackToPrograms={() => setActiveTab('programs')} />}
        {activeTab === 'business' && <BusinessProgramsSection onBackToPrograms={() => setActiveTab('programs')} />}
        {activeTab === 'virtual-tour' && <VirtualTourSection onBackHome={() => setActiveTab('home')} />}
        {activeTab === 'contact' && <ContactSection />}
          {activeTab === 'admissions' && <ApplicationSection />}
          {activeTab === 'apply' && <ApplicationSection />}
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

function HomeSection({ onExplorePrograms, onVirtualTour, onEngineeringPrograms, onBusinessPrograms }) {
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
              <button onClick={onExplorePrograms} className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-md font-bold text-lg transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] flex items-center justify-center gap-2 w-full sm:w-auto">
                Explore Programs <ChevronRight size={20} />
              </button>
              <button onClick={onVirtualTour} className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-md font-bold text-lg transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
                <Globe size={20} />
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

      {/* Program Explorer */}
      <section className="py-16 bg-white w-full">
        <div className="container mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-700 mb-2">Find your direction</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Explore Programs</h2>
            </div>
            <p className="text-gray-600 max-w-xl md:text-right">Build the skills, confidence, and connections to move into the future you want.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {[
              { name: 'Engineering', count: '30+ Programs', icon: '💻' },
              { name: 'Business Management', count: '15+ Programs', icon: '📊' },
              { name: 'Law', count: '5 Programs', icon: '⚖️' },
              { name: 'Arts & Humanities', count: '20+ Programs', icon: '🎨' },
              { name: 'Sciences', count: '25+ Programs', icon: '🔬' },
              { name: 'Allied Health Sciences', count: '10+ Programs', icon: '⚕️' },
            ].map((program) => (
              <button
                key={program.name}
                onClick={program.name === 'Engineering' ? onEngineeringPrograms : program.name === 'Business Management' ? onBusinessPrograms : onExplorePrograms}
                className="group text-left border border-gray-200 rounded-lg p-5 hover:border-red-700 hover:shadow-lg transition-all duration-300 bg-gray-50 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-3xl" aria-hidden="true">{program.icon}</span>
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-red-700 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mt-5 mb-1">{program.name}</h3>
                <p className="text-sm text-gray-500">{program.count}</p>
              </button>
            ))}
          </div>

          <div className="text-center mt-8">
            <button onClick={onExplorePrograms} className="inline-flex items-center gap-2 text-red-700 font-bold hover:text-red-900 transition-colors">
              View all academic programs <ChevronRight size={18} />
            </button>
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

function VirtualTourSection({ onBackHome }) {
  const tourStops = [
    { id: 'campus', label: 'Campus Life', title: 'A campus built for possibility', description: 'Explore green open spaces, collaborative learning zones, and a vibrant community spread across our 200-acre campus.', accent: 'from-red-900 to-red-700', icon: <Globe size={30} /> },
    { id: 'library', label: 'Central Library', title: 'Quiet spaces for big ideas', description: 'Find your next breakthrough in a technology-enabled library with extensive print and digital resources.', accent: 'from-slate-900 to-slate-700', icon: <BookOpen size={30} /> },
    { id: 'innovation', label: 'Innovation Hub', title: 'Turn curiosity into creation', description: 'Meet the labs, mentors, and makerspaces that help students move from a first idea to a real-world solution.', accent: 'from-amber-700 to-orange-600', icon: <Trophy size={30} /> },
  ];
  const [activeStop, setActiveStop] = useState(tourStops[0]);

  return (
    <div className="w-full bg-gray-50 flex-grow py-12 md:py-16">
      <div className="container mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-700 mb-2">Chandigarh University</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Take the virtual tour</h1>
            <p className="text-gray-600 mt-4 max-w-2xl">Move through a few signature spaces and get a feel for the places where CU students learn, build, and belong.</p>
          </div>
          <button onClick={onBackHome} className="inline-flex items-center gap-2 text-red-700 font-bold hover:text-red-900 transition-colors">
            <ChevronRight size={18} className="rotate-180" /> Back to home
          </button>
        </div>

        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${activeStop.accent} text-white min-h-[300px] md:min-h-[390px] p-8 md:p-12 flex items-end shadow-xl`}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-white/20"></div>
          <div className="absolute right-12 top-12 w-32 h-32 rounded-full border border-white/20"></div>
          <div className="relative max-w-2xl">
            <div className="w-16 h-16 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center mb-6">{activeStop.icon}</div>
            <p className="text-sm font-bold uppercase tracking-widest text-yellow-300 mb-3">{activeStop.label}</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{activeStop.title}</h2>
            <p className="text-white/85 text-lg leading-relaxed">{activeStop.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {tourStops.map((stop, index) => (
            <button
              key={stop.id}
              onClick={() => setActiveStop(stop)}
              className={`text-left p-5 rounded-lg border transition-all ${activeStop.id === stop.id ? 'bg-white border-red-700 shadow-md' : 'bg-white/60 border-gray-200 hover:border-red-300'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">0{index + 1}</span>
                <ChevronRight size={18} className={activeStop.id === stop.id ? 'text-red-700' : 'text-gray-400'} />
              </div>
              <h3 className="font-bold text-gray-900">{stop.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{activeStop.id === stop.id ? 'Now exploring' : 'Explore this stop'}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EngineeringProgramsSection({ onBackToPrograms }) {
  const programs = [
    { title: 'B.E. Computer Science & Engineering', level: 'Undergraduate', duration: '4 years', focus: 'Software, AI, data, and systems' },
    { title: 'B.E. Electronics & Communication', level: 'Undergraduate', duration: '4 years', focus: 'Embedded systems and communication' },
    { title: 'M.E. Computer Science & Engineering', level: 'Postgraduate', duration: '2 years', focus: 'Advanced computing and research' },
    { title: 'B.E. Mechanical Engineering', level: 'Undergraduate', duration: '4 years', focus: 'Design, automation, and manufacturing' },
    { title: 'B.E. Civil Engineering', level: 'Undergraduate', duration: '4 years', focus: 'Infrastructure and sustainable design' },
    { title: 'B.E. Artificial Intelligence & Machine Learning', level: 'Undergraduate', duration: '4 years', focus: 'Intelligent products and applied AI' },
  ];

  return (
    <div className="w-full bg-gray-50 flex-grow">
      <section className="bg-red-900 text-white py-14 md:py-20">
        <div className="container mx-auto px-4 w-full">
          <button onClick={onBackToPrograms} className="inline-flex items-center gap-2 text-red-200 hover:text-white font-semibold mb-8 transition-colors">
            <ChevronRight size={18} className="rotate-180" /> All academic programs
          </button>
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300 mb-3">School of Engineering</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">Build what comes next.</h1>
            <p className="text-lg md:text-xl text-red-100 leading-relaxed">Learn from industry-connected faculty, work in advanced labs, and turn engineering fundamentals into solutions that matter.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl">
            <div><p className="text-3xl font-extrabold text-yellow-300">30+</p><p className="text-sm text-red-200 mt-1">Programs</p></div>
            <div><p className="text-3xl font-extrabold text-yellow-300">4 years</p><p className="text-sm text-red-200 mt-1">Bachelor's degrees</p></div>
            <div><p className="text-3xl font-extrabold text-yellow-300">AICTE</p><p className="text-sm text-red-200 mt-1">Approved programs</p></div>
            <div><p className="text-3xl font-extrabold text-yellow-300">50+</p><p className="text-sm text-red-200 mt-1">Lab experiences</p></div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-700 mb-2">Choose your path</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Engineering programs</h2>
            </div>
            <p className="text-gray-600 max-w-lg md:text-right">Explore undergraduate and postgraduate options designed around emerging technologies and real engineering practice.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((program) => (
              <article key={program.title} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-red-700 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-11 h-11 rounded-lg bg-red-50 text-red-700 flex items-center justify-center"><BookOpen size={22} /></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{program.level}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3">{program.title}</h3>
                <p className="text-gray-600 text-sm mb-5">{program.focus}</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-bold text-gray-900">{program.duration}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to start building?</h2>
              <p className="text-gray-600">Explore eligibility, fee details, and the next admission cycle.</p>
            </div>
            <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-md font-bold inline-flex items-center justify-center gap-2 transition-colors">
              Start your application <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function BusinessProgramsSection({ onBackToPrograms }) {
  const programs = [
    { title: 'BBA - Business Administration', level: 'Undergraduate', duration: '3 years', focus: 'Management, entrepreneurship, and strategy' },
    { title: 'BBA - Business Analytics', level: 'Undergraduate', duration: '3 years', focus: 'Data-led decisions and business intelligence' },
    { title: 'B.Com. (Hons.)', level: 'Undergraduate', duration: '3 years', focus: 'Accounting, finance, and commerce' },
    { title: 'MBA - Business Management', level: 'Postgraduate', duration: '2 years', focus: 'Leadership, markets, and transformation' },
    { title: 'MBA - International Business', level: 'Postgraduate', duration: '2 years', focus: 'Global trade and cross-border growth' },
    { title: 'MBA - Digital Marketing', level: 'Postgraduate', duration: '2 years', focus: 'Brand, content, and digital strategy' },
  ];

  return (
    <div className="w-full bg-gray-50 flex-grow">
      <section className="bg-slate-900 text-white py-14 md:py-20">
        <div className="container mx-auto px-4 w-full">
          <button onClick={onBackToPrograms} className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold mb-8 transition-colors">
            <ChevronRight size={18} className="rotate-180" /> All academic programs
          </button>
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300 mb-3">School of Business</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">Lead with clarity.</h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">Develop the strategic thinking, practical confidence, and global perspective to create value in a fast-changing business world.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl">
            <div><p className="text-3xl font-extrabold text-yellow-300">15+</p><p className="text-sm text-slate-400 mt-1">Programs</p></div>
            <div><p className="text-3xl font-extrabold text-yellow-300">100%</p><p className="text-sm text-slate-400 mt-1">Industry aligned</p></div>
            <div><p className="text-3xl font-extrabold text-yellow-300">30+</p><p className="text-sm text-slate-400 mt-1">Specializations</p></div>
            <div><p className="text-3xl font-extrabold text-yellow-300">Global</p><p className="text-sm text-slate-400 mt-1">Business exposure</p></div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-700 mb-2">Choose your path</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Business management programs</h2>
            </div>
            <p className="text-gray-600 max-w-lg md:text-right">Build a strong business foundation, then shape your studies around the markets and ideas you want to lead.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((program) => (
              <article key={program.title} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-slate-900 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-11 h-11 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center"><Users size={22} /></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{program.level}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3">{program.title}</h3>
                <p className="text-gray-600 text-sm mb-5">{program.focus}</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-bold text-gray-900">{program.duration}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to shape the market?</h2>
              <p className="text-gray-600">Explore eligibility, fee details, and the next admission cycle.</p>
            </div>
            <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-md font-bold inline-flex items-center justify-center gap-2 transition-colors">
              Start your application <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProgramsSection({ onEngineeringPrograms, onBusinessPrograms }) {
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
                                    <button onClick={prog.id === 'eng' ? onEngineeringPrograms : prog.id === 'biz' ? onBusinessPrograms : undefined} className="flex items-center text-red-700 font-semibold text-sm group-hover:gap-2 transition-all">
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

function ApplicationSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', program: '', city: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: '', success: '' });
    try {
      const response = await API_CLIENT.submitApplication(formData);
      setStatus({ loading: false, error: '', success: `Application received. Your reference is ${response.applicationId}.` });
      setFormData({ name: '', email: '', phone: '', program: '', city: '' });
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: '' });
    }
  };

  return (
    <section className="flex-grow bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-red-700">Admissions 2026</p>
            <h2 className="mb-5 text-4xl font-extrabold text-gray-900">Start your CU journey.</h2>
            <p className="text-lg leading-relaxed text-gray-600">Share a few details and our admissions team will help you choose the right program and next step.</p>
            <div className="mt-8 border-l-4 border-yellow-500 pl-4 text-sm text-gray-600">Applications are collected securely for the 2026 admissions cycle.</div>
          </div>
          <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-gray-700">Full name<input required name="name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className="mt-2 w-full rounded-md border border-gray-300 px-3 py-3 font-normal outline-none focus:border-red-700" /></label>
              <label className="text-sm font-semibold text-gray-700">Email<input required type="email" name="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className="mt-2 w-full rounded-md border border-gray-300 px-3 py-3 font-normal outline-none focus:border-red-700" /></label>
              <label className="text-sm font-semibold text-gray-700">Phone<input required type="tel" name="phone" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} className="mt-2 w-full rounded-md border border-gray-300 px-3 py-3 font-normal outline-none focus:border-red-700" /></label>
              <label className="text-sm font-semibold text-gray-700">City<input required name="city" value={formData.city} onChange={(event) => setFormData({ ...formData, city: event.target.value })} className="mt-2 w-full rounded-md border border-gray-300 px-3 py-3 font-normal outline-none focus:border-red-700" /></label>
              <label className="text-sm font-semibold text-gray-700 sm:col-span-2">Program of interest<select required name="program" value={formData.program} onChange={(event) => setFormData({ ...formData, program: event.target.value })} className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-3 font-normal outline-none focus:border-red-700"><option value="">Select a program</option><option>Engineering</option><option>Business Management</option><option>Law</option><option>Arts & Humanities</option><option>Sciences</option><option>Allied Health Sciences</option></select></label>
            </div>
            <button disabled={status.loading} className="mt-6 w-full rounded-md bg-red-700 px-5 py-3 font-bold text-white transition-colors hover:bg-red-800 disabled:cursor-wait disabled:opacity-60">{status.loading ? 'Submitting...' : 'Submit application'}</button>
            {status.error && <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{status.error}</p>}
            {status.success && <p role="status" className="mt-4 text-sm font-semibold text-green-700">{status.success}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}