
import React, { useState } from 'react';
import { Plus, Calendar, Users, CheckCircle } from 'lucide-react';
import './ProjectManagement.css';

const ProjectManagement = () => {
  const [projects] = useState([
    // Empty array - no demo data
  ]);

  const getStatusClassName = (status) => {
    switch (status) {
      case 'In Progress':
        return 'status-badge status-in-progress';
      case 'Planning':
        return 'status-badge status-planning';
      case 'Review':
        return 'status-badge status-review';
      default:
        return 'status-badge';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="project-management">
      <div className="header">
        <h1 className="title">Project Management</h1>
        <button className="new-project-btn">
          <Plus size={16} />
          New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first project.</p>
          <button className="new-project-btn">
            <Plus size={16} />
            Create Project
          </button>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3 className="project-name">{project.name}</h3>
                <span className={getStatusClassName(project.status)}>
                  {project.status}
                </span>
              </div>

              <p className="client-name">{project.client}</p>

              <div className="project-details">
                <div className="detail-item">
                  <Calendar size={16} />
                  Due: {formatDate(project.dueDate)}
                </div>

                <div className="detail-item">
                  <Users size={16} />
                  Team: {project.team.join(', ')}
                </div>

                <div className="detail-item">
                  <CheckCircle size={16} />
                  Tasks: {project.completedTasks}/{project.tasks} completed
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-header">
                  <span className="progress-label">Progress</span>
                  <span className="progress-percentage">{project.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
