import { useState } from 'react';
import { submitContact } from '../services/contactService';
import { CONTACT_INFO } from '../config/contactConfig';
import toast from 'react-hot-toast';
import { Send, User, Mail, Phone, Building2, Layers, IndianRupee, MessageSquare, CheckCircle } from 'lucide-react';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  projectDescription: '',
};

/**
 * Premium Project Inquiry Form
 * Connects to Express backend: POST /api/contact -> MongoDB
 */
const ContactForm = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = 'Full Name is required';
    } else if (form.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!form.email.trim()) {
      errs.email = 'Email Address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (form.phone.trim() && !/^[+\d\s\-()]{7,20}$/.test(form.phone.trim())) {
      errs.phone = 'Please provide a valid phone number';
    }

    if (!form.service) {
      errs.service = 'Please select a service';
    }

    if (!form.projectDescription.trim()) {
      errs.projectDescription = 'Project description is required';
    } else if (form.projectDescription.trim().length < 10) {
      errs.projectDescription = 'Please describe your project in at least 10 characters';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstError = Object.values(errs)[0];
      toast.error(firstError);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        service: form.service,
        budget: form.budget,
        projectDescription: form.projectDescription.trim(),
      };

      const res = await submitContact(payload);
      toast.success(res?.message || 'Inquiry submitted successfully!');
      setForm(INITIAL_FORM);
      setErrors({});
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      if (err.errors && err.errors.length) {
        err.errors.forEach((msg) => toast.error(msg));
      } else {
        toast.error(err.message || 'Failed to submit inquiry. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="contact-inquiry-form">
      {submitted && (
        <div className="inquiry-success-banner" role="alert">
          <CheckCircle className="banner-icon" size={22} />
          <div>
            <strong>Inquiry Received!</strong>
            <p>Thank you for reaching out. We will review your project details and get back to you shortly.</p>
          </div>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="inquiry-name">
            <User size={15} className="label-icon" />
            Full Name <span className="required">*</span>
          </label>
          <input
            id="inquiry-name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="inquiry-email">
            <Mail size={15} className="label-icon" />
            Email Address <span className="required">*</span>
          </label>
          <input
            id="inquiry-email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
      </div>

      {/* Row 2: Phone & Company */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="inquiry-phone">
            <Phone size={15} className="label-icon" />
            Phone Number
          </label>
          <input
            id="inquiry-phone"
            name="phone"
            type="tel"
            placeholder="+91 90476 27422"
            value={form.phone}
            onChange={handleChange}
            disabled={loading}
            className={errors.phone ? 'input-error' : ''}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="inquiry-company">
            <Building2 size={15} className="label-icon" />
            Company Name <span className="optional-tag">(Optional)</span>
          </label>
          <input
            id="inquiry-company"
            name="company"
            type="text"
            placeholder="Your Business / Startup"
            value={form.company}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
      </div>

      {/* Row 3: Service Required & Estimated Budget */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="inquiry-service">
            <Layers size={15} className="label-icon" />
            Service Required <span className="required">*</span>
          </label>
          <select
            id="inquiry-service"
            name="service"
            value={form.service}
            onChange={handleChange}
            disabled={loading}
            className={errors.service ? 'input-error' : ''}
          >
            <option value="">Select a Service...</option>
            {CONTACT_INFO.services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.service && <span className="error-text">{errors.service}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="inquiry-budget">
            <IndianRupee size={15} className="label-icon" />
            Estimated Budget
          </label>
          <select
            id="inquiry-budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Select Budget Range...</option>
            {CONTACT_INFO.budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 4: Project Description */}
      <div className="form-group">
        <label htmlFor="inquiry-description">
          <MessageSquare size={15} className="label-icon" />
          Project Description <span className="required">*</span>
        </label>
        <textarea
          id="inquiry-description"
          name="projectDescription"
          rows={5}
          placeholder="Tell us about your project objectives, timeline, features needed, or any specific requirements..."
          value={form.projectDescription}
          onChange={handleChange}
          disabled={loading}
          className={errors.projectDescription ? 'input-error' : ''}
        />
        {errors.projectDescription && (
          <span className="error-text">{errors.projectDescription}</span>
        )}
      </div>

      {/* Submit Button */}
      <div className="form-submit-row">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary btn-inquiry"
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Submitting Inquiry...
            </>
          ) : (
            <>
              <Send size={18} />
              Send Project Inquiry
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
