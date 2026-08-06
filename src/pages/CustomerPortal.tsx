import React, { useState } from 'react';
import {
  DollarSign,
  CheckCircle2,
  Building2,
  Lock
} from 'lucide-react';
import { useTenant } from '../core/tenantContext';

export const CustomerPortal: React.FC = () => {
  const { currentTenant } = useTenant();
  const [isDepositPaid, setIsDepositPaid] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Client Header */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0f172a] to-indigo-950/40 border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
            <Building2 className="w-3.5 h-3.5" />
            <span>Provided by {currentTenant.name}</span>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            Client Portal Verified
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          Client Proposal & Project Portal
        </h1>
        <p className="text-xs md:text-sm text-slate-300">
          Welcome, Robert Vance (Vance Logistics). Review your proposal, approve terms, and secure your project schedule.
        </p>
      </div>

      {/* Active Proposal Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0f172a] border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono text-blue-400">Proposal #EST-1049</span>
            <h2 className="text-lg font-bold text-white">4,500 SQ FT Commercial Foundation Slab</h2>
            <p className="text-xs text-slate-400">4,000 PSI High-Strength Ready Mix with Fiber Mesh Rebar Grid</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">Total Approved Investment</div>
            <div className="text-2xl font-extrabold text-blue-400 font-mono">$48,500.00</div>
          </div>
        </div>

        {/* Deposit Section */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" /> Initial Project Deposit (30%)
              </h3>
              <p className="text-xs text-slate-400">
                A 30% initial deposit ($14,550.00) locks materials delivery and crew mobilization on the schedule.
              </p>
            </div>
            <span className="text-xl font-bold font-mono text-emerald-400">$14,550.00</span>
          </div>

          {isDepositPaid ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Deposit Paid Successfully! Project status updated to Scheduled.</span>
            </div>
          ) : (
            <button
              onClick={() => setIsDepositPaid(true)}
              className="w-full btn-cos-primary py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" /> Simulate Secure Deposit Payment ($14,550)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
