
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ProjectManagement from '@/components/ProjectManagement';
import ClientManagement from '@/components/ClientManagement';

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
        return <div className="p-8 text-center text-slate-500">Goals & Tracking - Coming Soon</div>;
      case 'reports':
        return <div className="p-8 text-center text-slate-500">Reports - Coming Soon</div>;
      case 'settings':
        return <div className="p-8 text-center text-slate-500">Settings - Coming Soon</div>;
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
