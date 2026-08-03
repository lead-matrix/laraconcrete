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
  ArrowUpRight,
  Edit3,
  Phone,
  Layers,
  HelpCircle,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { SEOMetadata } from '../components/ui/SEOMetadata';

export const AdminPortal: React.FC = () => {
  const {
    leads,
    updateLeadStatus,
    showToast,
    companyDetails,
    updateCompanyDetails,
    services,
    updateService,
    addService,
    deleteService,
    faqs,
    updateFAQ,
    addFAQ,
    deleteFAQ,
    resetCMSDefaults
  } = useCMS();

  const [activeTab, setActiveTab] = useState<
    'pipeline' | 'jobs' | 'invoices' | 'fleet' | 'analytics' | 'editor'
  >('pipeline');
  const [editorSubTab, setEditorSubTab] = useState<'company' | 'services' | 'faqs'>('company');

  const [leadFilter, setLeadFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Form states for new service / FAQ
  const [newSrvTitle, setNewSrvTitle] = useState('');
  const [newSrvPrice, setNewSrvPrice] = useState(12.0);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  const filteredLeads = leads.filter((l) => {
    const matchesFilter = leadFilter === 'All' || l.status === leadFilter;
    const matchesSearch =
      l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const totalPipelineValue = leads.reduce((acc, curr) => acc + curr.estimatedBudget, 0);

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-6 pb-20">
      <SEOMetadata title="Enterprise Admin CRM & Live Content Editor | Lara Concrete LLC" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/10 shadow-2xl flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F58220] font-black text-white text-lg flex items-center justify-center border-2 border-white/20">
              LC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">
                  Lara Enterprise CRM &amp; Operating Dashboard
                </h1>
                <span className="text-[10px] bg-[#F58220]/20 text-[#F58220] font-bold px-2 py-0.5 rounded border border-[#F58220]/40 uppercase">
                  V2.0 PRO
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Manage Quotes, Pipeline, Fleet Dispatches, Invoices, and Live Content
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetCMSDefaults}
              className="bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white px-3 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-red-500/30"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Site Content</span>
            </button>
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
            <div className="text-3xl font-black text-white">
              ${totalPipelineValue.toLocaleString()}
            </div>
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
            <span className="text-[10px] text-gray-400 mt-1 block">
              4/4 Trucks &amp; Screeds Ready
            </span>
          </div>
        </div>

        {/* CRM Navigation Tabs */}
        <div className="flex flex-wrap border-b border-white/10 bg-[#1A1A1A] rounded-t-2xl px-4 text-xs font-bold gap-2">
          {[
            {
              id: 'pipeline',
              label: 'Lead Pipeline & Quotes',
              icon: <Users className="w-4 h-4" />
            },
            {
              id: 'editor',
              label: '🛠️ Website Content Editor',
              icon: <Edit3 className="w-4 h-4" />
            },
            { id: 'jobs', label: 'Active Jobs & Schedule', icon: <Calendar className="w-4 h-4" /> },
            {
              id: 'invoices',
              label: 'Invoices & Payments',
              icon: <DollarSign className="w-4 h-4" />
            },
            { id: 'fleet', label: 'Fleet & Equipment', icon: <Truck className="w-4 h-4" /> },
            {
              id: 'analytics',
              label: 'Business Analytics',
              icon: <BarChart3 className="w-4 h-4" />
            }
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

        {/* Tab Contents Area */}
        <div className="bg-[#1A1A1A] p-6 rounded-b-2xl border-x border-b border-white/10 shadow-2xl">
          {/* Lead Pipeline Tab */}
          {activeTab === 'pipeline' && (
            <div className="space-y-6">
              <div className="flex flex-wrap justify-between items-center gap-4 bg-[#2D2D2D] p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-300">Filter Status:</span>
                  {['All', 'New', 'Estimate Scheduled', 'Proposal Sent', 'Contract Signed'].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => setLeadFilter(status)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          leadFilter === status
                            ? 'bg-[#F58220] text-white'
                            : 'bg-[#1A1A1A] text-gray-400 hover:text-white'
                        }`}
                      >
                        {status}
                      </button>
                    )
                  )}
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by customer, service, phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#1A1A1A] border border-white/10 text-white rounded-xl pl-9 pr-4 py-1.5 text-xs focus:border-[#F58220] focus:outline-none w-64"
                  />
                </div>
              </div>

              {/* Leads Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#2D2D2D] text-gray-300 uppercase text-[10px] font-extrabold tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Phone &amp; Location</th>
                      <th className="p-3">Service &amp; Sq Ft</th>
                      <th className="p-3">Est. Budget</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium text-gray-200">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 font-bold text-white">
                          {lead.customerName}
                          <span className="block text-[10px] text-gray-400 font-normal">
                            {lead.email}
                          </span>
                        </td>
                        <td className="p-3">
                          {lead.phone}
                          <span className="block text-[10px] text-gray-400">{lead.city}, KS</span>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-white">{lead.serviceType}</span>
                          <span className="block text-[10px] text-[#F58220] font-mono">
                            {lead.estimatedSqFt} Sq Ft
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-emerald-400">
                          ${lead.estimatedBudget.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                            className="bg-[#2D2D2D] border border-white/10 text-white rounded px-2 py-1 text-xs font-bold focus:border-[#F58220] focus:outline-none"
                          >
                            <option value="New">New</option>
                            <option value="Estimate Scheduled">Estimate Scheduled</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Contract Signed">Contract Signed</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => showToast(`Opening details for ${lead.customerName}`)}
                            className="text-[#F58220] hover:underline font-bold"
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

          {/* Website Live Content Editor Tab */}
          {activeTab === 'editor' && (
            <div className="space-y-6">
              <div className="bg-[#2D2D2D] p-4 rounded-xl border border-white/10 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-[#F58220]" />
                    Live Website Content &amp; Pricing Manager
                  </h3>
                  <p className="text-xs text-gray-400">
                    Changes made here update the live website immediately and persist across
                    sessions.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditorSubTab('company')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      editorSubTab === 'company'
                        ? 'bg-[#F58220] text-white'
                        : 'bg-[#1A1A1A] text-gray-300'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Company Details</span>
                  </button>
                  <button
                    onClick={() => setEditorSubTab('services')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      editorSubTab === 'services'
                        ? 'bg-[#F58220] text-white'
                        : 'bg-[#1A1A1A] text-gray-300'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Services &amp; Rates ({services.length})</span>
                  </button>
                  <button
                    onClick={() => setEditorSubTab('faqs')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      editorSubTab === 'faqs'
                        ? 'bg-[#F58220] text-white'
                        : 'bg-[#1A1A1A] text-gray-300'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>FAQs ({faqs.length})</span>
                  </button>
                </div>
              </div>

              {/* Subtab: Company Details */}
              {editorSubTab === 'company' && (
                <div className="bg-[#222222] p-5 rounded-xl border border-white/10 space-y-4">
                  <h4 className="font-extrabold text-sm text-[#F58220] uppercase tracking-wider">
                    Company Phone Lines &amp; Contact Info
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="text-gray-400 font-bold block mb-1">
                        Primary Hotline (Phone 1)
                      </label>
                      <input
                        type="text"
                        value={companyDetails.phone1}
                        onChange={(e) => updateCompanyDetails({ phone1: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-lg p-2.5 font-mono focus:border-[#F58220] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 font-bold block mb-1">
                        Secondary Line (Phone 2)
                      </label>
                      <input
                        type="text"
                        value={companyDetails.phone2}
                        onChange={(e) => updateCompanyDetails({ phone2: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-lg p-2.5 font-mono focus:border-[#F58220] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 font-bold block mb-1">Estimates Email</label>
                      <input
                        type="text"
                        value={companyDetails.email}
                        onChange={(e) => updateCompanyDetails({ email: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-lg p-2.5 font-mono focus:border-[#F58220] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 font-bold block mb-1">
                        Headquarters Address
                      </label>
                      <input
                        type="text"
                        value={companyDetails.address}
                        onChange={(e) => updateCompanyDetails({ address: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-lg p-2.5 font-mono focus:border-[#F58220] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 font-bold block mb-1">
                        Projects Poured Count (Hero Stat)
                      </label>
                      <input
                        type="number"
                        value={companyDetails.projectsCompleted}
                        onChange={(e) =>
                          updateCompanyDetails({ projectsCompleted: parseInt(e.target.value) || 0 })
                        }
                        className="w-full bg-[#1A1A1A] border border-white/10 text-[#F58220] font-bold rounded-lg p-2.5 font-mono focus:border-[#F58220] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 font-bold block mb-1">
                        Years in Business
                      </label>
                      <input
                        type="number"
                        value={companyDetails.yearsInBusiness}
                        onChange={(e) =>
                          updateCompanyDetails({ yearsInBusiness: parseInt(e.target.value) || 0 })
                        }
                        className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-lg p-2.5 font-mono focus:border-[#F58220] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab: Services */}
              {editorSubTab === 'services' && (
                <div className="space-y-4 text-xs">
                  <div className="bg-[#222222] p-4 rounded-xl border border-white/10 space-y-3">
                    <h5 className="font-extrabold text-white text-xs uppercase flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-[#F58220]" />
                      Add New Concrete Service
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Service Title (e.g. Concrete Retaining Walls)"
                        value={newSrvTitle}
                        onChange={(e) => setNewSrvTitle(e.target.value)}
                        className="bg-[#1A1A1A] border border-white/10 text-white rounded-lg p-2 text-xs"
                      />
                      <input
                        type="number"
                        step="0.5"
                        placeholder="Base Rate $/sq ft"
                        value={newSrvPrice}
                        onChange={(e) => setNewSrvPrice(parseFloat(e.target.value) || 0)}
                        className="bg-[#1A1A1A] border border-white/10 text-white rounded-lg p-2 text-xs"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (!newSrvTitle) return;
                        addService({
                          id: `srv-${Date.now()}`,
                          title: newSrvTitle,
                          slug: newSrvTitle.toLowerCase().replace(/\s+/g, '-'),
                          category: 'residential',
                          shortDesc: `Professional ${newSrvTitle} by Lara Concrete LLC.`,
                          fullDesc: `Engineered 4000 PSI ${newSrvTitle} poured to high standards.`,
                          iconName: 'Building',
                          popular: true,
                          basePricePerSqFt: newSrvPrice,
                          typicalThicknessInches: 4,
                          rebarOptions: ['#4 Rebar @ 18" O.C.'],
                          finishTypes: ['Standard Finish'],
                          features: ['4000 PSI Concrete', '10-Year Warranty'],
                          image:
                            'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80'
                        });
                        setNewSrvTitle('');
                      }}
                      className="btn-lara-primary px-4 py-2 rounded-lg font-bold uppercase text-[10px]"
                    >
                      Save New Service
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((srv) => (
                      <div
                        key={srv.id}
                        className="bg-[#222222] p-3 rounded-xl border border-white/10 space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-[#F58220] uppercase">
                            {srv.category}
                          </span>
                          <button
                            onClick={() => deleteService(srv.id)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={srv.title}
                          onChange={(e) => updateService(srv.id, { title: e.target.value })}
                          className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded p-1.5 font-bold text-xs"
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-[10px]">Base $/sq ft:</span>
                          <input
                            type="number"
                            step="0.5"
                            value={srv.basePricePerSqFt}
                            onChange={(e) =>
                              updateService(srv.id, {
                                basePricePerSqFt: parseFloat(e.target.value) || 0
                              })
                            }
                            className="bg-[#1A1A1A] border border-white/10 text-emerald-400 font-mono font-bold rounded p-1 text-xs w-24"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subtab: FAQs */}
              {editorSubTab === 'faqs' && (
                <div className="space-y-4 text-xs">
                  <div className="bg-[#222222] p-4 rounded-xl border border-white/10 space-y-2">
                    <h5 className="font-extrabold text-white text-xs uppercase flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-[#F58220]" />
                      Add New FAQ Question
                    </h5>
                    <input
                      type="text"
                      placeholder="Question..."
                      value={newFaqQ}
                      onChange={(e) => setNewFaqQ(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded p-2 text-xs"
                    />
                    <textarea
                      placeholder="Answer..."
                      value={newFaqA}
                      onChange={(e) => setNewFaqA(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded p-2 text-xs h-16"
                    />
                    <button
                      onClick={() => {
                        if (!newFaqQ || !newFaqA) return;
                        addFAQ({ q: newFaqQ, a: newFaqA });
                        setNewFaqQ('');
                        setNewFaqA('');
                      }}
                      className="btn-lara-primary px-4 py-2 rounded-lg font-bold uppercase text-[10px]"
                    >
                      Save FAQ
                    </button>
                  </div>

                  <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="bg-[#222222] p-3 rounded-xl border border-white/10 space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-[#F58220] uppercase">
                            FAQ #{idx + 1}
                          </span>
                          <button
                            onClick={() => deleteFAQ(idx)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => updateFAQ(idx, e.target.value, faq.a)}
                          className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded p-1.5 font-bold text-xs"
                        />
                        <textarea
                          value={faq.a}
                          onChange={(e) => updateFAQ(idx, faq.q, e.target.value)}
                          className="w-full bg-[#1A1A1A] border border-white/10 text-gray-300 rounded p-1.5 text-xs h-16"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-extrabold text-lg text-white">
                Recent Customer Invoices &amp; Deposits
              </h3>
              <div className="bg-[#2D2D2D] p-4 rounded-xl border border-white/10 flex justify-between items-center">
                <div>
                  <span className="font-bold text-white block">
                    INV-101 • David &amp; Sarah Jenkins
                  </span>
                  <span className="text-gray-400">Deposit Paid: $5,000.00</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-1 rounded">
                  PAID
                </span>
              </div>
            </div>
          )}

          {/* Jobs Schedule Tab */}
          {activeTab === 'jobs' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-extrabold text-lg text-white">Scheduled Pours Calendar</h3>
              <div className="bg-[#2D2D2D] p-4 rounded-xl border border-white/10">
                <span className="font-bold text-[#F58220] block">Monday, Aug 10 @ 7:00 AM</span>
                <span className="text-white font-extrabold">
                  3210 North Rock Rd (Wichita) — 4000 PSI Stamped Patio Pour
                </span>
              </div>
            </div>
          )}

          {/* Fleet Tab */}
          {activeTab === 'fleet' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-extrabold text-lg text-white">
                Branded Fleet Tracking &amp; Maintenance
              </h3>
              <div className="bg-[#2D2D2D] p-4 rounded-xl border border-white/10 flex justify-between items-center">
                <div>
                  <span className="font-bold text-white block">
                    TRK-01 • Ford F-550 Dump Truck (Signature Orange Wrap)
                  </span>
                  <span className="text-gray-400">Status: Active &amp; Dispatched</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-1 rounded">
                  READY
                </span>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-extrabold text-lg text-white">
                Revenue &amp; Lead Conversion Performance
              </h3>
              <div className="bg-[#2D2D2D] p-4 rounded-xl border border-white/10">
                <span className="font-bold text-[#F58220] block">
                  Average Ticket Size: $9,800.00
                </span>
                <span className="text-gray-300">Wichita Metro Area Conversion Rate: 34.8%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
