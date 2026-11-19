import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RELogo from './RELogo';
import toast from 'react-hot-toast';

/**
 * Standard admin layout with header, navigation, and logout.
 */
const AdminLayout = ({ children, title }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header__brand">
          <Link to="/admin/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <RELogo size={34} withWings={false} />
            <h1 style={{ margin: 0 }}>
              <span style={{ color: 'var(--cobalt-sky)' }}>Rahul</span>{' '}
              <span style={{ color: 'var(--gold-light)' }}>Enterprises</span>{' '}
              <span style={{ fontSize: '0.82em', color: '#94a3b8', fontWeight: 500 }}>— Admin</span>
            </h1>
          </Link>
        </div>

        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `navbar__link ${isActive ? 'navbar__link--active' : ''}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/projects"
            className={({ isActive }) =>
              `navbar__link ${isActive ? 'navbar__link--active' : ''}`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/admin/contacts"
            className={({ isActive }) =>
              `navbar__link ${isActive ? 'navbar__link--active' : ''}`
            }
          >
            Inquiries
          </NavLink>
          <Link to="/" target="_blank" rel="noopener noreferrer" className="navbar__link">
            🌐 View Site
          </Link>
        </nav>

        <div className="admin-header__user">
          <span>👤 {admin?.name || admin?.email}</span>
          <button onClick={handleLogout} className="btn btn-outline btn-sm">
            Logout
          </button>
        </div>
      </header>

      <main className="admin-main">
        {title && <h2 style={{ marginBottom: '1.5rem' }}>{title}</h2>}
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
