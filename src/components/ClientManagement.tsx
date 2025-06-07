import React, { useState } from 'react';
import { Plus, Mail, Phone, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ClientManagement = () => {
  const [clients] = useState([
    {
      id: 1,
      name: 'TechStart Inc.',
      contact: 'John Smith',
      email: 'john@techstart.com',
      phone: '+1 (555) 123-4567',
      industry: 'Technology',
      aum: '$2.5M',
      projects: 2,
      status: 'Active'
    },
    {
      id: 2,
      name: 'RetailCorp',
      contact: 'Sarah Johnson',
      email: 'sarah@retailcorp.com',
      phone: '+1 (555) 987-6543',
      industry: 'Retail',
      aum: '$5.8M',
      projects: 1,
      status: 'Active'
    },
    {
      id: 3,
      name: 'GreenEnergy Solutions',
      contact: 'Mike Davis',
      email: 'mike@greenenergy.com',
      phone: '+1 (555) 456-7890',
      industry: 'Energy',
      aum: '$3.2M',
      projects: 1,
      status: 'Review'
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Client Management</h1>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Client
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Client Portfolio</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  AUM
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{client.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{client.contact}</div>
                    <div className="text-sm text-slate-500 flex items-center gap-1">
                      <Mail size={12} />
                      {client.email}
                    </div>
                    <div className="text-sm text-slate-500 flex items-center gap-1">
                      <Phone size={12} />
                      {client.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {client.industry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {client.aum}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {client.projects}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      client.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;
