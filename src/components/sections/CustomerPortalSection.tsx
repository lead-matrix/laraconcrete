import React, { useState } from 'react';
import {
  UserCheck,
  CheckCircle2,
  Clock,
  FileText,
  Download,
  Upload,
  MessageSquare,
  DollarSign
} from 'lucide-react';
import { useCMS } from '../../cms/useCMS';

export const CustomerPortalSection: React.FC = () => {
  const { portalProject, updatePortalStep, showToast } = useCMS();
  const [activeTab, setActiveTab] = useState<'status' | 'invoices' | 'photos' | 'messages'>(
    'status'
  );
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'Carlos Lara (Project Manager)',
      text: 'Hello David! Your 4000 PSI concrete pour is scheduled for Monday at 7:00 AM. Rebar cages and forms are ready.',
      time: 'Yesterday 3:15 PM'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: 'You (Customer)', text: messageInput, time: 'Just now' }
    ]);
    setMessageInput('');
    showToast('Message sent to Project Manager Carlos Lara.');
  };

  const handleUploadPhoto = () => {
    showToast('Site photo uploaded! Project manager notified.');
  };

  return (
    <section
      id="customer-portal"
      className="py-20 bg-[#F6F6F6] text-[#2D2D2D] relative border-b border-gray-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F58220]/15 text-[#F58220] border border-[#F58220]/30 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Interactive Customer Portal Demo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#2D2D2D]">
            Track Your Concrete Pour in Real Time
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Every ZenBid Pro customer gets dedicated digital portal access to track construction
            milestones, view structural drawings, verify warranties, and message project leads in
            real time.
          </p>
        </div>

        {/* Portal Shell Container */}
        <div className="bg-[#2D2D2D] text-white rounded-2xl border border-gray-300 shadow-2xl overflow-hidden">
          {/* Top Bar of Portal */}
          <div className="bg-[#1A1A1A] p-4 sm:p-6 border-b border-white/10 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F58220] flex items-center justify-center font-bold text-white text-base">
                LC
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-white">
                    {portalProject.customerName}
                  </h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/40 uppercase">
                    ACTIVE PROJECT
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-medium">
                  {portalProject.projectType} • {portalProject.address}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="bg-[#2D2D2D] px-3 py-1.5 rounded-lg border border-white/10">
                <span className="text-gray-400 font-bold block text-[9px] uppercase">
                  Project Manager
                </span>
                <span className="text-[#F58220] font-bold">{portalProject.projectManagerName}</span>
              </div>
              <div className="bg-[#2D2D2D] px-3 py-1.5 rounded-lg border border-white/10">
                <span className="text-gray-400 font-bold block text-[9px] uppercase">
                  Scheduled Pour
                </span>
                <span className="text-white font-bold">{portalProject.scheduledDate}</span>
              </div>
            </div>
          </div>

          {/* Milestone Step Timeline */}
          <div className="p-6 bg-[#222222] border-b border-white/10">
            <h4 className="text-xs font-extrabold text-gray-300 uppercase tracking-wider mb-4">
              Project Construction Timeline Progress:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {portalProject.stepLabels.map((label, idx) => {
                const stepNum = (idx + 1) as any;
                const isCompleted = stepNum < portalProject.currentStep;
                const isCurrent = stepNum === portalProject.currentStep;

                return (
                  <button
                    key={idx}
                    onClick={() => updatePortalStep(stepNum)}
                    className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between ${
                      isCompleted
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                        : isCurrent
                          ? 'bg-[#F58220]/20 border-[#F58220] text-white shadow-lg'
                          : 'bg-[#1A1A1A] border-white/10 text-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span>Step 0{stepNum}</span>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <Clock className="w-4 h-4 text-[#F58220] animate-spin" />
                      ) : (
                        <span className="text-[10px]">Upcoming</span>
                      )}
                    </div>
                    <span className="text-xs font-extrabold line-clamp-1">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 bg-[#1A1A1A] px-6 text-xs font-bold">
            {[
              {
                id: 'status',
                label: "Today's Status & Specs",
                icon: <CheckCircle2 className="w-3.5 h-3.5" />
              },
              {
                id: 'invoices',
                label: 'Invoices & Payments',
                icon: <DollarSign className="w-3.5 h-3.5" />
              },
              {
                id: 'photos',
                label: 'Site Photo Gallery',
                icon: <FileText className="w-3.5 h-3.5" />
              },
              {
                id: 'messages',
                label: 'Message Project Manager',
                icon: <MessageSquare className="w-3.5 h-3.5" />
              }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-4 flex items-center gap-1.5 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#F58220] text-[#F58220]'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="p-6">
            {/* Status Tab */}
            {activeTab === 'status' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
                    <span className="text-gray-400 text-xs font-bold uppercase block">
                      Current Phase
                    </span>
                    <p className="text-lg font-extrabold text-[#F58220] mt-1">
                      Formwork & Rebar Grid Set
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Subbase compacted to 98% Proctor density. #4 rebar placed on 18" chairs.
                    </p>
                  </div>

                  <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
                    <span className="text-gray-400 text-xs font-bold uppercase block">
                      Scheduled Pour
                    </span>
                    <p className="text-lg font-extrabold text-white mt-1">
                      Monday, Aug 10 @ 7:00 AM
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Lara Mixer Fleet Truck #02 dispatched with 4,000 PSI Ashlar Slate mix.
                    </p>
                  </div>

                  <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
                    <span className="text-gray-400 text-xs font-bold uppercase block">
                      Contract & Warranty
                    </span>
                    <p className="text-lg font-extrabold text-emerald-400 mt-1">
                      10-Year Active Warranty
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => showToast('Downloading Contract PDF...')}
                        className="text-[10px] bg-[#2D2D2D] hover:bg-white/20 text-gray-200 px-2 py-1 rounded font-bold flex items-center gap-1"
                      >
                        <Download className="w-3 h-3 text-[#F58220]" /> Contract PDF
                      </button>
                      <button
                        onClick={() => showToast('Downloading Engineering Report...')}
                        className="text-[10px] bg-[#2D2D2D] hover:bg-white/20 text-gray-200 px-2 py-1 rounded font-bold flex items-center gap-1"
                      >
                        <Download className="w-3 h-3 text-[#F58220]" /> Eng Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Invoices Tab */}
            {activeTab === 'invoices' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase block">
                      Contract Total Amount
                    </span>
                    <span className="text-2xl font-black text-white">
                      ${portalProject.contractAmount.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase block">
                      Paid Deposit
                    </span>
                    <span className="text-2xl font-black text-emerald-400">
                      ${portalProject.paidAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {portalProject.invoices.map((inv, idx) => (
                    <div
                      key={idx}
                      className="bg-[#1A1A1A] p-3 rounded-xl border border-white/10 flex justify-between items-center text-xs"
                    >
                      <div>
                        <span className="font-extrabold text-white block">
                          {inv.invoiceNo} • {inv.date}
                        </span>
                        <span className="text-gray-400">${inv.amount.toLocaleString()}</span>
                      </div>
                      <span
                        className={`font-bold px-2.5 py-1 rounded ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photos Tab */}
            {activeTab === 'photos' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-xs font-extrabold text-white uppercase tracking-wider">
                    Job Site Photos & Inspection Records
                  </h5>
                  <button
                    onClick={handleUploadPhoto}
                    className="btn-lara-primary px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" /> Upload Site Photo
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {portalProject.sitePhotos.map((img, i) => (
                    <div
                      key={i}
                      className="h-40 rounded-xl overflow-hidden border border-white/10 bg-[#1A1A1A] relative group"
                    >
                      <img
                        src={img}
                        alt="Job Site Progress"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/80 text-[10px] text-white px-2 py-0.5 rounded">
                        Inspection Photo #{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 h-48 overflow-y-auto space-y-3">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl max-w-md text-xs ${m.sender.includes('You') ? 'ml-auto bg-[#F58220] text-white' : 'bg-[#2D2D2D] text-gray-200 border border-white/10'}`}
                    >
                      <div className="flex justify-between text-[10px] opacity-80 font-bold mb-1">
                        <span>{m.sender}</span>
                        <span>{m.time}</span>
                      </div>
                      <p className="font-medium leading-relaxed">{m.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message to Project Manager Carlos Lara..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1 bg-[#1A1A1A] border border-white/10 text-white rounded-xl p-3 text-xs focus:border-[#F58220]"
                  />
                  <button
                    type="submit"
                    className="btn-lara-primary px-6 rounded-xl text-xs uppercase font-extrabold"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
