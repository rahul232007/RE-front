import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import RELogo from '../../components/RELogo';

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const services = [
  { icon: '🌐', label: 'Custom Business Website Development' },
  { icon: '⚡', label: 'Full-Stack MERN Development' },
  { icon: '🛒', label: 'E-commerce Website Development' },
  { icon: '📱', label: 'Responsive Website Design' },
  { icon: '🛠️', label: 'Admin Dashboard Development' },
  { icon: '🔗', label: 'REST API Development' },
  { icon: '🗄️', label: 'Database Design and Integration' },
  { icon: '🔄', label: 'Website Redesign and Optimization' },
];

const techStack = [
  {
    category: 'Frontend',
    color: '#3b82f6',
    icon: '🎨',
    skills: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'JavaScript', level: 90 },
      { name: 'React.js', level: 88 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Responsive UI', level: 92 },
    ],
  },
  {
    category: 'Backend',
    color: '#60a5fa',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 87 },
      { name: 'Express.js', level: 88 },
      { name: 'REST APIs', level: 90 },
      { name: 'Auth & Security', level: 82 },
    ],
  },
  {
    category: 'Database',
    color: '#d4af37',
    icon: '🗄️',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'Mongoose', level: 85 },
    ],
  },
  {
    category: 'Tools',
    color: '#f5d061',
    icon: '🛠️',
    skills: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'Postman', level: 85 },
      { name: 'VS Code', level: 95 },
    ],
  },
];

const approach = [
  {
    step: '01',
    title: 'Understand',
    desc: 'Begin by understanding your business, requirements, target audience, and objectives.',
    icon: '🔍',
  },
  {
    step: '02',
    title: 'Plan',
    desc: 'Identify the right technologies, features, architecture, and development approach.',
    icon: '📋',
  },
  {
    step: '03',
    title: 'Design',
    desc: 'Create clean, modern, responsive interfaces focused on usability and user experience.',
    icon: '🎨',
  },
  {
    step: '04',
    title: 'Develop',
    desc: 'Build functional frontend and backend systems with proper database integration.',
    icon: '💻',
  },
  {
    step: '05',
    title: 'Test & Deliver',
    desc: 'Test functionality, fix issues, optimise performance, and prepare for deployment.',
    icon: '🚀',
  },
];

const whyMe = [
  { icon: '🎯', text: 'Business-focused development' },
  { icon: '⚡', text: 'Modern technology stack' },
  { icon: '📱', text: 'Responsive and user-friendly interfaces' },
  { icon: '🧹', text: 'Clean and maintainable code' },
  { icon: '💬', text: 'Direct communication' },
  { icon: '🔧', text: 'Solutions tailored to your requirements' },
  { icon: '✅', text: 'Commitment to quality and timely delivery' },
];

/* ─── SKILL BAR ────────────────────────────────────────────────────────────── */
const SkillBar = ({ name, level, color, animate }) => (
  <div className="skill-bar">
    <div className="skill-bar__header">
      <span className="skill-bar__name">{name}</span>
      <span className="skill-bar__pct">{level}%</span>
    </div>
    <div className="skill-bar__track">
      <div
        className="skill-bar__fill"
        style={{
          width: animate ? `${level}%` : '0%',
          backgroundColor: color,
          transition: 'width 1.1s cubic-bezier(0.4,0,0.2,1)',
        }}
      />
    </div>
  </div>
);

