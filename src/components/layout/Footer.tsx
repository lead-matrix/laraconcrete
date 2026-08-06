import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Sparkles, Building2 } from 'lucide-react';
import { useTenant } from '../../core/tenantContext';

export const Footer: React.FC = () => {
  const { currentTenant } = useTenant();

  return (
    <footer className="w-full bg-[#06090e] border-t border-white/10 text-slate-400 py-10 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <img src="/logo.svg" alt="Contractor OS" className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                Contractor Operating System<span className="text-blue-400 font-mono text-[10px]">™</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              The essential operating system trade contractors open first every morning and leave open all day. Built for operational clarity, precision estimates, and multi-tenant security.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> Tenant Isolated
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md font-mono">
                <Lock className="w-3.5 h-3.5" /> SOC2 Compliant Schema
              </span>
            </div>
          </div>

          {/* Core Modules Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Operating Modules
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Mission Control
                </Link>
              </li>
              <li>
                <Link to="/crm" className="hover:text-blue-400 transition-colors">
                  CRM & Sales Pipeline
                </Link>
              </li>
              <li>
                <Link to="/estimator" className="hover:text-blue-400 transition-colors">
                  Smart Estimator Engine
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-blue-400 transition-colors">
                  Field Operations & Jobs
                </Link>
              </li>
              <li>
                <Link to="/portal" className="hover:text-blue-400 transition-colors">
                  Customer Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Active Tenant Context */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Tenant Environment
            </h4>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1 font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Organization:</span>
                <span className="text-blue-400 font-semibold truncate max-w-[110px]">
                  {currentTenant.name}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Plan:</span>
                <span className="text-indigo-400">{currentTenant.plan}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Domain:</span>
                <span className="text-slate-400 text-[10px]">{currentTenant.slug}.cos.io</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Attribution Section - Configurable per Platform Owner / White Label settings */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500 font-mono text-[11px]">
            © {new Date().getFullYear()} Contractor Operating System™. All rights reserved. v1.0.0
          </div>

          {/* Configurable Attribution */}
          {currentTenant.footerAttributionEnabled ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>
                Designed & Architected by{' '}
                <strong className="text-white font-semibold">Mahmudur R Bhuiyan</strong>
              </span>
              <span className="hidden lg:inline text-slate-400 text-[11px] italic">
                — Architecting the Systems Behind Great Businesses.
              </span>
            </div>
          ) : (
            <div className="text-[11px] text-slate-500 italic flex items-center gap-1 font-mono">
              <Building2 className="w-3 h-3 text-emerald-400" /> Enterprise White-Label Enabled
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
