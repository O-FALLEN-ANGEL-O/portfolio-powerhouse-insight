
import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, BarChart3, PieChart, TrendingUp } from 'lucide-react';

const Reports = () => {
  const [selectedReportType, setSelectedReportType] = useState('portfolio');
  const [dateRange, setDateRange] = useState('3m');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { id: 'portfolio', name: 'Portfolio Performance', icon: TrendingUp, description: 'Detailed analysis of portfolio performance and returns' },
    { id: 'allocation', name: 'Asset Allocation', icon: PieChart, description: 'Current and historical asset allocation breakdown' },
    { id: 'projects', name: 'Project Status', icon: BarChart3, description: 'Summary of all active and completed projects' },
    { id: 'clients', name: 'Client Summary', icon: FileText, description: 'Client portfolio overview and performance metrics' }
  ];

  const dateRanges = [
    { value: '1m', label: 'Last Month' },
    { value: '3m', label: 'Last 3 Months' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '1y', label: 'Last Year' },
    { value: 'ytd', label: 'Year to Date' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would trigger a download
      alert(`${reportTypes.find(r => r.id === selectedReportType)?.name} report generated for ${dateRange} period.`);
    }, 2000);
  };

  const recentReports = [
    {
      id: 1,
      name: 'Portfolio Performance Report',
      type: 'Portfolio',
      dateRange: 'Q1 2024',
      generatedAt: '2024-04-01',
      size: '2.3 MB'
    },
    {
      id: 2,
      name: 'Client Summary Report',
      type: 'Clients',
      dateRange: 'March 2024',
      generatedAt: '2024-03-31',
      size: '1.8 MB'
    },
    {
      id: 3,
      name: 'Asset Allocation Analysis',
      type: 'Allocation',
      dateRange: 'YTD 2024',
      generatedAt: '2024-03-15',
      size: '1.2 MB'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Reports</h1>
        <p className="text-slate-600">Generate and download detailed reports for your portfolio and clients.</p>
      </div>

      {/* Report Generator */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Generate New Report</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Type Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Report Type</label>
            <div className="space-y-2">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedReportType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setSelectedReportType(type.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Icon size={20} className={selectedReportType === type.id ? 'text-blue-600' : 'text-slate-500'} />
                      <div>
                        <div className="font-medium text-slate-900">{type.name}</div>
                        <div className="text-sm text-slate-600">{type.description}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Date Range and Options */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {dateRange === 'custom' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">From</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">To</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Format</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="pdf">PDF</option>
                <option value="excel">Excel (XLSX)</option>
                <option value="csv">CSV</option>
              </select>
            </div>

            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Download size={16} />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>
        
        {recentReports.length === 0 ? (
          <div className="text-center py-8">
            <FileText size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">No reports generated yet</h3>
            <p className="text-slate-500">Generate your first report using the form above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-blue-600" />
                  <div>
                    <div className="font-medium text-slate-900">{report.name}</div>
                    <div className="text-sm text-slate-600">
                      {report.type} • {report.dateRange} • Generated on {new Date(report.generatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">{report.size}</span>
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
