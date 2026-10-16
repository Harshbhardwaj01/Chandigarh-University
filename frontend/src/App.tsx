import React, { useState, useEffect, useRef } from 'react';
import { API_CLIENT } from './services/api';
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
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Sparkles,
  Scale,
  Palette,
  FlaskConical,
  HeartPulse,
  Compass,
  Landmark,
  Eye,
  UserRound,
  AtSign,
  PhoneCall,
  MapPinned,
  CircleCheck,
  ClipboardList,
  MessageCircle,
  BadgeCheck,
  Clock3,
  ShieldCheck
} from 'lucide-react';

const CITY_OPTIONS = [
  'Agartala', 'Ahmedabad', 'Bengaluru', 'Bhopal', 'Bhubaneswar', 'Chandigarh', 'Chennai',
  'Dehradun', 'Delhi', 'Gurugram', 'Guwahati', 'Hyderabad', 'Indore', 'Jaipur', 'Jalandhar',
  'Jammu', 'Kanpur', 'Kochi', 'Kolkata', 'Lucknow', 'Ludhiana', 'Mumbai', 'Mysuru',
  'Nagpur', 'New Delhi', 'Noida', 'Patna', 'Pune', 'Rohtak', 'Shimla', 'Srinagar',
  'Surat', 'Thiruvananthapuram', 'Varanasi', 'Visakhapatnam'
];

function SocialIcon({ network }) {
  const paths = {
    Facebook: <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.3-1.4 1.4-1.4h1.5V5.3c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v2.8h2.5V21z" />,
    Instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>,
    LinkedIn: <><path d="M5 8.5v10M5 5.5v.1M9.5 18.5v-6a3 3 0 0 1 6 0v6M9.5 12.5v6" /><circle cx="5" cy="5.5" r="1" fill="currentColor" stroke="none" /></>,
    YouTube: <><path d="M21.3 7.2a2.5 2.5 0 0 0-1.8-1.8C17.9 5 12 5 12 5s-5.9 0-7.5.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2.3 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C6.1 19 12 19 12 19s5.9 0 7.5-.4a2.5 2.5 0 0 0 1.8-1.8 26 26 0 0 0 .4-4.8 26 26 0 0 0-.4-4.8Z" /><path d="m10 15 5-3-5-3z" fill="currentColor" stroke="none" /></>,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill={network === 'Facebook' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[network]}</svg>;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ loading: false, message: '', error: false });
  const menuButtonRef = useRef(null);
  const programTabs = new Set(['engineering', 'business', 'law', 'arts-humanities', 'sciences', 'allied-health']);
  const currentNavId = activeTab === 'apply'
    ? 'admissions'
    : programTabs.has(activeTab) || activeTab === 'virtual-tour'
      ? 'programs'
      : activeTab;

  useEffect(() => {
    const updateScrollState = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setIsScrolled(window.scrollY > 24);
      setScrollProgress(scrollableHeight > 0 ? Math.max(0, Math.min(100, (window.scrollY / scrollableHeight) * 100)) : 0);
    };

    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    setNewsletterStatus({ loading: true, message: '', error: false });
    try {
      await API_CLIENT.submitContactForm({
        name: 'Website updates request',
        email: newsletterEmail,
        message: 'Please share Chandigarh University news and updates with me.',
      });
      setNewsletterEmail('');
      setNewsletterStatus({ loading: false, message: 'Your update request has been sent.', error: false });
    } catch (error) {
      setNewsletterStatus({ loading: false, message: error.message || 'Your request could not be sent.', error: true });
    }
  };

  useEffect(() => {
    const closeMenuOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeMenuOnEscape);
    return () => window.removeEventListener('keydown', closeMenuOnEscape);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    const elements = document.querySelectorAll('.reveal-on-scroll');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeTab]);

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
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="site-header__inner">
          <button className="brand-lockup" type="button" onClick={() => setActiveTab('home')} aria-label="Chandigarh University home">
            <span className="brand-mark"><span>CU</span><i /></span>
            <span className="brand-copy">
              <strong>CHANDIGARH<br className="brand-break" /> UNIVERSITY</strong>
              <small>Discover. Learn. Empower. Academics</small>
            </span>
          </button>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => setActiveTab(link.id)}
                className={`nav-link ${currentNavId === link.id ? 'is-active' : ''}`}
                aria-current={currentNavId === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
            <button type="button" onClick={() => setActiveTab('apply')} className="header-apply cu-button cu-button--primary">
              Apply Now <ArrowUpRight size={16} />
            </button>
          </nav>

          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <nav id="mobile-navigation" className={`mobile-drawer ${isMenuOpen ? 'is-open' : ''}`} aria-label="Mobile navigation" aria-hidden={!isMenuOpen}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => {
                setActiveTab(link.id);
                setIsMenuOpen(false);
                menuButtonRef.current?.focus();
              }}
              className={`mobile-nav-link ${currentNavId === link.id ? 'is-active' : ''}`}
              tabIndex={isMenuOpen ? 0 : -1}
              aria-current={currentNavId === link.id ? 'page' : undefined}
            >
              {link.label}<ArrowRight size={17} />
            </button>
          ))}
          <button type="button" onClick={() => { setActiveTab('apply'); setIsMenuOpen(false); menuButtonRef.current?.focus(); }} className="mobile-apply cu-button cu-button--primary" tabIndex={isMenuOpen ? 0 : -1}>
            Start your application <ArrowUpRight size={18} />
          </button>
        </nav>

        <div
          className="scroll-progress"
          role="progressbar"
          aria-label="Page scroll progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(scrollProgress)}
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </header>

      {/* Main Content Area */}
      <main key={activeTab} className="site-main flex-grow flex flex-col">
        {activeTab === 'home' && (
          <HomeSection
            onExplorePrograms={() => setActiveTab('programs')}
            onApply={() => setActiveTab('apply')}
            onVirtualTour={() => setActiveTab('virtual-tour')}
            onEngineeringPrograms={() => setActiveTab('engineering')}
            onBusinessPrograms={() => setActiveTab('business')}
            onLawPrograms={() => setActiveTab('law')}
            onArtsPrograms={() => setActiveTab('arts-humanities')}
            onSciencesPrograms={() => setActiveTab('sciences')}
            onAlliedHealthPrograms={() => setActiveTab('allied-health')}
          />
        )}
        {activeTab === 'about' && <AboutSection onHome={() => setActiveTab('home')} />}
        {activeTab === 'programs' && (
          <ProgramsSection
            onEngineeringPrograms={() => setActiveTab('engineering')}
            onBusinessPrograms={() => setActiveTab('business')}
            onLawPrograms={() => setActiveTab('law')}
            onArtsPrograms={() => setActiveTab('arts-humanities')}
            onSciencesPrograms={() => setActiveTab('sciences')}
            onAlliedHealthPrograms={() => setActiveTab('allied-health')}
          />
        )}
        {activeTab === 'engineering' && <EngineeringProgramsSection onBackToPrograms={() => setActiveTab('programs')} />}
        {activeTab === 'business' && <BusinessProgramsSection onBackToPrograms={() => setActiveTab('programs')} />}
        {activeTab === 'law' && <LawProgramsSection onBackToPrograms={() => setActiveTab('programs')} />}
        {activeTab === 'arts-humanities' && <ArtsAndHumanitiesProgramsSection onBackToPrograms={() => setActiveTab('programs')} />}
        {activeTab === 'sciences' && <SciencesProgramsSection onBackToPrograms={() => setActiveTab('programs')} />}
        {activeTab === 'allied-health' && <AlliedHealthProgramsSection onBackToPrograms={() => setActiveTab('programs')} />}
        {activeTab === 'virtual-tour' && <VirtualTourSection onBackHome={() => setActiveTab('home')} />}
        {activeTab === 'contact' && <ContactSection onHome={() => setActiveTab('home')} />}
          {activeTab === 'admissions' && <ApplicationSection onHome={() => setActiveTab('home')} />}
          {activeTab === 'apply' && <ApplicationSection onHome={() => setActiveTab('home')} />}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="footer-brand">
            <button className="brand-lockup" type="button" onClick={() => setActiveTab('home')} aria-label="Chandigarh University home">
              <span className="brand-mark"><span>CU</span><i /></span>
              <span className="brand-copy"><strong>CHANDIGARH<br />UNIVERSITY</strong><small>Discover. Learn. Empower. Academics</small></span>
            </button>
            <p>Gharuan, Mohali, Punjab, India.<br />A premier institution dedicated to excellence in education, research, and innovation.</p>
          </div>

          <div className="footer-column">
            <h2>Explore CU</h2>
            <div className="footer-page-links">
              {navLinks.filter((link) => ['home', 'about', 'programs', 'admissions', 'contact'].includes(link.id)).map((link) => (
                <button type="button" key={link.id} onClick={() => setActiveTab(link.id)}>{link.label}<ArrowUpRight size={13} /></button>
              ))}
            </div>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Student Login (CUIMS)</a></li>
              <li><a href="#">Alumni Network</a></li>
              <li><a href="#">Careers at CU</a></li>
              <li><a href="#">NIRF Data</a></li>
            </ul>
          </div>

          <div className="footer-column footer-contact">
            <h2>Contact</h2>
            <p><MapPin size={16} /><span>NH-95 Chandigarh-Ludhiana Highway, Mohali, Punjab (INDIA)</span></p>
            <a href="tel:1800121288800"><Phone size={16} />1800 1212 88800 (Toll Free)</a>
            <a href="mailto:admissions@cumail.in"><Mail size={16} />admissions@cumail.in</a>
            <div className="footer-socials" aria-label="Social media links">
              {[
                { name: 'Facebook' },
                { name: 'Instagram' },
                { name: 'LinkedIn' },
                { name: 'YouTube' },
              ].map(({ name }) => (
                <a href="#" key={name} aria-label={`${name} link placeholder`} title={`${name} link placeholder`}><SocialIcon network={name} /></a>
              ))}
            </div>
          </div>

          <div className="footer-newsletter">
            <span className="footer-newsletter__kicker">Stay in the loop</span>
            <h2>News from campus,<br />when it matters.</h2>
            <p>Newsletter request placeholder: connect this form to the university mailing list when available.</p>
            <form onSubmit={handleNewsletterSubmit}>
              <label className="sr-only" htmlFor="newsletter-email">Email address for university updates</label>
              <input id="newsletter-email" type="email" name="newsletterEmail" autoComplete="email" placeholder="Your email address" value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} required />
              <button type="submit" disabled={newsletterStatus.loading} aria-label="Request university updates">{newsletterStatus.loading ? 'Sending…' : <ArrowRight size={18} />}</button>
            </form>
            {newsletterStatus.message && <p className={`newsletter-status ${newsletterStatus.error ? 'is-error' : ''}`} role={newsletterStatus.error ? 'alert' : 'status'}>{newsletterStatus.message}</p>}
          </div>
        </div>
        <div className="site-footer__bottom">© {new Date().getFullYear()} Chandigarh University. All Rights Reserved. (Demo Site)</div>
      </footer>
      {activeTab !== 'apply' && activeTab !== 'admissions' && (
        <button type="button" className="mobile-float-apply cu-button cu-button--primary" onClick={() => setActiveTab('apply')}>
          Apply Now <ArrowUpRight size={17} />
        </button>
      )}
    </div>
  );
}

