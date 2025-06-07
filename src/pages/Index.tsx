
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ProjectManagement from '@/components/ProjectManagement';
import ClientManagement from '@/components/ClientManagement';
import GoalsTracking from '@/components/GoalsTracking';
import Reports from '@/components/Reports';
import Settings from '@/components/Settings';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectManagement />;
      case 'clients':
        return <ClientManagement />;
      case 'portfolio':
        return <Dashboard />; // For now, using same component
      case 'goals':
        return <GoalsTracking />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
