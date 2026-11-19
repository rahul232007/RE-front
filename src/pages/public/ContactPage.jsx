import { useState } from 'react';
import ContactForm from '../../components/ContactForm';
import { CONTACT_INFO } from '../../config/contactConfig';
import toast from 'react-hot-toast';
import {
  MapPin,
  Phone,
  Mail,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  PhoneCall,
  Clock,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

/**
 * Premium Contact Page for Rahul Enterprises
 * Connected to centralized CONTACT_INFO & backend API
 */
const ContactPage = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.phone.raw);
      setCopiedPhone(true);
      toast.success('Phone number copied to clipboard!');
      setTimeout(() => setCopiedPhone(false), 2500);
    } catch {
      toast.error('Could not copy phone number');
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email.address);
      setCopiedEmail(true);
      toast.success('Email address copied to clipboard!');
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      toast.error('Could not copy email');
    }
  };

  return (
    <section className="contact-page-wrapper">
      {/* Background Glows for Purple & Blue Gradient ambiance */}
      <div className="contact-ambient-glow glow-blue" aria-hidden="true" />
      <div className="contact-ambient-glow glow-purple" aria-hidden="true" />

      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <span className="contact-badge">
            <Sparkles size={14} />
            Let's Collaborate
          </span>
          <h1>Get In Touch With Rahul Enterprises</h1>
          <p>
            Have a project in mind, need a custom web solution, or want to explore how the MERN stack can accelerate your business? Reach out through any channel below or submit your inquiry.
          </p>
        </div>

        {/* Top 3 Verified Contact Cards */}
        <div className="contact-cards-grid">
          {/* 1. Address Card */}
          <div className="contact-card glass-card">
            <div className="contact-card__icon-wrap icon-purple">
              <MapPin size={24} />
            </div>
            <div className="contact-card__content">
              <span className="contact-card__label">Business Location</span>
              <h3>{CONTACT_INFO.address.line1}</h3>
              <p className="contact-card__detail">
                {CONTACT_INFO.address.line2}, {CONTACT_INFO.address.state}, {CONTACT_INFO.address.country}
              </p>
            </div>
            <div className="contact-card__actions">
              <a
                href={CONTACT_INFO.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-card-action btn-maps"
              >
                <span>View on Google Maps</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* 2. Phone Card */}
          <div className="contact-card glass-card">
            <div className="contact-card__icon-wrap icon-blue">
              <Phone size={24} />
            </div>
            <div className="contact-card__content">
              <span className="contact-card__label">Direct Phone & WhatsApp</span>
              <h3>
                <a href={CONTACT_INFO.phone.telUrl} className="contact-link">
                  {CONTACT_INFO.phone.display}
                </a>
              </h3>
              <p className="contact-card__detail">
                Mon – Sat: 9:00 AM – 7:00 PM IST
              </p>
            </div>
            <div className="contact-card__actions action-group">
              <a
                href={CONTACT_INFO.phone.telUrl}
                className="btn-card-action btn-call"
                title="Call now"
              >
                <PhoneCall size={14} />
                <span>Call</span>
              </a>
              <a
                href={CONTACT_INFO.phone.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-card-action btn-whatsapp"
                title="Chat on WhatsApp"
              >
                <MessageCircle size={15} />
                <span>WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="btn-card-action btn-copy"
                title="Copy phone number"
                aria-label="Copy phone number"
              >
                {copiedPhone ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* 3. Email Card */}
          <div className="contact-card glass-card">
            <div className="contact-card__icon-wrap icon-gold">
              <Mail size={24} />
            </div>
            <div className="contact-card__content">
              <span className="contact-card__label">Email Support & Queries</span>
              <h3>
                <a href={CONTACT_INFO.email.mailtoUrl} className="contact-link">
                  {CONTACT_INFO.email.address}
                </a>
              </h3>
              <p className="contact-card__detail">
                Guaranteed response within 24 business hours
              </p>
            </div>
            <div className="contact-card__actions action-group">
              <a
                href={CONTACT_INFO.email.mailtoUrl}
                className="btn-card-action btn-email"
              >
                <Mail size={14} />
                <span>Send Email</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="btn-card-action btn-copy"
                title="Copy email address"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Section: Inquiry Form & Trust Signals */}
        <div className="contact-main-grid">
          {/* Left Column: Form Info & Value Props */}
          <div className="contact-sidebar glass-card">
            <div className="sidebar-header">
              <h2>Let's Build Something Exceptional</h2>
              <p>
                Whether launching a new enterprise platform or upgrading your existing web infrastructure, we provide end-to-end full stack architecture.
              </p>
            </div>

            <div className="sidebar-benefits">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <strong>NDA & Code Security</strong>
                  <p>Your business concepts and intellectual property remain 100% confidential and secure.</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <Clock size={20} />
                </div>
                <div>
                  <strong>Rapid Turnaround</strong>
                  <p>Detailed architecture proposal and cost estimation delivered within 24 to 48 hours.</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <Sparkles size={20} />
                </div>
                <div>
                  <strong>Direct Founder Communication</strong>
                  <p>Collaborate directly with Rahul — no middle layers, ensuring crystal-clear execution.</p>
                </div>
              </div>
            </div>

            <div className="sidebar-quick-connect">
              <span>Need an immediate consultation?</span>
              <a
                href={CONTACT_INFO.phone.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-full btn-whatsapp-large"
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="contact-form-panel glass-card">
            <div className="form-panel-header">
              <h2>Send a Project Inquiry</h2>
              <p>Fill out the form below and we'll prepare a custom roadmap for your project.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
