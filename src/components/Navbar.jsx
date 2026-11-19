import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

/**
 * Site-wide navigation header for all public pages.
 */
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out');
      navigate('/admin/login');
    } catch {
      toast.error('Logout failed');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/about#services', label: 'Services' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Brand */}
        <Link to="/" className="navbar__brand">
          <img
            src="/rahul-enterprises-logo.png"
            alt="Rahul Enterprises"
            className="navbar__brand-logo"
          />
          <span>
            <span className="navbar__brand-name">Rahul</span>
            <span className="navbar__brand-suffix"> Enterprises</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <>
              <NavLink to="/admin/dashboard" className="navbar__link">
                Admin
              </NavLink>
              <button onClick={handleLogout} className="btn btn-outline btn-sm">
                Logout
              </button>
            </>
          ) : (
            <Link to="/admin/login" className="btn btn-primary btn-sm">
              Admin Login
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="navbar__hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={`hamburger-icon ${menuOpen ? 'open' : ''}`} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <nav className="navbar__mobile" onClick={() => setMenuOpen(false)}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__mobile-link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <button onClick={handleLogout} className="btn btn-outline btn-sm">
              Logout
            </button>
          ) : (
            <Link to="/admin/login" className="btn btn-primary btn-sm">
              Admin Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
