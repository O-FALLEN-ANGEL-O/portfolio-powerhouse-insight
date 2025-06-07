
import React from 'react';
import MetricCard from './MetricCard';
import PortfolioChart from './PortfolioChart';
import RecentActivity from './RecentActivity';
import AssetAllocation from './AssetAllocation';

const Dashboard = () => {
  const metrics = [
    {
      title: "Total Portfolio Value",
      value: "$1,247,350",
      change: "+12.3%",
      isPositive: true,
      description: "vs last month"
    },
    {
      title: "YTD Return",
      value: "18.7%",
      change: "+2.1%",
      isPositive: true,
      description: "Above S&P 500"
    },
    {
      title: "Monthly Gain/Loss",
      value: "$24,780",
      change: "-0.8%",
      isPositive: false,
      description: "vs previous month"
    },
    {
      title: "Active Projects",
      value: "12",
      change: "+3",
      isPositive: true,
      description: "New this quarter"
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
          <PortfolioChart />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Asset Allocation</h2>
          <AssetAllocation />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
