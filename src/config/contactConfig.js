/**
 * Centralized Contact Configuration for Rahul Enterprises
 * All business details, direct links, and actions are configured here.
 */
export const CONTACT_INFO = {
  companyName: 'Rahul Enterprises',
  tagline: 'Building Digital Experiences That Drive Business Growth.',

  // 1. Business Address
  address: {
    line1: 'Rahul Enterprises',
    line2: 'Velliyankadu, Tiruppur',
    state: 'Tamil Nadu',
    country: 'India',
    full: 'Rahul Enterprises, Velliyankadu, Tiruppur, Tamil Nadu, India.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Rahul Enterprises, Velliyankadu, Tiruppur, Tamil Nadu, India'),
  },

  // 2. Phone Number
  phone: {
    display: '+91 9047627422',
    raw: '+919047627422',
    telUrl: 'tel:+919047627422',
    whatsAppUrl: 'https://wa.me/919047627422',
  },

  // 3. Email Address
  email: {
    address: 'rahulpugal07@gmail.com',
    mailtoUrl: 'mailto:rahulpugal07@gmail.com',
  },

  // Social Links
  social: {
    linkedIn: 'https://www.linkedin.com/in/rahulpugal',
    gitHub: 'https://github.com/rahulpugal',
  },

  // Services offered for Project Inquiry Form
  services: [
    'Full-Stack MERN Development',
    'Custom Business Website Development',
    'E-commerce Website Development',
    'Responsive Website Design',
    'Admin Dashboard Development',
    'REST API Development',
    'Database Design and Integration',
    'Website Redesign and Optimization',
  ],

  // Budget Options for Project Inquiry Form
  budgets: [
    '< ₹25,000 (Starter)',
    '₹25,000 - ₹50,000 (Growth)',
    '₹50,000 - ₹1,00,000 (Professional)',
    '₹1,00,000 - ₹2,50,000 (Enterprise)',
    '₹2,50,000+ (Custom / Long-Term)',
  ],
};

export default CONTACT_INFO;
