
import React, { useState } from 'react';
import { Plus, Calendar, Users, CheckCircle } from 'lucide-react';
import './ProjectManagement.css';

const ProjectManagement = () => {
  const [projects] = useState([
    {
      id: 1,
      name: 'TechStart Ventures Series A',
      client: 'TechStart Inc.',
      status: 'In Progress',
      progress: 75,
      dueDate: '2024-07-15',
      team: ['Alice', 'Bob', 'Charlie'],
      tasks: 12,
      completedTasks: 9
    },
    {
      id: 2,
      name: 'RetailCorp IPO Preparation',
      client: 'RetailCorp',
      status: 'Planning',
      progress: 25,
      dueDate: '2024-08-30',
      team: ['David', 'Eva'],
      tasks: 8,
      completedTasks: 2
    },
    {
      id: 3,
      name: 'GreenEnergy M&A Advisory',
      client: 'GreenEnergy Solutions',
      status: 'Review',
      progress: 90,
      dueDate: '2024-06-20',
      team: ['Frank', 'Grace', 'Henry'],
      tasks: 15,
      completedTasks: 14
    }
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
    </div>
  );
};

export default ProjectManagement;