/* ─── ABOUT PAGE ───────────────────────────────────────────────────────────── */
const AboutPage = () => {
  const skillsRef = useRef(null);
  const animatedRef = useRef(false);
  const [barsVisible, setBarsVisible] = useState(false);

  /* Trigger skill-bar animation when the section enters the viewport */
  useEffect(() => {
    const el = skillsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          setBarsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="about-page">

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="about-hero">
        <div className="about-hero__bg-grid" aria-hidden="true" />
        <div className="about-hero__content">
          <div className="about-hero__avatar" aria-label="Rahul Enterprises Royal Enfield-style RE Logo">
            <RELogo size={310} withWings={true} />
          </div>
          <div className="about-hero__text">
            <h1 className="about-hero__headline">
              Building Ideas Into<br />
              <span className="text-primary">Digital Experiences.</span>
            </h1>
            <p className="about-hero__sub">
              Full-Stack Web Developer &amp; Founder of Rahul Enterprises —
              specialising in modern, responsive MERN stack web applications.
            </p>
            <div className="about-hero__cta">
              <Link to="/contact" className="btn btn-primary">Let's Talk</Link>
              <Link to="/projects" className="btn btn-outline">View Projects</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO / PHILOSOPHY ─────────────────────────────────────────────── */}
      <section className="about-section about-intro">
        <div className="about-container">
          <div className="about-intro__grid">

            <div className="about-intro__copy">
              <span className="section-eyebrow">About Me</span>
              <h2>A Developer Who Thinks Like a Business Owner</h2>
              <p>
                I'm a passionate Full-Stack Web Developer and the founder of Rahul Enterprises.
                I specialise in building modern, responsive, and user-friendly websites and web
                applications using the <strong>MERN Stack</strong>.
              </p>
              <p>
                My goal is to help businesses, startups, entrepreneurs, and individuals establish
                a strong digital presence through thoughtfully designed and technically reliable
                web solutions.
              </p>
              <blockquote className="about-quote">
                "A website should be more than just an online presence — it should represent
                a brand, communicate value, create trust, and help businesses achieve their goals."
              </blockquote>
            </div>

            <div className="about-intro__journey">
              <span className="section-eyebrow">My Journey</span>
              <h2>From Curiosity to Craft</h2>
              <p>
                My interest in technology and software development drives me to continuously
                explore new tools, technologies, and development practices.
              </p>
              <p>
                I focus on combining frontend creativity with backend engineering to create
                complete web applications — from designing intuitive user interfaces to
                developing secure backend systems and connecting databases.
              </p>
              <p>
                Through Rahul Enterprises, I aim to transform business ideas into functional
                digital products.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────────── */}
      <section id="services" className="about-section about-services">
        <div className="about-container">
          <span className="section-eyebrow">What I Do</span>
          <h2 className="section-title">Services I Provide</h2>
          <p className="section-subtitle">
            Web development solutions tailored to different business requirements.
          </p>
          <div className="services-grid">
            {services.map(({ icon, label }) => (
              <div key={label} className="service-card">
                <span className="service-card__icon">{icon}</span>
                <p className="service-card__label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ─────────────────────────────────────────────────────── */}
      <section className="about-section about-tech" ref={skillsRef}>
        <div className="about-container">
          <span className="section-eyebrow">Technical Expertise</span>
          <h2 className="section-title">My Tech Stack</h2>
          <div className="tech-grid">
            {techStack.map(({ category, color, icon, skills }) => (
              <div key={category} className="tech-card">
                <div className="tech-card__header">
                  <span className="tech-card__icon">{icon}</span>
                  <h3 style={{ color }}>{category}</h3>
                </div>
                <div className="tech-card__skills">
                  {skills.map(({ name, level }) => (
                    <SkillBar
                      key={name}
                      name={name}
                      level={level}
                      color={color}
                      animate={barsVisible}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVELOPMENT APPROACH ───────────────────────────────────────────── */}
      <section className="about-section about-approach">
        <div className="about-container">
          <span className="section-eyebrow">My Process</span>
          <h2 className="section-title">Development Approach</h2>
          <div className="approach-timeline">
            {approach.map(({ step, title, desc, icon }, i) => (
              <div key={step} className="approach-step">
                <div className="approach-step__connector" aria-hidden="true">
                  <div className="approach-step__dot">
                    <span>{icon}</span>
                  </div>
                  {i < approach.length - 1 && <div className="approach-step__line" />}
                </div>
                <div className="approach-step__content">
                  <span className="approach-step__number">{step}</span>
                  <h3 className="approach-step__title">{title}</h3>
                  <p className="approach-step__desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY WORK WITH ME ───────────────────────────────────────────────── */}
      <section className="about-section about-why">
        <div className="about-container">
          <span className="section-eyebrow">Why Choose Me</span>
          <h2 className="section-title">Why Work With Me?</h2>
          <div className="why-grid">
            {whyMe.map(({ icon, text }) => (
              <div key={text} className="why-card">
                <span className="why-card__icon">{icon}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION ─────────────────────────────────────────────────────────── */}
      <section className="about-section about-vision">
        <div className="about-container">
          <div className="vision-box">
            <span className="section-eyebrow">My Vision</span>
            <h2>Moving Businesses Forward — Digitally.</h2>
            <p>
              My vision is to help businesses move forward digitally by creating meaningful,
              reliable, and scalable web solutions. I am continuously learning, improving my
              technical skills, and exploring better ways to solve real-world problems through
              technology.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="about-cta">
        <div className="about-container about-cta__inner">
          <div className="about-cta__text">
            <h2>Let's Build Something Great.</h2>
            <p>
              Have a business idea, a website requirement, or a project in mind?
              I'd love to hear about it. Let's turn your ideas into reality.
            </p>
          </div>
          <div className="about-cta__actions">
            <Link to="/contact" className="btn btn-primary">Start a Conversation</Link>
            <Link to="/projects" className="btn btn-outline">See My Work</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
