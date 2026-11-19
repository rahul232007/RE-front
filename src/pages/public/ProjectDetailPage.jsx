import { useParams, Link } from 'react-router-dom';
import { useProject } from '../../hooks/useProjects';

/**
 * Public Project Detail Page — connected to GET /api/projects/:slug
 */
const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { project, loading, error } = useProject(slug);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner" />
        <p>Loading project…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-error">
        <p>⚠️ {error}</p>
        <Link to="/projects" className="btn btn-outline">← Back to Projects</Link>
      </div>
    );
  }

  if (!project) return null;

  const {
    title, description, category, status, location, client,
    startDate, endDate, area, value, coverImage, images,
    tags, featured,
  } = project;

  return (
    <article className="project-detail">
      {/* Cover Image */}
      {coverImage && (
        <div className="project-detail__hero">
          <img src={coverImage} alt={title} />
        </div>
      )}

      <div className="project-detail__content">
        <div className="project-detail__breadcrumb">
          <Link to="/projects">← All Projects</Link>
        </div>

        <div className="project-detail__header">
          <div className="project-detail__badges">
            <span className="badge badge-category">{category}</span>
            <span className={`badge ${status === 'completed' ? 'badge-green' : status === 'ongoing' ? 'badge-blue' : 'badge-orange'}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            {featured && <span className="badge badge-gold">⭐ Featured</span>}
          </div>
          <h1>{title}</h1>
        </div>

        {/* Meta Grid */}
        <div className="project-detail__meta-grid">
          {location && (
            <div className="meta-item">
              <span className="meta-label">📍 Location</span>
              <span className="meta-value">{location}</span>
            </div>
          )}
          {client && (
            <div className="meta-item">
              <span className="meta-label">🏢 Client</span>
              <span className="meta-value">{client}</span>
            </div>
          )}
          {area && (
            <div className="meta-item">
              <span className="meta-label">📐 Area</span>
              <span className="meta-value">{area}</span>
            </div>
          )}
          {value && (
            <div className="meta-item">
              <span className="meta-label">💰 Project Value</span>
              <span className="meta-value">{value}</span>
            </div>
          )}
          {startDate && (
            <div className="meta-item">
              <span className="meta-label">📅 Start Date</span>
              <span className="meta-value">{new Date(startDate).toLocaleDateString()}</span>
            </div>
          )}
          {endDate && (
            <div className="meta-item">
              <span className="meta-label">🏁 End Date</span>
              <span className="meta-value">{new Date(endDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <div className="project-detail__description">
          <h2>About This Project</h2>
          <p>{description}</p>
        </div>

        {/* Image Gallery */}
        {images?.length > 0 && (
          <div className="project-detail__gallery">
            <h2>Gallery</h2>
            <div className="gallery-grid">
              {images.map((img, i) => (
                <img key={i} src={img.url} alt={img.alt || title} loading="lazy" />
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="project-detail__tags">
            {tags.map((tag) => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}

        <div className="project-detail__cta">
          <Link to="/contact" className="btn btn-primary">
            Enquire About This Project
          </Link>
          <Link to="/projects" className="btn btn-outline">
            ← View All Projects
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectDetailPage;
