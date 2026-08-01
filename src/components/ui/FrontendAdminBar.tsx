import React, { useState } from 'react';
import { useCMS } from '../../cms/useCMS';
import { Settings, Plus, Trash2, X, RefreshCw, Phone, HelpCircle, Layers } from 'lucide-react';

export const FrontendAdminBar: React.FC = () => {
  const {
    isAdminEditMode,
    setIsAdminEditMode,
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

  const [activeTab, setActiveTab] = useState<'company' | 'services' | 'faqs' | null>(null);

  // New Service Form
  const [newSrvTitle, setNewSrvTitle] = useState('');
  const [newSrvCategory, setNewSrvCategory] = useState<'residential' | 'commercial' | 'decorative'>('residential');
  const [newSrvPrice, setNewSrvPrice] = useState(12.00);

  // New FAQ Form
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  return (
    <>
      {/* Admin Quick Mode Bar */}
      <div className="fixed bottom-20 left-4 z-40 lg:bottom-6 lg:left-6">
        <button
          onClick={() => setIsAdminEditMode(!isAdminEditMode)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-2xl text-xs font-black uppercase tracking-wider transition-all border-2 ${
            isAdminEditMode
              ? 'bg-amber-500 text-black border-white animate-pulse'
              : 'bg-[#1A1A1A]/90 hover:bg-[#2D2D2D] text-white border-[#F58220]/50'
          }`}
        >
          <Settings className={`w-4 h-4 ${isAdminEditMode ? 'animate-spin' : 'text-[#F58220]'}`} />
          <span>{isAdminEditMode ? '🛠️ Admin Edit Mode ON' : '🛠️ Admin Edit Mode'}</span>
        </button>
      </div>

      {/* Floating Admin Panel Drawer when active */}
      {isAdminEditMode && (
        <div className="fixed inset-x-4 top-20 z-50 max-w-4xl mx-auto bg-[#1A1A1A] text-white rounded-2xl border-2 border-[#F58220] shadow-2xl overflow-hidden animate-fadeIn">
          {/* Header Bar */}
          <div className="bg-[#2D2D2D] p-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping"></span>
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">
                Live Frontend Admin Editor &amp; CMS Control
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetCMSDefaults}
                className="text-[10px] bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white px-2.5 py-1 rounded font-bold transition-colors flex items-center gap-1 border border-red-500/30"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
              <button
                onClick={() => setIsAdminEditMode(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Edit Tabs */}
          <div className="bg-[#222222] p-2 border-b border-white/10 flex gap-2 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab(activeTab === 'company' ? null : 'company')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeTab === 'company' ? 'bg-[#F58220] text-white' : 'bg-[#2D2D2D] text-gray-300 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Phones &amp; Contact Info</span>
            </button>
            <button
              onClick={() => setActiveTab(activeTab === 'services' ? null : 'services')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeTab === 'services' ? 'bg-[#F58220] text-white' : 'bg-[#2D2D2D] text-gray-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Services &amp; Pricing ({services.length})</span>
            </button>
            <button
              onClick={() => setActiveTab(activeTab === 'faqs' ? null : 'faqs')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeTab === 'faqs' ? 'bg-[#F58220] text-white' : 'bg-[#2D2D2D] text-gray-300 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FAQs ({faqs.length})</span>
            </button>
          </div>

          {/* Tab Content Panel */}
          {activeTab && (
            <div className="p-4 max-h-96 overflow-y-auto space-y-4 bg-[#121212] text-xs">
              
              {/* Company Details Tab */}
              {activeTab === 'company' && (
                <div className="space-y-3">
                  <h4 className="font-extrabold text-white text-xs uppercase text-[#F58220]">
                    Edit Primary Company Details (Reflects Live Across Whole Site)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold block mb-1">Primary Phone 1</label>
                      <input
                        type="text"
                        value={companyDetails.phone1}
                        onChange={(e) => updateCompanyDetails({ phone1: e.target.value })}
                        className="w-full bg-[#2D2D2D] border border-white/10 text-white rounded px-3 py-1.5 text-xs font-mono focus:border-[#F58220] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold block mb-1">Phone Line 2</label>
                      <input
                        type="text"
                        value={companyDetails.phone2}
                        onChange={(e) => updateCompanyDetails({ phone2: e.target.value })}
                        className="w-full bg-[#2D2D2D] border border-white/10 text-white rounded px-3 py-1.5 text-xs font-mono focus:border-[#F58220] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold block mb-1">Dispatch Email</label>
                      <input
                        type="text"
                        value={companyDetails.email}
                        onChange={(e) => updateCompanyDetails({ email: e.target.value })}
                        className="w-full bg-[#2D2D2D] border border-white/10 text-white rounded px-3 py-1.5 text-xs font-mono focus:border-[#F58220] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold block mb-1">Wichita Address</label>
                      <input
                        type="text"
                        value={companyDetails.address}
                        onChange={(e) => updateCompanyDetails({ address: e.target.value })}
                        className="w-full bg-[#2D2D2D] border border-white/10 text-white rounded px-3 py-1.5 text-xs font-mono focus:border-[#F58220] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Services Tab */}
              {activeTab === 'services' && (
                <div className="space-y-4">
                  <div className="bg-[#2D2D2D] p-3 rounded-xl border border-white/10 space-y-2">
                    <h5 className="font-extrabold text-white text-xs flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5 text-[#F58220]" />
                      Add New Concrete Service
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Service Title (e.g. Concrete Pool Decks)"
                        value={newSrvTitle}
                        onChange={(e) => setNewSrvTitle(e.target.value)}
                        className="bg-[#1A1A1A] border border-white/10 text-white rounded px-2.5 py-1 text-xs"
                      />
                      <select
                        value={newSrvCategory}
                        onChange={(e) => setNewSrvCategory(e.target.value as any)}
                        className="bg-[#1A1A1A] border border-white/10 text-white rounded px-2.5 py-1 text-xs"
                      >
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="decorative">Decorative</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Base $/sq ft"
                        value={newSrvPrice}
                        onChange={(e) => setNewSrvPrice(parseFloat(e.target.value) || 0)}
                        className="bg-[#1A1A1A] border border-white/10 text-white rounded px-2.5 py-1 text-xs"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (!newSrvTitle) return;
                        addService({
                          id: `srv-${Date.now()}`,
                          title: newSrvTitle,
                          slug: newSrvTitle.toLowerCase().replace(/\s+/g, '-'),
                          category: newSrvCategory,
                          shortDesc: `Custom ${newSrvTitle} by Lara Concrete LLC in Wichita KS.`,
                          fullDesc: `High performance 4000 PSI ${newSrvTitle} poured with rebar reinforcement.`,
                          iconName: 'Building',
                          popular: true,
                          basePricePerSqFt: newSrvPrice,
                          typicalThicknessInches: 4,
                          rebarOptions: ['#4 Rebar @ 18" O.C.'],
                          finishTypes: ['Standard Finish'],
                          features: ['4000 PSI Mix', '10-Year Warranty'],
                          image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80'
                        });
                        setNewSrvTitle('');
                      }}
                      className="btn-lara-primary px-3 py-1 rounded text-xs font-bold"
                    >
                      Add Service
                    </button>
                  </div>

                  {/* List of services to edit or delete */}
                  <div className="space-y-2">
                    {services.map((srv) => (
                      <div key={srv.id} className="bg-[#2D2D2D] p-2.5 rounded-lg border border-white/10 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex-1 min-w-[200px]">
                          <input
                            type="text"
                            value={srv.title}
                            onChange={(e) => updateService(srv.id, { title: e.target.value })}
                            className="bg-[#1A1A1A] border border-white/10 text-white rounded px-2 py-1 text-xs font-bold w-full"
                          />
                        </div>
                        <div className="w-24">
                          <input
                            type="number"
                            step="0.5"
                            value={srv.basePricePerSqFt}
                            onChange={(e) => updateService(srv.id, { basePricePerSqFt: parseFloat(e.target.value) || 0 })}
                            className="bg-[#1A1A1A] border border-white/10 text-white rounded px-2 py-1 text-xs font-mono w-full"
                          />
                        </div>
                        <button
                          onClick={() => deleteService(srv.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs Tab */}
              {activeTab === 'faqs' && (
                <div className="space-y-3">
                  <div className="bg-[#2D2D2D] p-3 rounded-xl border border-white/10 space-y-2">
                    <h5 className="font-extrabold text-white text-xs flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5 text-[#F58220]" />
                      Add New FAQ Question
                    </h5>
                    <input
                      type="text"
                      placeholder="Question..."
                      value={newFaqQ}
                      onChange={(e) => setNewFaqQ(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded px-2.5 py-1 text-xs"
                    />
                    <textarea
                      placeholder="Answer..."
                      value={newFaqA}
                      onChange={(e) => setNewFaqA(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded px-2.5 py-1 text-xs h-16"
                    />
                    <button
                      onClick={() => {
                        if (!newFaqQ || !newFaqA) return;
                        addFAQ({ q: newFaqQ, a: newFaqA });
                        setNewFaqQ('');
                        setNewFaqA('');
                      }}
                      className="btn-lara-primary px-3 py-1 rounded text-xs font-bold"
                    >
                      Add FAQ
                    </button>
                  </div>

                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="bg-[#2D2D2D] p-2.5 rounded-lg border border-white/10 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#F58220] uppercase">FAQ #{idx + 1}</span>
                          <button
                            onClick={() => deleteFAQ(idx)}
                            className="text-red-400 hover:text-red-300 p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => updateFAQ(idx, e.target.value, faq.a)}
                          className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded px-2 py-1 text-xs font-bold"
                        />
                        <textarea
                          value={faq.a}
                          onChange={(e) => updateFAQ(idx, faq.q, e.target.value)}
                          className="w-full bg-[#1A1A1A] border border-white/10 text-gray-300 rounded px-2 py-1 text-xs h-14"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      )}
    </>
  );
};
