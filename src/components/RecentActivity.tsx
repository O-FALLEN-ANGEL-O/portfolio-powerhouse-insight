
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      type: 'transaction',
      icon: TrendingUp,
      title: 'Purchased NVDA',
      description: '50 shares at $895.32',
      time: '2 hours ago',
      amount: '+$44,766',
      color: 'text-green-600'
    },
    {
      type: 'project',
      icon: Users,
      title: 'New Client Onboarded',
      description: 'TechStart Ventures - Series A',
      time: '4 hours ago',
      amount: '$2.5M AUM',
      color: 'text-blue-600'
    },
    {
      type: 'transaction',
      icon: TrendingDown,
      title: 'Sold TSLA Position',
      description: '25 shares at $248.55',
      time: '1 day ago',
      amount: '-$6,214',
      color: 'text-red-600'
    },
    {
      type: 'income',
      icon: DollarSign,
      title: 'Dividend Received',
      description: 'Apple Inc. (AAPL)',
      time: '2 days ago',
      amount: '+$1,250',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const Icon = activity.icon;
        return (
          <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
            <div className={`p-2 rounded-full bg-slate-100 ${activity.color}`}>
              <Icon size={16} />
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-slate-900">{activity.title}</h4>
              <p className="text-sm text-slate-500">{activity.description}</p>
            </div>
            
            <div className="text-right">
              <div className={`font-medium ${activity.color}`}>
                {activity.amount}
              </div>
              <div className="text-xs text-slate-400">
                {activity.time}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentActivity;
