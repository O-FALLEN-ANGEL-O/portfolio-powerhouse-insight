import React, { useState } from 'react';
import { Plus, Calendar, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'Review':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Project Management</h1>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-slate-900 text-lg">{project.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            <p className="text-slate-600 mb-4">{project.client}</p>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar size={16} />
                Due: {new Date(project.dueDate).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Users size={16} />
                Team: {project.team.join(', ')}
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle size={16} />
                Tasks: {project.completedTasks}/{project.tasks} completed
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-600">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
