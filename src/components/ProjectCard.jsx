import { Link } from 'react-router-dom';

/**
 * Reusable project card for the public projects listing page.
 */
const ProjectCard = ({ project }) => {
  const {
    slug,
    title,
    shortDescription,
    description,
    category,
    status,
    location,
    coverImage,
    featured,
  } = project;

  const statusColors = {
    completed: 'badge-green',
    ongoing: 'badge-blue',
    upcoming: 'badge-orange',
  };

  return (
    <article className={`project-card ${featured ? 'project-card--featured' : ''}`}>
      {coverImage && (
        <div className="project-card__image">
          <img
            src={coverImage}
            alt={title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="badge badge-category">{category}</span>
          <span className={`badge ${statusColors[status] || 'badge-grey'}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        <h3 className="project-card__title">{title}</h3>

        {location && (
          <p className="project-card__location">📍 {location}</p>
        )}

        <p className="project-card__desc">
          {shortDescription || description?.substring(0, 150) + '…'}
        </p>

        <Link to={`/projects/${slug}`} className="btn btn-outline btn-sm">
          View Details →
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
