
import React, { useState } from 'react';
import { Plus, Mail, Phone, Building } from 'lucide-react';
import './ClientManagement.css';

const ClientManagement = () => {
  const [clients] = useState([
    // Empty array - no demo data
  ]);

  const getStatusClassName = (status) => {
    return status === 'Active' ? 'status-badge status-active' : 'status-badge status-review';
  };

  return (
    <div className="client-management">
      <div className="header">
        <h1 className="title">Client Management</h1>
        <button className="add-client-btn">
          <Plus size={16} />
          Add Client
        </button>
      </div>

      <div className="client-table-container">
        <div className="table-header">
          <h2 className="table-title">Client Portfolio</h2>
        </div>

        {clients.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <Users size={48} className="mx-auto text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clients yet</h3>
            <p className="text-gray-500 mb-4">Start by adding your first client to the system.</p>
            <button className="add-client-btn">
              <Plus size={16} />
              Add First Client
            </button>
          </div>
        ) : (
          <table className="client-table">
            <thead className="table-head">
              <tr>
                <th>Client</th>
                <th>Contact</th>
                <th>Industry</th>
                <th>AUM</th>
                <th>Projects</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="table-row">
                  <td className="table-cell">
                    <div className="client-info">
                      <div className="client-avatar">
                        <Building size={20} />
                      </div>
                      <div>
                        <div className="client-name">{client.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="contact-details">
                      <div className="contact-name">{client.contact}</div>
                      <div className="contact-item">
                        <Mail size={12} />
                        {client.email}
                      </div>
                      <div className="contact-item">
                        <Phone size={12} />
                        {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="industry-cell">{client.industry}</div>
                  </td>
                  <td className="table-cell">
                    <div className="aum-cell">{client.aum}</div>
                  </td>
                  <td className="table-cell">
                    <div className="projects-cell">{client.projects}</div>
                  </td>
                  <td className="table-cell">
                    <span className={getStatusClassName(client.status)}>
                      {client.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ClientManagement;
