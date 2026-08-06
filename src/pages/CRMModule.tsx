import React, { useState } from 'react';
import {
  Users,
  Search,
  Phone,
  Mail,
  DollarSign,
  UserPlus
} from 'lucide-react';
import { useTenant } from '../core/tenantContext';
import type { Lead } from '../core/types';

export const CRMModule: React.FC = () => {
  const { currentTenant } = useTenant();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'lead-101',
      tenantId: currentTenant.id,
      title: 'Commercial Storage Slab (8,000 sq ft)',
      customerName: 'Robert Vance',
      email: 'rvance@vancecold.com',
      phone: '(316) 555-0192',
      stage: 'Estimate Sent',
      estimatedValue: 84000,
      assignedTo: 'Carlos Mendez',
      notes: 'Requires 4,000 PSI high-strength concrete with fiber mesh rebar.',
      createdAt: '2025-08-01'
    },
    {
      id: 'lead-102',
      tenantId: currentTenant.id,
      title: 'Stamped Ashlar Slate Patio & Firepit',
      customerName: 'Dr. Sarah Lin',
      email: 'slin.med@gmail.com',
      phone: '(316) 555-0144',
      stage: 'Site Visit',
      estimatedValue: 24500,
      assignedTo: 'Elena Rostova',
      notes: 'Wants charcoal release agent with double matte acrylic sealer.',
      createdAt: '2025-08-03'
    },
    {
      id: 'lead-103',
      tenantId: currentTenant.id,
      title: 'Industrial Apron & Curbing',
      customerName: 'Prologis Logistics',
      email: 'bids@prologis-ks.com',
      phone: '(316) 555-9821',
      stage: 'Won',
      estimatedValue: 145000,
      assignedTo: 'Carlos Mendez',
      notes: 'Approved. Initial security deposit invoiced.',
      createdAt: '2025-07-28'
    },
    {
      id: 'lead-104',
      tenantId: currentTenant.id,
      title: 'Residential 3-Car Driveway Replacement',
      customerName: 'Mark Higgins',
      email: 'mhiggins99@yahoo.com',
      phone: '(316) 555-3310',
      stage: 'New Lead',
      estimatedValue: 16800,
      assignedTo: 'David Vance',
      notes: 'Customer called in requesting tear-out and repour.',
      createdAt: '2025-08-05'
    }
  ]);

  const stages: Lead['stage'][] = [
    'New Lead',
    'Site Visit',
    'Estimate Sent',
    'Negotiation',
    'Won',
    'Lost'
  ];

  const handleStageChange = (leadId: string, newStage: Lead['stage']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
    );
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
            <Users className="w-4 h-4" />
            <span>CRM & Sales Pipeline • {currentTenant.name}</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sales Pipeline Board</h1>
          <p className="text-xs text-slate-400">
            Track leads, site visits, estimates sent, and won contracts in one unified pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads or contacts..."
              className="pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => alert('Add New Lead Modal')}
            className="btn-cos-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Kanban Pipeline Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageLeads = filteredLeads.filter((l) => l.stage === stage);
          const stageTotal = stageLeads.reduce((acc, curr) => acc + curr.estimatedValue, 0);

          return (
            <div
              key={stage}
              className="bg-[#0f172a] border border-white/10 rounded-2xl p-3 flex flex-col min-w-[220px]"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                <span className="text-xs font-bold text-slate-200">{stage}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-blue-300">
                  {stageLeads.length}
                </span>
              </div>
              <div className="text-[11px] font-mono text-emerald-400 mb-3 font-semibold">
                ${stageTotal.toLocaleString()}
              </div>

              {/* Lead Cards */}
              <div className="space-y-3 flex-1">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-blue-300 transition-colors line-clamp-2">
                        {lead.title}
                      </h4>
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium">
                      {lead.customerName}
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-white/5">
                      <span className="text-emerald-400 font-bold">
                        ${lead.estimatedValue.toLocaleString()}
                      </span>
                      <span className="text-slate-500 text-[10px]">{lead.assignedTo}</span>
                    </div>

                    {/* Quick Move Select */}
                    <div className="pt-1 flex items-center justify-between">
                      <select
                        value={lead.stage}
                        onChange={(e) =>
                          handleStageChange(lead.id, e.target.value as Lead['stage'])
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] bg-slate-900 text-slate-300 border border-white/10 rounded px-1.5 py-0.5 focus:outline-none"
                      >
                        {stages.map((s) => (
                          <option key={s} value={s}>
                            Move to: {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
                {stageLeads.length === 0 && (
                  <div className="py-8 text-center text-[11px] text-slate-500 italic border border-dashed border-white/5 rounded-xl">
                    No deals
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead Detail Drawer / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono text-blue-400">{selectedLead.id}</span>
                <h3 className="text-base font-bold text-white">{selectedLead.title}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span>Customer: <strong>{selectedLead.customerName}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Email: {selectedLead.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Phone: {selectedLead.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>
                  Value: <strong className="text-emerald-400">${selectedLead.estimatedValue.toLocaleString()}</strong>
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="text-[10px] font-semibold text-slate-400 uppercase">Notes</div>
                <p className="text-slate-300 leading-relaxed">{selectedLead.notes}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button
                onClick={() => setSelectedLead(null)}
                className="btn-cos-secondary px-4 py-2 rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
