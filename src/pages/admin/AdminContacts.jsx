import { useState } from 'react';
import { useContacts } from '../../hooks/useContacts';
import AdminLayout from '../../components/AdminLayout';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['new', 'read', 'replied', 'closed'];

const statusBadge = (s) =>
  ({ new: 'badge-red', read: 'badge-blue', replied: 'badge-green', closed: 'badge-grey' }[s] || '');

/**
 * Admin Contacts Management Page
 * GET /api/contact, PATCH /api/contact/:id/status, DELETE /api/contact/:id
 */
const AdminContacts = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const { contacts, pagination, loading, error, setParams, refetch, changeStatus, remove } =
    useContacts({ sort: '-createdAt' });

  const handleFilter = (status) => {
    setFilterStatus(status);
    setParams((prev) => ({ ...prev, status: status || undefined, page: 1 }));
  };

  const handleStatusChange = async (id, status) => {
    try {
      await changeStatus(id, status);
      toast.success('Status updated');
    } catch (err) {
      toast.error(err.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete inquiry from "${name}"?`)) return;
    try {
      await remove(id);
      toast.success('Inquiry deleted');
    } catch (err) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="page-loading">
          <div className="loading-spinner" />
          <p>Loading inquiries…</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="page-error">
          <p>⚠️ {error}</p>
          <button onClick={refetch} className="btn btn-primary">Retry</button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="page-header">
        <h2>Inquiries Management</h2>
        {pagination && (
          <span className="badge badge-grey">{pagination.total} total</span>
        )}
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <button
          className={`btn btn-sm ${!filterStatus ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => handleFilter('')}
        >
          All
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            className={`btn btn-sm ${filterStatus === s ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleFilter(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {contacts.length === 0 ? (
        <div className="empty-state">
          <p>No inquiries found{filterStatus ? ` with status "${filterStatus}"` : ''}.</p>
        </div>
      ) : (
        <div className="contacts-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Client / Company</th>
                <th>Contact Details</th>
                <th>Service & Budget</th>
                <th>Message</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id}>
                  <td>
                    <strong>{c.name}</strong>
                    {c.company && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--gold-light)' }}>
                        🏢 {c.company}
                      </div>
                    )}
                  </td>
                  <td>
                    <div>
                      <a href={`mailto:${c.email}`}>{c.email}</a>
                    </div>
                    {c.phone && (
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                        📞 <a href={`tel:${c.phone}`} style={{ color: '#94a3b8' }}>{c.phone}</a>
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="badge badge-category" style={{ fontSize: '0.8rem' }}>
                      {c.service || c.subject || 'General'}
                    </span>
                    {c.budget && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--gold-light)', marginTop: '0.3rem' }}>
                        💰 {c.budget}
                      </div>
                    )}
                  </td>
                  <td style={{ maxWidth: '240px', fontSize: '0.88rem', color: '#cbd5e1' }}>
                    {c.message ? (c.message.length > 80 ? `${c.message.substring(0, 80)}...` : c.message) : '—'}
                  </td>
                  <td>
                    <select
                      value={c.status}
                      onChange={(e) => handleStatusChange(c._id, e.target.value)}
                      className={`badge ${statusBadge(c.status)}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(c._id, c.name)}
                      className="btn btn-danger btn-sm"
                      title="Delete inquiry"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminContacts;
