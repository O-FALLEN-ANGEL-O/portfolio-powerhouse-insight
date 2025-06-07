
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  description?: string;
}

const MetricCard = ({ title, value, change, isPositive, description }: MetricCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
        <div className={cn(
          "flex items-center gap-1 text-sm",
          isPositive ? "text-green-600" : "text-red-600"
        )}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {change}
        </div>
      </div>
      
      <div className="mb-2">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
      </div>
      
      {description && (
        <p className="text-xs text-slate-500">{description}</p>
      )}
    </div>
  );
};

export default MetricCard;
