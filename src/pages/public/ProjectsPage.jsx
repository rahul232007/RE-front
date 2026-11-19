import { useState } from 'react';
import ProjectCard from '../../components/ProjectCard';
import { useProjects } from '../../hooks/useProjects';

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Interior', 'Renovation', 'Other'];

/**
 * Public Projects Listing Page — connected to GET /api/projects
 */
const ProjectsPage = () => {
  const [category, setCategory] = useState('');
  const { projects, pagination, loading, error, setParams, refetch } = useProjects({});

  const handleCategoryFilter = (cat) => {
    const val = cat === 'All' ? '' : cat;
    setCategory(val);
    setParams((prev) => ({ ...prev, category: val || undefined, page: 1 }));
  };

  if (loading) {
    return (
      <section className="projects-page">
        <div className="page-loading">
          <div className="loading-spinner" />
          <p>Loading projects…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects-page">
        <div className="page-error">
          <p>⚠️ {error}</p>
          <button onClick={refetch} className="btn btn-primary">Try Again</button>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-page">
      <div className="section-header">
        <h1>Our Projects</h1>
        <p>Explore our portfolio of construction and infrastructure projects.</p>
      </div>

      {/* Category Filters */}
      <div className="filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm ${(cat === 'All' ? !category : category === cat) ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      {pagination && (
        <p className="results-count">
          Showing {projects.length} of {pagination.total} projects
        </p>
      )}

      {/* Grid */}
      {projects.length === 0 ? (
        <div className="empty-state">
          <p>No projects found{category ? ` in category "${category}"` : ''}.</p>
          {category && (
            <button onClick={() => handleCategoryFilter('All')} className="btn btn-outline">
              Show All Projects
            </button>
          )}
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsPage;
