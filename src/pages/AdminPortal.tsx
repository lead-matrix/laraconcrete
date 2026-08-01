import React, { useState } from 'react';
import { useCMS } from '../cms/useCMS';
import {
  Users,
  DollarSign,
  TrendingUp,
  BarChart3,
  Calendar,
  Truck,
  Plus,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { SEOMetadata } from '../components/ui/SEOMetadata';

export const AdminPortal: React.FC = () => {
  const { leads, updateLeadStatus, showToast } = useCMS();
  const [activeTab, setActiveTab] = useState<'pipeline' | 'jobs' | 'invoices' | 'fleet' | 'analytics'>('pipeline');
  const [leadFilter, setLeadFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = leads.filter((l) => {
    const matchesFilter = leadFilter === 'All' || l.status === leadFilter;
    const matchesSearch = l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.phone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const totalPipelineValue = leads.reduce((acc, curr) => acc + curr.estimatedBudget, 0);

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-6 pb-20">
      <SEOMetadata title="Enterprise Admin CRM & Analytics | Lara Concrete LLC" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/10 shadow-2xl flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F58220] font-black text-white text-lg flex items-center justify-center border-2 border-white/20">
              LC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">Lara Enterprise CRM & Operating Dashboard</h1>
                <span className="text-[10px] bg-[#F58220]/20 text-[#F58220] font-bold px-2 py-0.5 rounded border border-[#F58220]/40 uppercase">
                  V2.0 PRO
                </span>
              </div>
              <p className="text-xs text-gray-400">Manage Quotes, Pipeline, Fleet Dispatches, Invoices, and Analytics</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('New Manual Lead Form Opened')}
              className="btn-lara-primary px-4 py-2.5 rounded-xl text-xs uppercase font-extrabold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>New Lead</span>
            </button>
          </div>
        </div>

        {/* Analytics Executive Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-white/10 shadow-xl">
            <div className="flex justify-between items-center text-gray-400 text-xs font-bold uppercase mb-2">
              <span>Total Pipeline Value</span>
              <DollarSign className="w-4 h-4 text-[#F58220]" />
            </div>
            <div className="text-3xl font-black text-white">${totalPipelineValue.toLocaleString()}</div>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" /> +18.4% from last month
            </span>
          </div>

          <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-white/10 shadow-xl">
            <div className="flex justify-between items-center text-gray-400 text-xs font-bold uppercase mb-2">
              <span>Active Quote Leads</span>
              <Users className="w-4 h-4 text-[#F58220]" />
            </div>
            <div className="text-3xl font-black text-[#F58220]">{leads.length}</div>
            <span className="text-[10px] text-gray-400 mt-1 block">15-min response SLA active</span>
          </div>

          <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-white/10 shadow-xl">
            <div className="flex justify-between items-center text-gray-400 text-xs font-bold uppercase mb-2">
              <span>Close Rate (YTD)</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">34.8%</div>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" /> Top in Kansas Region
            </span>
          </div>

          <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-white/10 shadow-xl">
            <div className="flex justify-between items-center text-gray-400 text-xs font-bold uppercase mb-2">
              <span>Fleet Operational Status</span>
              <Truck className="w-4 h-4 text-[#F58220]" />
            </div>
            <div className="text-3xl font-black text-emerald-400">100%</div>
            <span className="text-[10px] text-gray-400 mt-1 block">4/4 Trucks & Screeds Ready</span>
          </div>
        </div>

        {/* CRM Tabs */}
        <div className="flex border-b border-white/10 bg-[#1A1A1A] rounded-t-2xl px-4 text-xs font-bold gap-2">
          {[
            { id: 'pipeline', label: 'Lead Pipeline & Quotes', icon: <Users className="w-4 h-4" /> },
            { id: 'jobs', label: 'Active Jobs & Schedule', icon: <Calendar className="w-4 h-4" /> },
            { id: 'invoices', label: 'Invoices & Payments', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'fleet', label: 'Fleet & Equipment', icon: <Truck className="w-4 h-4" /> },
            { id: 'analytics', label: 'Business Analytics', icon: <BarChart3 className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-4 flex items-center gap-2 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-[#F58220] text-[#F58220] bg-white/5'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="bg-[#1A1A1A] rounded-b-2xl border-x border-b border-white/10 p-6 shadow-2xl">
          
          {/* Lead Pipeline Tab */}
          {activeTab === 'pipeline' && (
            <div className="space-y-6">
              
              {/* Filter & Search Bar */}
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-2 bg-[#2D2D2D] px-3 py-1.5 rounded-xl border border-white/10 flex-1 max-w-md">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by customer name, phone, or service..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none w-full"
                  />
                </div>

                <div className="flex gap-2">
                  {['All', 'New', 'Site Visit Scheduled', 'Approved'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setLeadFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        leadFilter === st
                          ? 'bg-[#F58220] text-white border-[#F58220]'
                          : 'bg-[#2D2D2D] text-gray-400 border-white/10'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leads Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#2D2D2D] text-gray-400 uppercase text-[10px] font-extrabold border-b border-white/10">
                      <th className="p-3">Customer & Address</th>
                      <th className="p-3">Service Type</th>
                      <th className="p-3">Est Sq Ft</th>
                      <th className="p-3">Est Value</th>
                      <th className="p-3">Preferred Contact</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3">
                          <span className="font-extrabold text-white block">{lead.customerName}</span>
                          <span className="text-gray-400 text-[10px]">{lead.phone} • {lead.city}</span>
                        </td>
                        <td className="p-3 text-gray-300 font-medium">{lead.serviceType}</td>
                        <td className="p-3 text-gray-300 font-bold">{lead.estimatedSqFt} sq ft</td>
                        <td className="p-3 font-extrabold text-[#F58220]">${lead.estimatedBudget.toLocaleString()}</td>
                        <td className="p-3">
                          <span className="bg-[#2D2D2D] text-gray-300 px-2 py-0.5 rounded text-[10px] font-bold border border-white/10">
                            {lead.preferredContact}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                            className="bg-[#2D2D2D] border border-white/20 text-white rounded p-1 text-[11px] font-bold"
                          >
                            <option value="New">New</option>
                            <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                            <option value="Estimate Sent">Estimate Sent</option>
                            <option value="Approved">Approved</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => showToast(`Opening details for ${lead.customerName}`)}
                            className="text-[10px] bg-[#F58220]/20 text-[#F58220] hover:bg-[#F58220] hover:text-white px-2.5 py-1 rounded font-bold transition-colors"
                          >
                            View Lead
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* Analytics Dashboard Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-lg text-white">Business Intelligence & Traffic Metrics</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#2D2D2D] p-5 rounded-xl border border-white/10 space-y-3">
                  <span className="text-xs font-bold text-gray-400 uppercase">Top Requested Concrete Services</span>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span>1. Concrete Driveways (45%)</span>
                      <div className="w-32 bg-[#1A1A1A] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#F58220] h-full w-[45%]"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>2. Stamped Patios (30%)</span>
                      <div className="w-32 bg-[#1A1A1A] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#F58220] h-full w-[30%]"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>3. Garage Slabs (15%)</span>
                      <div className="w-32 bg-[#1A1A1A] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#F58220] h-full w-[15%]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#2D2D2D] p-5 rounded-xl border border-white/10 space-y-3">
                  <span className="text-xs font-bold text-gray-400 uppercase">Top Performing Cities</span>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="font-bold">Wichita, KS</span>
                      <span className="text-[#F58220] font-black">640 Projects ($5.3M)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Derby, KS</span>
                      <span className="text-[#F58220] font-black">215 Projects ($1.5M)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Andover, KS</span>
                      <span className="text-[#F58220] font-black">180 Projects ($1.7M)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fleet Tab */}
          {activeTab === 'fleet' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-lg text-white">Equipment Maintenance & Dispatch Logs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#2D2D2D] p-4 rounded-xl border border-white/10 flex justify-between items-center">
                  <div>
                    <span className="font-extrabold text-white block text-sm">Ford F-550 Commander (Fleet #01)</span>
                    <span className="text-gray-400">Status: Dispatched to Eastborough Job Site</span>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-1 rounded">READY</span>
                </div>
                <div className="bg-[#2D2D2D] p-4 rounded-xl border border-white/10 flex justify-between items-center">
                  <div>
                    <span className="font-extrabold text-white block text-sm">Somero Laser Screed (S-485)</span>
                    <span className="text-gray-400">Status: Calibrated • 3D Transit Active</span>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-1 rounded">READY</span>
                </div>
              </div>
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-extrabold text-lg text-white">Recent Customer Invoices & Deposits</h3>
              <div className="bg-[#2D2D2D] p-4 rounded-xl border border-white/10 flex justify-between items-center">
                <div>
                  <span className="font-bold text-white block">INV-101 • David & Sarah Jenkins</span>
                  <span className="text-gray-400">Deposit Paid: $5,000.00</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-1 rounded">PAID</span>
              </div>
            </div>
          )}

          {/* Jobs Schedule Tab */}
          {activeTab === 'jobs' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-extrabold text-lg text-white">Scheduled Pours Calendar</h3>
              <div className="bg-[#2D2D2D] p-4 rounded-xl border border-white/10">
                <span className="font-bold text-[#F58220] block">Monday, Aug 10 @ 7:00 AM</span>
                <span className="text-white font-extrabold">3210 North Rock Rd (Wichita) — 4000 PSI Stamped Patio Pour</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