function HomeSection({ onExplorePrograms, onApply, onVirtualTour, onEngineeringPrograms, onBusinessPrograms, onLawPrograms, onArtsPrograms, onSciencesPrograms, onAlliedHealthPrograms }) {
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    { quote: 'TESTIMONIAL PLACEHOLDER — Replace with an approved student quote.', name: 'Student name placeholder', detail: 'Program and year placeholder' },
    { quote: 'TESTIMONIAL PLACEHOLDER — Replace with an approved student quote.', name: 'Student name placeholder', detail: 'Program and year placeholder' },
    { quote: 'TESTIMONIAL PLACEHOLDER — Replace with an approved student quote.', name: 'Student name placeholder', detail: 'Program and year placeholder' },
  ];

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
      <section className="hero-section">
        <div className="hero-glow hero-glow--one" aria-hidden="true" />
        <div className="hero-glow hero-glow--two" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />

        <div className="hero-layout">
          <div className="hero-copy">
            <span className="hero-eyebrow"><Sparkles size={14} /> NAAC A+ Accredited</span>
            <h1>
              Shape Your Future at <span>Chandigarh University</span>
            </h1>
            <p>
              Experience world-class education, unmatched global exposure, and outstanding placement opportunities at India's youngest university to be ranked by QS World University Rankings.
            </p>
            <div className="hero-actions">
              <button onClick={onExplorePrograms} className="hero-primary-action cu-button cu-button--primary">
                Explore Programs <ArrowRight size={19} />
              </button>
              <button onClick={onVirtualTour} className="hero-secondary-action cu-button cu-button--secondary">
                <Globe size={19} /> Virtual Tour
              </button>
            </div>
            <div className="hero-trust-line">
              <span className="trust-rule" />
              <span>Ideas grow here. So do futures.</span>
            </div>
          </div>

          <div
            className="hero-art"
            role="group"
            aria-label="Placeholder campus and student photographs. Replace with Chandigarh University images."
            onPointerMove={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              const x = (event.clientX - bounds.left) / bounds.width - 0.5;
              const y = (event.clientY - bounds.top) / bounds.height - 0.5;
              event.currentTarget.style.setProperty('--hero-parallax-x', `${x * 10}px`);
              event.currentTarget.style.setProperty('--hero-parallax-y', `${y * 8}px`);
            }}
            onPointerLeave={(event) => {
              event.currentTarget.style.setProperty('--hero-parallax-x', '0px');
              event.currentTarget.style.setProperty('--hero-parallax-y', '0px');
            }}
          >
            <div className="hero-art-orbit hero-art-orbit--outer" aria-hidden="true" />
            <div className="hero-art-orbit hero-art-orbit--inner" aria-hidden="true" />
            <figure className="hero-photo hero-photo--main">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85"
                alt="Placeholder photograph of a university campus building; replace with a Chandigarh University campus photo."
                fetchPriority="high"
              />
              <figcaption><GraduationCap size={17} /> A campus built for possibility</figcaption>
            </figure>
            <figure className="hero-photo hero-photo--students">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=680&q=82"
                alt="Placeholder photograph of university graduates celebrating; replace with a Chandigarh University student photo."
                loading="lazy"
              />
            </figure>
            <figure className="hero-photo hero-photo--community">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=680&q=82"
                alt="Placeholder photograph of students learning together; replace with a Chandigarh University student photo."
                loading="lazy"
              />
            </figure>
            <div className="hero-float-chip hero-float-chip--accreditation">
              <span className="chip-seal"><Sparkles size={15} /></span>
              <span><strong>NAAC A+</strong><small>Accredited</small></span>
            </div>
            <div className="hero-float-chip hero-float-chip--placement">
              <span className="chip-number">9,124+</span>
              <span><strong>Placement offers</strong><small>2025</small></span>
            </div>
            <span className="hero-placeholder-label">PLACEHOLDER PHOTOGRAPHY · REPLACE WITH CU CAMPUS IMAGES</span>
          </div>
        </div>
        <div className="hero-bottom-line" aria-hidden="true"><span /> Explore what’s possible</div>
      </section>

      {/* Stats Section */}
      <section className="stats-strip">
        <div className="stats-grid">
            <StatCard icon={<BookOpen size={21}/>} number={200} label="Programs Offered" tone="coral" />
            <StatCard icon={<Users size={21}/>} number={30000} label="Students Enrolled" tone="teal" />
            <StatCard icon={<Trophy size={21}/>} number={9124} label="Placement Offers (2025)" tone="saffron" />
            <StatCard icon={<Globe size={21}/>} number={460} label="International Tie-ups" tone="blue" />
        </div>
      </section>

      {/* Program Explorer */}
      <section className="program-section">
        <div className="program-section__inner">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
                <p className="section-kicker">Find your direction</p>
                <h2 className="section-title">Explore Programs</h2>
            </div>
            <p className="section-intro">Build the skills, confidence, and connections to move into the future you want.</p>
          </div>

          <div className="program-grid">
            {[
              { name: 'Engineering', count: '30+ Programs', icon: BookOpen, accent: 'blue', description: 'Build, test, and improve the systems shaping tomorrow.', popular: 'Computer Science · AI · Mechanical' },
              { name: 'Business Management', count: '15+ Programs', icon: Users, accent: 'teal', description: 'Turn strategic thinking into confident decisions.', popular: 'Business · Analytics · Marketing' },
              { name: 'Law', count: '5 Programs', icon: Scale, accent: 'saffron', description: 'Explore justice, policy, advocacy, and professional ethics.', popular: 'B.A. LL.B. · B.Com. LL.B. · LL.M.' },
              { name: 'Arts & Humanities', count: '20+ Programs', icon: Palette, accent: 'coral', description: 'Make sense of culture, communication, and society.', popular: 'English · Psychology · Journalism' },
              { name: 'Sciences', count: '25+ Programs', icon: FlaskConical, accent: 'teal', description: 'Ask better questions through research and discovery.', popular: 'Physics · Chemistry · Biotechnology' },
              { name: 'Allied Health Sciences', count: '10+ Programs', icon: HeartPulse, accent: 'crimson', description: 'Prepare for careers centered on care and wellbeing.', popular: 'Nursing · Physiotherapy · Nutrition' },
            ].map((program) => {
              const ProgramIcon = program.icon;
              return (
              <button
                key={program.name}
                onClick={
                  program.name === 'Engineering'
                    ? onEngineeringPrograms
                    : program.name === 'Business Management'
                      ? onBusinessPrograms
                      : program.name === 'Law'
                        ? onLawPrograms
                        : program.name === 'Arts & Humanities'
                          ? onArtsPrograms
                          : program.name === 'Sciences'
                            ? onSciencesPrograms
                            : program.name === 'Allied Health Sciences'
                              ? onAlliedHealthPrograms
                              : onExplorePrograms
                }
                className={`program-card program-card--${program.accent} group text-left reveal-on-scroll`}
              >
                <div className="program-card__topline">
                  <span className="program-icon"><ProgramIcon size={22} strokeWidth={1.8} /></span>
                  <ArrowUpRight size={19} className="program-card__arrow" aria-hidden="true" />
                </div>
                <h3>{program.name}</h3>
                <p className="program-card__count">{program.count}</p>
                <p className="program-card__description">{program.description}</p>
                <div className="program-card__popular">
                  <span>Popular courses</span>
                  <p>{program.popular}</p>
                </div>
              </button>
            );})}
          </div>

          <div className="text-center mt-8">
            <button onClick={onExplorePrograms} className="inline-flex items-center gap-2 text-red-700 font-bold hover:text-red-900 transition-colors">
              View all academic programs <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="partner-strip" aria-label="Recruiter and industry partner logo placeholders">
        <div className="partner-strip__inner">
          <div className="partner-strip__heading">
            <span>Built for a connected future</span>
            <span className="placeholder-flag">LOGO PLACEHOLDERS</span>
          </div>
          <div className="partner-marquee" aria-hidden="true">
            <div className="partner-marquee__track">
              {['RECRUITER LOGO', 'INDUSTRY PARTNER', 'GLOBAL NETWORK', 'CAMPUS HIRING', 'RECRUITER LOGO', 'INDUSTRY PARTNER', 'GLOBAL NETWORK', 'CAMPUS HIRING'].map((label, index) => (
                <span key={`${label}-${index}`} className="partner-wordmark">{label}</span>
              ))}
            </div>
          </div>
          <p className="sr-only">Placeholder recruiter and partner logos. Replace with approved partner marks.</p>
        </div>
      </section>

      <section className="why-section">
        <div className="why-section__inner">
          <div className="section-heading reveal-on-scroll">
            <div>
              <p className="section-kicker">Why CU</p>
              <h2 className="section-title">Find your place.<br />Make it matter.</h2>
            </div>
            <p className="section-intro">A university is more than a place to study. It is where interests meet people, ideas, and new possibilities.</p>
          </div>
          <div className="why-bento reveal-stagger">
            <article className="why-tile why-tile--campus reveal-on-scroll">
              <span className="why-tile__icon"><GraduationCap size={21} /></span>
              <p className="why-tile__eyebrow">Room to grow</p>
              <h3>A 200-acre green campus</h3>
              <p>Space to learn, explore, and find your community.</p>
              <span className="why-tile__number">200 <small>acres</small></span>
            </article>
            <article className="why-tile why-tile--community reveal-on-scroll">
              <span className="why-tile__icon"><Globe size={21} /></span>
              <p className="why-tile__eyebrow">A wider perspective</p>
              <h3>28 states. 50 countries.</h3>
              <p>A cosmopolitan learning environment, already described in CU's campus story.</p>
              <div className="community-markers"><span>INDIA</span><span>WORLD</span></div>
            </article>
            <article className="why-tile why-tile--learning reveal-on-scroll">
              <span className="why-tile__icon"><BookOpen size={21} /></span>
              <p className="why-tile__eyebrow">Choose a direction</p>
              <h3>200+ programs offered</h3>
              <p>Explore disciplines and discover where your curiosity leads.</p>
              <button type="button" className="text-link" onClick={onExplorePrograms}>Explore programs <ArrowRight size={16} /></button>
            </article>
            <article className="why-tile why-tile--accreditation reveal-on-scroll">
              <span className="why-tile__icon"><Sparkles size={21} /></span>
              <p className="why-tile__eyebrow">A recognized standard</p>
              <h3>NAAC A+ accredited</h3>
              <p>Academic quality is at the heart of the CU story.</p>
              <span className="accreditation-mark">A<span>+</span></span>
            </article>
          </div>
        </div>
      </section>

      <section className="placement-section">
        <div className="placement-layout">
          <div className="placement-intro reveal-on-scroll">
            <p className="section-kicker">From learning to opportunity</p>
            <h2 className="section-title">The placement journey</h2>
            <p className="section-intro">A simple view of the steps from developing your direction to meeting employers.</p>
            <div className="placement-highlight">
              <Trophy size={19} />
              <span><strong>9,124+</strong><small>Placement offers (2025)</small></span>
            </div>
          </div>
          <ol className="placement-timeline reveal-stagger">
            <li className="placement-step reveal-on-scroll"><span className="placement-step__index">01</span><div><h3>Discover your strengths</h3><p>Explore interests, programs, and possible paths.</p></div></li>
            <li className="placement-step reveal-on-scroll"><span className="placement-step__index">02</span><div><h3>Build your experience</h3><p>Develop skills through your academic journey.</p></div></li>
            <li className="placement-step reveal-on-scroll"><span className="placement-step__index">03</span><div><h3>Meet opportunities</h3><p>Prepare for conversations with potential employers.</p></div></li>
            <li className="placement-step placement-step--result reveal-on-scroll"><span className="placement-step__index">04</span><div><h3>Placement offers (2025)</h3><p>9,124 offers, as listed on this site.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="campus-gallery-section">
        <div className="campus-gallery__inner">
          <div className="section-heading reveal-on-scroll">
            <div><p className="section-kicker">Life beyond the lecture hall</p><h2 className="section-title">A campus in motion</h2></div>
            <p className="section-intro">PLACEHOLDER GALLERY — replace these images with approved Chandigarh University campus photography.</p>
          </div>
          <div className="campus-gallery reveal-stagger">
            <figure className="campus-gallery__item campus-gallery__item--large reveal-on-scroll">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=82" alt="Placeholder image of students learning together; replace with an approved campus-life photograph." loading="lazy" />
              <figcaption><span>PLACEHOLDER IMAGE</span><strong>Ideas grow together</strong></figcaption>
            </figure>
            <figure className="campus-gallery__item campus-gallery__item--top reveal-on-scroll">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=82" alt="Placeholder image of graduates; replace with an approved Chandigarh University photograph." loading="lazy" />
              <figcaption><span>PLACEHOLDER IMAGE</span><strong>Celebrate every milestone</strong></figcaption>
            </figure>
            <figure className="campus-gallery__item campus-gallery__item--bottom reveal-on-scroll">
              <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=82" alt="Placeholder image of a university building; replace with an approved Chandigarh University photograph." loading="lazy" />
              <figcaption><span>PLACEHOLDER IMAGE</span><strong>Find your space</strong></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="testimonial-section" aria-label="Student testimonial carousel">
        <div className="testimonial-layout">
          <div className="testimonial-heading reveal-on-scroll">
            <p className="section-kicker">Student voices</p>
            <h2 className="section-title">Stories from the CU community</h2>
            <p className="placeholder-flag">TESTIMONIAL PLACEHOLDERS — replace with approved student stories</p>
          </div>
          <div className="testimonial-card reveal-on-scroll" aria-live="polite">
            <span className="testimonial-quote-mark" aria-hidden="true">“</span>
            <p className="testimonial-quote">{testimonials[activeTestimonial].quote}</p>
            <div className="testimonial-footer">
              <div><strong>{testimonials[activeTestimonial].name}</strong><span>{testimonials[activeTestimonial].detail}</span></div>
              <div className="testimonial-controls">
                <button type="button" aria-label="Previous testimonial" onClick={() => setActiveTestimonial((index) => (index + testimonials.length - 1) % testimonials.length)}><ChevronRight size={18} className="rotate-180" /></button>
                <button type="button" aria-label="Next testimonial" onClick={() => setActiveTestimonial((index) => (index + 1) % testimonials.length)}><ChevronRight size={18} /></button>
              </div>
            </div>
            <div className="testimonial-dots" aria-label={`Testimonial ${activeTestimonial + 1} of ${testimonials.length}`}>
              {testimonials.map((testimonial, index) => <button key={index} type="button" aria-label={`Show testimonial ${index + 1}`} aria-current={index === activeTestimonial ? 'true' : undefined} onClick={() => setActiveTestimonial(index)} />)}
            </div>
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

      <section className="final-cta">
        <div className="final-cta__inner">
          <div>
            <p className="section-kicker">Admissions 2026</p>
            <h2>Start your CU journey.</h2>
            <p>Share a few details and our admissions team will help you choose the right program and next step.</p>
          </div>
          <div className="final-cta__actions">
            <button type="button" className="final-cta__primary cu-button cu-button--primary" onClick={onApply}>Start your application <ArrowUpRight size={18} /></button>
            <button type="button" className="final-cta__secondary cu-button cu-button--secondary" onClick={onExplorePrograms}>Explore programs <ArrowRight size={17} /></button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, number, label, tone }) {
  const statRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = statRef.current;
    if (!element) return undefined;
    if (!('IntersectionObserver' in window)) {
      setDisplayValue(number);
      return undefined;
    }

    let animationFrame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setDisplayValue(number);
        return;
      }

      const startTime = performance.now();
      const duration = 1250;
      const animate = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.round(number * easedProgress));
        if (progress < 1) animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }, { threshold: 0.35 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [number]);

  return (
    <div ref={statRef} className="stat-card reveal-on-scroll">
      <div className={`stat-icon stat-icon--${tone}`}>
        {icon}
      </div>
      <div className="stat-number" aria-label={`${new Intl.NumberFormat('en-US').format(number)}+ ${label}`}>
        {new Intl.NumberFormat('en-US').format(displayValue)}<span>+</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function PageHero({ eyebrow, title, description, breadcrumb, onHome, icon: Icon = GraduationCap, theme = 'maroon' }) {
  return (
    <section className={`page-hero page-hero--${theme}`}>
      <div className="page-hero__pattern" aria-hidden="true" />
      <div className="page-hero__inner">
        <nav className="page-hero__breadcrumb" aria-label="Breadcrumb">
          <button type="button" onClick={onHome}>Home</button><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">{breadcrumb}</span>
        </nav>
        <div className="page-hero__content">
          <p className="page-hero__eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="page-hero__emblem" aria-hidden="true"><Icon size={40} strokeWidth={1.4} /></div>
      </div>
    </section>
  );
}

function AboutSection({ onHome }) {
  const campusHighlights = [
    { label: 'A campus to explore', value: '200 Acre Campus', detail: 'State-of-the-art infrastructure facilitating modern education.', Icon: GraduationCap, tone: 'teal' },
    { label: 'Academic quality', value: 'NAAC A+', detail: 'Accredited by the National Assessment and Accreditation Council.', Icon: Sparkles, tone: 'saffron' },
    { label: 'Across India', value: '28 states', detail: 'Students from across India learn and grow together.', Icon: MapPin, tone: 'coral' },
    { label: 'A global community', value: '50 countries', detail: 'A truly cosmopolitan learning environment.', Icon: Globe, tone: 'blue' },
  ];

  const journey = [
    { title: 'Find your direction', detail: 'Explore interests and choose a path that feels like yours.', Icon: Compass },
    { title: 'Learn with purpose', detail: 'Build knowledge through teaching, research, and innovation.', Icon: BookOpen },
    { title: 'Grow in community', detail: 'Learn alongside people with perspectives from around the world.', Icon: Users },
    { title: 'Become a capable professional', detail: 'Carry your learning into the work and ideas ahead.', Icon: ArrowUpRight },
  ];

  return (
    <div className="inner-page inner-page--about">
      <PageHero
        eyebrow="About Chandigarh University"
        title="About Chandigarh University"
        description="Committed to excellence in teaching, research, and innovation to develop global leaders."
        breadcrumb="About Us"
        onHome={onHome}
        icon={Landmark}
      />

      <section className="about-intro section-pad">
        <div className="about-intro__inner">
          <div className="about-intro__copy reveal-on-scroll">
            <p className="section-kicker">The CU story</p>
            <h2 className="section-title">A Legacy of Excellence</h2>
            <p>Chandigarh University (CU) is a leading Indian Institution offering its students a unique amalgamation of professional and academic excellence. The University has been accredited with the prestigious A+ grade by the National Assessment and Accreditation Council (NAAC).</p>
            <p>Located in the vicinity of Chandigarh, a city named as the 'City Beautiful', CU offers a sprawling 200-acre green campus. Home to students from 28 Indian states and 50 countries, we provide a truly cosmopolitan learning environment.</p>
          </div>
          <div className="about-highlight-grid reveal-stagger" aria-label="Chandigarh University highlights">
            {campusHighlights.map(({ label, value, detail, Icon, tone }) => (
              <article key={label} className={`about-highlight about-highlight--${tone} reveal-on-scroll`}>
                <span className="about-highlight__icon"><Icon size={21} /></span>
                <span className="about-highlight__label">{label}</span>
                <strong>{value}</strong>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vision-mission-section">
        <div className="vision-mission__inner">
          <article className="purpose-card purpose-card--vision reveal-on-scroll">
            <span className="purpose-card__icon"><Eye size={23} /></span>
            <p className="section-kicker">Our north star</p>
            <h2>Vision</h2>
            <p>To be globally recognized as a Centre of Excellence for Research, Innovation, Entrepreneurship and disseminating knowledge.</p>
          </article>
          <article className="purpose-card purpose-card--mission reveal-on-scroll">
            <span className="purpose-card__icon"><Compass size={23} /></span>
            <p className="section-kicker">Our commitment</p>
            <h2>Mission</h2>
            <p>Providing contemporary and rigorous educational experiences that develop the students into capable professionals.</p>
          </article>
        </div>
      </section>

      <section className="journey-section section-pad">
        <div className="journey__inner">
          <div className="section-heading reveal-on-scroll">
            <div><p className="section-kicker">A student's journey</p><h2 className="section-title">From curiosity to capability</h2></div>
            <p className="section-intro">A simple path through discovery, learning, community, and the next step.</p>
          </div>
          <ol className="about-journey reveal-stagger">
            {journey.map(({ title, detail, Icon }, index) => (
              <li key={title} className="about-journey__step reveal-on-scroll">
                <span className="about-journey__number">0{index + 1}</span>
                <span className="about-journey__icon"><Icon size={20} /></span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-gallery-section">
        <div className="about-gallery__inner">
          <div className="section-heading reveal-on-scroll">
            <div><p className="section-kicker">PLACEHOLDER PHOTOGRAPHY</p><h2 className="section-title">A place to learn and belong</h2></div>
            <p className="section-intro">Replace these sample images with approved Chandigarh University campus photography.</p>
          </div>
          <div className="about-gallery reveal-stagger">
            <figure className="about-gallery__photo about-gallery__photo--campus reveal-on-scroll">
              <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=82" alt="Placeholder university building photograph; replace with an approved Chandigarh University campus image." loading="lazy" />
              <figcaption><span>PLACEHOLDER IMAGE</span><strong>Campus spaces</strong></figcaption>
            </figure>
            <figure className="about-gallery__photo about-gallery__photo--students reveal-on-scroll">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=82" alt="Placeholder students collaborating; replace with an approved Chandigarh University campus image." loading="lazy" />
              <figcaption><span>PLACEHOLDER IMAGE</span><strong>Learning together</strong></figcaption>
            </figure>
          </div>
        </div>
      </section>
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

function ProgramsSection({ onEngineeringPrograms, onBusinessPrograms, onLawPrograms, onArtsPrograms, onSciencesPrograms, onAlliedHealthPrograms }) {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPDF, setShowPDF] = useState(false);
  const programIcons = { eng: BookOpen, biz: Users, law: Scale, art: Palette, sci: FlaskConical, med: HeartPulse };

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
                        {programs.map((prog) => {
                          const ProgramIcon = programIcons[prog.id] || GraduationCap;
                          return (
                            <div key={prog.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group w-full">
                                <div className="h-2 bg-red-700 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                                <div className="p-6 w-full">
                              <div className="program-icon mb-4"><ProgramIcon size={22} strokeWidth={1.8} /></div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{prog.name}</h3>
                                    <p className="text-sm text-gray-500 mb-4 font-medium">{prog.count}</p>
                                    <button onClick={
                                        prog.id === 'eng'
                                            ? onEngineeringPrograms
                                            : prog.id === 'biz'
                                                ? onBusinessPrograms
                                                : prog.id === 'law'
                                                    ? onLawPrograms
                                                    : prog.id === 'art'
                                                        ? onArtsPrograms
                                                        : prog.id === 'sci'
                                                            ? onSciencesPrograms
                                                            : prog.id === 'med'
                                                                ? onAlliedHealthPrograms
                                                                : undefined
                                    } className="flex items-center text-red-700 font-semibold text-sm group-hover:gap-2 transition-all">
                                        Explore Details <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                          );
                        })}
                    </div>
                )}
                
                <div className="mt-12 text-center w-full">
                    <button
                        onClick={() => setShowPDF(!showPDF)}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center gap-2"
                    >
                        {showPDF ? "Hide Brochure" : "View Complete Brochure"}
                        <ChevronDown size={18} />
                    </button>

                    {showPDF && (
                        <div className="mt-6 w-full">
                            <iframe
                                src="https://drive.google.com/file/d/1o9496X9rbbFa7D73Rb7kgQ1fOTsbA5TA/preview"
                                width="100%"
                                height="700px"
                                className="rounded-lg border border-gray-300"
                                title="Complete Brochure"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function LawProgramsSection({ onBackToPrograms }) {
  const programs = [
    { title: 'B.A. LL.B. (Hons.)', level: 'Undergraduate', duration: '5 years', focus: 'Law, governance, and advocacy' },
    { title: 'B.Com. LL.B. (Hons.)', level: 'Undergraduate', duration: '5 years', focus: 'Corporate law and commerce practice' },
    { title: 'LL.M.', level: 'Postgraduate', duration: '1 year', focus: 'Specialized legal research and practice' },
    { title: 'Ph.D. Law', level: 'Doctoral', duration: '3-5 years', focus: 'Legal scholarship and policy studies' },
  ];

  return (
    <div className="w-full bg-gray-50 flex-grow">
      <section className="bg-amber-800 text-white py-14 md:py-20">
        <div className="container mx-auto px-4 w-full">
          <button onClick={onBackToPrograms} className="inline-flex items-center gap-2 text-amber-100 hover:text-white font-semibold mb-8 transition-colors">
            <ChevronRight size={18} className="rotate-180" /> All academic programs
          </button>
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300 mb-3">School of Law</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">Advocate the future.</h1>
            <p className="text-lg md:text-xl text-amber-100 leading-relaxed">Learn legal reasoning, public policy, and professional ethics to lead with clarity in a changing legal landscape.</p>
          </div>
        </div>
      </section>
      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((program) => (
              <article key={program.title} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-amber-700 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center"><Scale size={22} /></div>
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
        </div>
      </section>
    </div>
  );
}

function ArtsAndHumanitiesProgramsSection({ onBackToPrograms }) {
  const programs = [
    { title: 'B.A. English', level: 'Undergraduate', duration: '3 years', focus: 'Literature, media, and communication' },
    { title: 'B.A. Psychology', level: 'Undergraduate', duration: '3 years', focus: 'Human behavior and social understanding' },
    { title: 'B.A. Journalism & Mass Communication', level: 'Undergraduate', duration: '3 years', focus: 'Storytelling, media, and public discourse' },
    { title: 'M.A. Political Science', level: 'Postgraduate', duration: '2 years', focus: 'Public policy, governance, and society' },
  ];

  return (
    <div className="w-full bg-gray-50 flex-grow">
      <section className="bg-violet-800 text-white py-14 md:py-20">
        <div className="container mx-auto px-4 w-full">
          <button onClick={onBackToPrograms} className="inline-flex items-center gap-2 text-violet-100 hover:text-white font-semibold mb-8 transition-colors">
            <ChevronRight size={18} className="rotate-180" /> All academic programs
          </button>
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300 mb-3">School of Arts & Humanities</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">Shape ideas.</h1>
            <p className="text-lg md:text-xl text-violet-100 leading-relaxed">Explore how culture, language, society, and creativity inform leadership, innovation, and public life.</p>
          </div>
        </div>
      </section>
      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((program) => (
              <article key={program.title} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-violet-700 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-11 h-11 rounded-lg bg-violet-50 text-violet-800 flex items-center justify-center"><Palette size={22} /></div>
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
        </div>
      </section>
    </div>
  );
}

function SciencesProgramsSection({ onBackToPrograms }) {
  const programs = [
    { title: 'B.Sc. Physics', level: 'Undergraduate', duration: '3 years', focus: 'Research, measurement, and applied theory' },
    { title: 'B.Sc. Chemistry', level: 'Undergraduate', duration: '3 years', focus: 'Material and chemical innovation' },
    { title: 'B.Sc. Biotechnology', level: 'Undergraduate', duration: '3 years', focus: 'Life sciences, lab practice, and biotech solutions' },
    { title: 'M.Sc. Data Science', level: 'Postgraduate', duration: '2 years', focus: 'Applied analytics, AI, and decision science' },
  ];

  return (
    <div className="w-full bg-gray-50 flex-grow">
      <section className="bg-emerald-800 text-white py-14 md:py-20">
        <div className="container mx-auto px-4 w-full">
          <button onClick={onBackToPrograms} className="inline-flex items-center gap-2 text-emerald-100 hover:text-white font-semibold mb-8 transition-colors">
            <ChevronRight size={18} className="rotate-180" /> All academic programs
          </button>
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300 mb-3">School of Sciences</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">Discover the science of tomorrow.</h1>
            <p className="text-lg md:text-xl text-emerald-100 leading-relaxed">Build strong scientific reasoning, practical experimentation, and interdisciplinary problem-solving abilities.</p>
          </div>
        </div>
      </section>
      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((program) => (
              <article key={program.title} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-emerald-700 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center"><FlaskConical size={22} /></div>
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
        </div>
      </section>
    </div>
  );
}

function AlliedHealthProgramsSection({ onBackToPrograms }) {
  const programs = [
    { title: 'B.Sc. Nursing', level: 'Undergraduate', duration: '4 years', focus: 'Clinical practice and patient-centered care' },
    { title: 'BPT - Physiotherapy', level: 'Undergraduate', duration: '4 years', focus: 'Mobility, rehabilitation, and recovery care' },
    { title: 'BMLT - Medical Lab Technology', level: 'Undergraduate', duration: '3 years', focus: 'Diagnostics and laboratory sciences' },
    { title: 'M.Sc. Nutrition & Dietetics', level: 'Postgraduate', duration: '2 years', focus: 'Clinical nutrition and public health' },
  ];

  return (
    <div className="w-full bg-gray-50 flex-grow">
      <section className="bg-cyan-800 text-white py-14 md:py-20">
        <div className="container mx-auto px-4 w-full">
          <button onClick={onBackToPrograms} className="inline-flex items-center gap-2 text-cyan-100 hover:text-white font-semibold mb-8 transition-colors">
            <ChevronRight size={18} className="rotate-180" /> All academic programs
          </button>
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300 mb-3">School of Allied Health Sciences</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">Care for communities.</h1>
            <p className="text-lg md:text-xl text-cyan-100 leading-relaxed">Prepare for patient-facing, diagnostics, and health-support careers that make a measurable difference every day.</p>
          </div>
        </div>
      </section>
      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((program) => (
              <article key={program.title} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-cyan-700 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-11 h-11 rounded-lg bg-cyan-50 text-cyan-800 flex items-center justify-center"><HeartPulse size={22} /></div>
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
        </div>
      </section>
    </div>
  );
}

function ContactSection({ onHome }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, error: null, success: false });
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);

  useEffect(() => {
    const updateOfficeStatus = () => {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      }).formatToParts(new Date());
      const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
      const hour = Number(values.hour);
      const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].includes(values.weekday);
      setIsOfficeOpen(isWeekday && hour >= 9 && hour < 17);
    };

    updateOfficeStatus();
    const interval = window.setInterval(updateOfficeStatus, 60_000);
    return () => window.clearInterval(interval);
  }, []);

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
    <div className="inner-page inner-page--contact">
      <PageHero eyebrow="We’re here to help" title="Get in Touch" description="Have questions? Fill out the form below and our team will get back to you." breadcrumb="Contact" onHome={onHome} icon={Mail} theme="teal" />
      <section className="contact-section">
        <div className="contact-layout">
          <div className="contact-details">
            <div className="contact-heading"><p className="section-kicker">Chandigarh University</p><h2 className="section-title">Admissions Office</h2></div>
            <div className="contact-methods">
              <article className="contact-method contact-method--coral">
                <span className="contact-method__icon"><MapPin size={20} /></span>
                <div><h3>Address</h3><p>Chandigarh University<br />NH-95 Chandigarh-Ludhiana Highway,<br />Mohali, Punjab (INDIA)</p></div>
                <a className="contact-map-link" href="https://maps.google.com/?q=NH-95+Chandigarh-Ludhiana+Highway+Mohali+Punjab" target="_blank" rel="noreferrer">Open campus map <ArrowUpRight size={14} /></a>
              </article>
              <article className="contact-method contact-method--teal">
                <span className="contact-method__icon"><Phone size={20} /></span>
                <div><h3>Phone</h3><p>General Inquiries</p><a href="tel:1800121288800">1800 1212 88800</a><p>International</p><a href="tel:+911603051003">+91-160-3051003</a></div>
              </article>
              <article className="contact-method contact-method--blue">
                <span className="contact-method__icon"><Mail size={20} /></span>
                <div><h3>Email</h3><a href="mailto:admissions@cumail.in">admissions@cumail.in</a><a href="mailto:info@cumail.in">info@cumail.in</a></div>
              </article>
            </div>

            <div className="office-hours-card">
              <span className={`office-status ${isOfficeOpen ? 'is-open' : 'is-closed'}`}><i />{isOfficeOpen ? 'Open now' : 'Closed'}</span>
              <div className="office-hours-card__heading"><Clock3 size={19} /><h3>Office Hours</h3></div>
              <p>Monday - Saturday: 9:00 AM to 5:00 PM</p>
              <p>Sunday: Closed</p>
              <small>Hours shown in India Standard Time.</small>
            </div>

            <div className="map-placeholder" role="img" aria-label="Map preview placeholder for Chandigarh University, NH-95 Chandigarh-Ludhiana Highway, Mohali, Punjab">
              <div className="map-placeholder__grid" aria-hidden="true" />
              <span className="map-placeholder__road map-placeholder__road--one" aria-hidden="true" />
              <span className="map-placeholder__road map-placeholder__road--two" aria-hidden="true" />
              <span className="map-placeholder__pin"><MapPinned size={24} /></span>
              <div className="map-placeholder__label"><strong>MAP PREVIEW PLACEHOLDER</strong><span>Replace with an approved campus map.</span></div>
            </div>

            <div className="contact-faq">
              <p className="section-kicker">Quick answers</p>
              <h2>Frequently asked questions</h2>
              <details><summary>Where is Chandigarh University?</summary><p>NH-95 Chandigarh-Ludhiana Highway, Mohali, Punjab (INDIA).</p></details>
              <details><summary>How can I reach the Admissions Office?</summary><p>Call 1800 1212 88800 or email admissions@cumail.in.</p></details>
              <details><summary>How do I ask about a program?</summary><p>Use the message form here and include the program you are interested in.</p></details>
            </div>
          </div>

          <div className="contact-form-shell">
            <div className="contact-form-card">
              <div className="contact-form-card__heading"><span className="contact-form-card__icon"><MessageCircle size={21} /></span><div><p className="section-kicker">Contact our team</p><h2>Send us a message</h2><p>Have questions? Fill out the form below and our team will get back to you.</p></div></div>
              <form onSubmit={handleSubmit} className="contact-form">
                <label htmlFor="contact-name">Full Name *<span className="contact-input-wrap"><UserRound size={17} /><input id="contact-name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" autoComplete="name" required /></span></label>
                <label htmlFor="contact-email">Email Address *<span className="contact-input-wrap"><AtSign size={17} /><input id="contact-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" required /></span></label>
                <label htmlFor="contact-message">Your Message<span className="contact-input-wrap contact-input-wrap--textarea"><MessageCircle size={17} /><textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="How can we help you?" /></span></label>
                {status.error && <div className="form-message form-message--error" role="alert">{status.error}</div>}
                {status.success && <div className="form-message form-message--success" role="status"><CircleCheck size={18} />Thank you! Your message has been sent successfully.</div>}
                <button type="submit" disabled={status.loading} className="contact-submit cu-button cu-button--primary">
                  {status.loading ? <><span className="submit-spinner" />Sending...</> : <>Send Message <ArrowRight size={17} /></>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ApplicationSection({ onHome }) {
  const emptyForm = { name: '', email: '', phone: '', program: '', city: '' };
  const [formData, setFormData] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const programOptions = ['Engineering', 'Business Management', 'Law', 'Arts & Humanities', 'Sciences', 'Allied Health Sciences'];
  const cityPattern = '(Amritsar|Ahmedabad|Bengaluru|Bhopal|Bhubaneswar|Chandigarh|Chennai|Dehradun|Delhi|Gurugram|Guwahati|Hyderabad|Indore|Jaipur|Jalandhar|Jammu|Kanpur|Kochi|Kolkata|Lucknow|Ludhiana|Mumbai|Mysuru|Nagpur|New Delhi|Noida|Patna|Pune|Rohtak|Shimla|Srinagar|Surat|Thiruvananthapuram|Varanasi|Visakhapatnam)';
  const applySteps = [
    { label: 'Apply', Icon: ClipboardList },
    { label: 'Counselling', Icon: MessageCircle },
    { label: 'Confirm seat', Icon: BadgeCheck },
    { label: 'Join', Icon: GraduationCap },
  ];
  const validateField = (name, value) => {
    if (!value.trim()) return 'This field is required.';
    if (name === 'name' && value.trim().length < 2) return 'Enter at least 2 characters.';
    if (name === 'name' && !/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value.trim())) return 'Use letters with spaces between names.';
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email address.';
    if (name === 'phone' && !/^\d{10}$/.test(value.trim())) return 'Enter exactly 10 digits.';
    if (name === 'city' && !CITY_OPTIONS.includes(value.trim())) return 'Choose a city from the suggestions.';
    if (name === 'program' && !programOptions.includes(value)) return 'Choose a program of interest.';
    return '';
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: validateField(name, value) }));
    setStatus((current) => current.error || current.success ? { loading: false, error: '', success: '' } : current);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = Object.fromEntries(Object.entries(formData).map(([name, value]) => [name, validateField(name, value)]));
    setFieldErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus({ loading: true, error: '', success: '' });
    try {
      await API_CLIENT.submitApplication(formData);
      setStatus({ loading: false, error: '', success: 'Application received.' });
      setFormData(emptyForm);
      setFieldErrors({});
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: '' });
    }
  };

  return (
    <div className="inner-page inner-page--admissions">
      <PageHero
        eyebrow="Admissions 2026"
        title="Start your CU journey."
        description="Share a few details and our admissions team will help you choose the right program and next step."
        breadcrumb="Admissions"
        onHome={onHome}
        icon={ArrowUpRight}
        theme="coral"
      />
      <section className="admissions-section">
        <div className="admissions-layout">
          <aside className="admissions-aside">
            <div className="admissions-steps-card">
              <p className="section-kicker">How to apply</p>
              <h2>Four steps to get started</h2>
              <ol className="admissions-steps">
                {applySteps.map(({ label, Icon }, index) => (
                  <li key={label} className={index === 0 ? 'is-current' : ''}>
                    <span className="admissions-step__icon"><Icon size={18} /></span>
                    <span className="admissions-step__text"><small>STEP 0{index + 1}</small><strong>{label}</strong></span>
                    {index < applySteps.length - 1 && <span className="admissions-step__line" aria-hidden="true" />}
                  </li>
                ))}
              </ol>
            </div>

            <div className="why-apply-card">
              <p className="section-kicker">Why apply now</p>
              <h2>Make your next step yours.</h2>
              <ul>
                <li><CircleCheck size={17} />Explore a wide range of programs.</li>
                <li><CircleCheck size={17} />Ask about global exposure and opportunities.</li>
                <li><CircleCheck size={17} />Get help choosing a program and next step.</li>
              </ul>
            </div>

            <div className="admissions-helpline">
              <span className="admissions-helpline__icon"><PhoneCall size={19} /></span>
              <div><small>Need help?</small><strong>Admissions helpline</strong></div>
              <a href="tel:1800121288800">1800 1212 88800</a>
              <a href="mailto:admissions@cumail.in">admissions@cumail.in</a>
            </div>
          </aside>

          <div className="admissions-form-shell">
            <form onSubmit={handleSubmit} className="admissions-form" noValidate>
              <div className="admissions-form__heading">
                <span className="admissions-form__icon"><GraduationCap size={21} /></span>
                <div><p className="section-kicker">Admissions 2026</p><h2>Application form</h2><p>Tell us a little about yourself.</p></div>
              </div>
              <div className="admissions-fields">
                <label className="admissions-field" htmlFor="application-name">Full name *
                  <span className="admissions-input-wrap"><UserRound size={17} /><input id="application-name" required name="name" minLength={2} maxLength={80} pattern="[A-Za-z]+(?: [A-Za-z]+)*" title="Use alphabets only; spaces are allowed between names." autoComplete="name" placeholder="e.g. Asha Singh" value={formData.name} onChange={handleFieldChange} aria-invalid={Boolean(fieldErrors.name)} aria-describedby="application-name-error" /></span>
                  <span id="application-name-error" className="field-error" aria-live="polite">{fieldErrors.name}</span>
                </label>
                <label className="admissions-field" htmlFor="application-email">Email address *
                  <span className="admissions-input-wrap"><AtSign size={17} /><input id="application-email" required type="email" name="email" maxLength={254} autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={handleFieldChange} aria-invalid={Boolean(fieldErrors.email)} aria-describedby="application-email-error" /></span>
                  <span id="application-email-error" className="field-error" aria-live="polite">{fieldErrors.email}</span>
                </label>
                <label className="admissions-field" htmlFor="application-phone">Phone number *
                  <span className="admissions-input-wrap"><Phone size={17} /><input id="application-phone" required type="tel" name="phone" minLength={10} maxLength={10} pattern="[0-9]{10}" title="Enter exactly 10 digits." autoComplete="tel" placeholder="10-digit mobile number" value={formData.phone} onChange={handleFieldChange} aria-invalid={Boolean(fieldErrors.phone)} aria-describedby="application-phone-error" /></span>
                  <span id="application-phone-error" className="field-error" aria-live="polite">{fieldErrors.phone}</span>
                </label>
                <label className="admissions-field" htmlFor="application-city">City *
                  <span className="admissions-input-wrap"><MapPinned size={17} /><input id="application-city" required name="city" list="city-options" autoComplete="address-level2" pattern={cityPattern} title="Search and select a city from the list." placeholder="Start typing your city" value={formData.city} onChange={handleFieldChange} aria-invalid={Boolean(fieldErrors.city)} aria-describedby="application-city-error" /></span>
                  <datalist id="city-options">{CITY_OPTIONS.map((city) => <option key={city} value={city} />)}</datalist>
                  <span id="application-city-error" className="field-error" aria-live="polite">{fieldErrors.city}</span>
                </label>
                <label className="admissions-field admissions-field--wide" htmlFor="application-program">Program of interest *
                  <span className="admissions-input-wrap"><BookOpen size={17} /><select id="application-program" required name="program" value={formData.program} onChange={handleFieldChange} aria-invalid={Boolean(fieldErrors.program)} aria-describedby="application-program-error"><option value="">Choose a program</option>{programOptions.map((program) => <option key={program}>{program}</option>)}</select></span>
                  <span id="application-program-error" className="field-error" aria-live="polite">{fieldErrors.program}</span>
                </label>
              </div>
              <p className="admissions-form__note"><ShieldCheck size={15} />Applications are collected securely for the 2026 admissions cycle.</p>
              <button disabled={status.loading} className="admissions-submit cu-button cu-button--primary" type="submit">
                {status.loading ? <><span className="submit-spinner" />Submitting...</> : <>Submit application <ArrowRight size={17} /></>}
              </button>
              {status.error && <p role="alert" className="form-message form-message--error">{status.error}</p>}
              {status.success && <p role="status" className="form-message form-message--success"><CircleCheck size={18} />{status.success}</p>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}