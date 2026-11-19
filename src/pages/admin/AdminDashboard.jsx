import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../../components/AdminLayout';

/**
 * Admin Dashboard — overview of admin features.
 */
const AdminDashboard = () => {
  const { admin } = useAuth();

  return (
    <AdminLayout title="Dashboard">
      <p className="admin-welcome">
        Welcome back, {admin?.name || 'Admin'}! Manage your site content below.
      </p>

      <div className="admin-cards">
        <Link to="/admin/projects" className="admin-card">
          <span className="admin-card__icon">🏗️</span>
          <h3>Projects</h3>
          <p>Manage your construction & web projects</p>
        </Link>

        <Link to="/admin/contacts" className="admin-card">
          <span className="admin-card__icon">📧</span>
          <h3>Inquiries</h3>
          <p>View and manage client inquiries</p>
        </Link>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
