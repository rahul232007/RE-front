import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../config/contactConfig';
import { MapPin, Phone, Mail } from 'lucide-react';

const LinkedInIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.95 0-1.72.78-1.72 1.73a1.73 1.73 0 0 0 1.72 1.73 1.73 1.73 0 0 0 1.73-1.73c0-.95-.78-1.73-1.73-1.73Z" />
  </svg>
);

const GitHubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
  </svg>
);

/**
 * Site-wide verified footer for Rahul Enterprises
 */
const Footer = () => (
  <footer className="footer-premium">
    <div className="footer-ambient-glow" aria-hidden="true" />
    <div className="footer-inner">
      <div className="footer-grid">
        {/* Col 1: Brand & Vision */}
        <div className="footer-col footer-col--brand">
          <Link to="/" className="footer-brand-title">
            <img
              src="/rahul-enterprises-logo.png"
              alt="Rahul Enterprises"
              className="footer-brand-logo"
            />
            <div>
              <span className="brand-name-cobalt">RAHUL</span>{' '}
              <span className="brand-name-gold">ENTERPRISES</span>
            </div>
          </Link>
          <p className="footer-tagline">
            {CONTACT_INFO.tagline}
          </p>
          <div className="footer-social-links">
            <a
              href={CONTACT_INFO.social.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={18} />
            </a>
            <a
              href={CONTACT_INFO.social.gitHub}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="GitHub"
              aria-label="GitHub"
            >
              <GitHubIcon size={18} />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/about#services">Services</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Direct Contact Details */}
        <div className="footer-col footer-col--contact">
          <h4 className="footer-heading">Verified Business Contact</h4>
          <ul className="footer-contact-list">
            <li>
              <MapPin size={17} className="footer-contact-icon text-gold" />
              <span>
                <strong>Address:</strong> {CONTACT_INFO.address.full}
              </span>
            </li>
            <li>
              <Phone size={17} className="footer-contact-icon text-blue" />
              <span>
                <strong>Phone:</strong>{' '}
                <a href={CONTACT_INFO.phone.telUrl} className="footer-link">
                  {CONTACT_INFO.phone.display}
                </a>
              </span>
            </li>
            <li>
              <Mail size={17} className="footer-contact-icon text-purple" />
              <span>
                <strong>Email:</strong>{' '}
                <a href={CONTACT_INFO.email.mailtoUrl} className="footer-link">
                  {CONTACT_INFO.email.address}
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Attribution */}
      <div className="footer-bottom-bar">
        <p className="footer-copyright">
          © 2026 Rahul Enterprises. All Rights Reserved.
        </p>
        <div className="footer-bottom-links">
          <Link to="/contact">Privacy Policy</Link>
          <span>•</span>
          <Link to="/contact">Terms of Service</Link>
          <span>•</span>
          <Link to="/admin/login" className="admin-link-discrete">
            Admin Access
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
