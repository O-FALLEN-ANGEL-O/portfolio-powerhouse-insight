
import React from 'react';
import MetricCard from './MetricCard';
import PortfolioChart from './PortfolioChart';
import RecentActivity from './RecentActivity';
import AssetAllocation from './AssetAllocation';

const Dashboard = () => {
  const metrics = [
    {
      title: "Total Portfolio Value",
      value: "$0.00",
      change: "0%",
      isPositive: true,
      description: "No data available"
    },
    {
      title: "YTD Return",
      value: "0%",
      change: "0%",
      isPositive: true,
      description: "No data available"
    },
    {
      title: "Monthly Gain/Loss",
      value: "$0.00",
      change: "0%",
      isPositive: true,
      description: "No data available"
    },
    {
      title: "Active Projects",
      value: "0",
      change: "0",
      isPositive: true,
      description: "No projects created"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Portfolio Dashboard</h1>
        <div className="text-sm text-slate-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Portfolio Performance</h2>
          <div className="flex items-center justify-center h-64 text-slate-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p>No portfolio data available</p>
              <p className="text-sm">Add holdings to see performance charts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Asset Allocation</h2>
          <div className="flex items-center justify-center h-64 text-slate-500">
            <div className="text-center">
              <div className="text-4xl mb-2">🥧</div>
              <p>No allocation data available</p>
              <p className="text-sm">Add assets to see allocation breakdown</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
        <div className="flex items-center justify-center py-8 text-slate-500">
          <div className="text-center">
            <div className="text-4xl mb-2">📋</div>
            <p>No recent activity</p>
            <p className="text-sm">Activity will appear here as you use the platform</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
