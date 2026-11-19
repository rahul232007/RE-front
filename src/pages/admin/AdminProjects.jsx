import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects, useProjectAdmin } from '../../hooks/useProjects';
import AdminLayout from '../../components/AdminLayout';
import toast from 'react-hot-toast';

const CATEGORIES = ['Residential','Commercial','Industrial','Infrastructure','Interior','Renovation','Other'];

const BLANK_FORM = {
  title: '', category: 'Commercial', status: 'ongoing',
  description: '', shortDescription: '', location: '',
  client: '', area: '', value: '', coverImage: '',
  featured: false, isPublished: true,
};

/**
 * Admin Projects Management Page
 * GET / POST / PUT / DELETE /api/projects
 */
const AdminProjects = () => {
  const { projects, loading, error, refetch } = useProjects({});
  const { create, update, remove, loading: saving } = useProjectAdmin();

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState(BLANK_FORM);

  const openCreate = () => {
    setEditingProject(null);
    setForm(BLANK_FORM);
    setShowForm(true);
  };

  const openEdit = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      category: project.category,
      status: project.status,
      description: project.description,
      shortDescription: project.shortDescription || '',
      location: project.location || '',
      client: project.client || '',
      area: project.area || '',
      value: project.value || '',
      coverImage: project.coverImage || '',
      featured: project.featured,
      isPublished: project.isPublished,
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await update(editingProject._id, form);
        toast.success('Project updated successfully');
      } else {
        await create(form);
        toast.success('Project created successfully');
      }
      setShowForm(false);
      refetch();
    } catch (err) {
      if (err.errors?.length) {
        err.errors.forEach((msg) => toast.error(msg));
      } else {
        toast.error(err.message || 'Failed to save project');
      }
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete project "${title}"? This cannot be undone.`)) return;
    try {
      await remove(id);
      toast.success('Project deleted');
      refetch();
    } catch (err) {
      toast.error(err.message || 'Failed to delete project');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="page-loading">
          <div className="loading-spinner" />
          <p>Loading projects…</p>
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
        <h2>Project Management</h2>
        <button onClick={openCreate} className="btn btn-primary">
          + Add Project
        </button>
      </div>

      {/* Project Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>{editingProject ? 'Edit Project' : 'New Project'}</h3>
              <button onClick={() => setShowForm(false)} className="btn-close">×</button>
            </div>

            <form onSubmit={handleSubmit} className="admin-project-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <input name="title" value={form.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={form.status} onChange={handleChange}>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input name="location" value={form.location} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Short Description</label>
                <input name="shortDescription" value={form.shortDescription} onChange={handleChange} maxLength={300} />
              </div>

              <div className="form-group">
                <label>Full Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={5} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Client</label>
                  <input name="client" value={form.client} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Area</label>
                  <input name="area" value={form.area} onChange={handleChange} placeholder="e.g. 5000 sq ft" />
                </div>
                <div className="form-group">
                  <label>Project Value</label>
                  <input name="value" value={form.value} onChange={handleChange} placeholder="e.g. ₹2.5 Cr" />
                </div>
              </div>

              <div className="form-group">
                <label>Cover Image URL</label>
                <input name="coverImage" value={form.coverImage} onChange={handleChange} type="url" />
              </div>

              <div className="form-row form-row--checkboxes">
                <label className="checkbox-label">
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                  Featured Project
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} />
                  Published
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn btn-primary">
                  {saving ? 'Saving…' : editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Table */}
      {projects.length === 0 ? (
        <div className="empty-state">
          <p>No projects yet. Add your first project!</p>
          <button onClick={openCreate} className="btn btn-primary">+ Add Project</button>
        </div>
      ) : (
        <div className="contacts-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id}>
                  <td>
                    <Link to={`/projects/${p.slug}`} target="_blank" rel="noopener noreferrer">
                      {p.title}
                    </Link>
                  </td>
                  <td>{p.category}</td>
                  <td>{p.status}</td>
                  <td>{p.featured ? '⭐' : '—'}</td>
                  <td>{p.isPublished ? '✅' : '❌'}</td>
                  <td className="actions-cell">
                    <button onClick={() => openEdit(p)} className="btn btn-outline btn-sm">
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDelete(p._id, p.title)} className="btn btn-danger btn-sm">
                      🗑️ Delete
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

export default AdminProjects;
