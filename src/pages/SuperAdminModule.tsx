import React, { useState } from 'react';
import {
  ShieldAlert,
  Building2,
  Key,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Plus,
  Activity
} from 'lucide-react';
import { useTenant } from '../core/tenantContext';
import { useRBAC } from '../core/rbacContext';

export const SuperAdminModule: React.FC = () => {
  const { availableTenants, currentTenant, updateTenantSettings, featureFlags, toggleFeatureFlag } = useTenant();
  const { activeRole } = useRBAC();

  const [auditLogs] = useState([
    {
      id: 'log-1',
      tenant: 'Apex Contracting Group',
      user: 'Carlos Mendez',
      action: 'ESTIMATE_LOCKED',
      details: 'Locked Estimate #EST-1048 ($48,500)',
      time: '12 mins ago'
    },
    {
      id: 'log-2',
      tenant: 'Vanguard Structural Solutions',
      user: 'Mahmudur R Bhuiyan (Platform Owner)',
      action: 'WHITE_LABEL_TOGGLED',
      details: 'Updated tenant attribution configuration',
      time: '1 hour ago'
    },
    {
      id: 'log-3',
      tenant: 'Titan Heavy Construction',
      user: 'Sarah Connor',
      action: 'TENANT_PROVISIONED',
      details: 'Provisioned Pro Plan workspace',
      time: '3 hours ago'
    }
  ]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Super Admin Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#0f172a] to-blue-950/60 border border-purple-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-400">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Platform Owner Control Center</span>
          </div>
          <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/30">
            Super Admin Active: {activeRole}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Multi-Tenant SaaS Administration
        </h1>
        <p className="text-xs md:text-sm text-slate-300 max-w-2xl">
          Manage contractor organization tenants, feature flags, global audit trails, and configurable white-label attribution settings.
        </p>
      </div>

      {/* Global Configurable Footer Attribution Setting */}
      <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" /> Configurable Footer Attribution
            </h3>
            <p className="text-xs text-slate-400">
              Control the visible architectural attribution banner on hosted SaaS tenants vs enterprise white-label clients.
            </p>
          </div>

          <button
            onClick={() =>
              updateTenantSettings({
                footerAttributionEnabled: !currentTenant.footerAttributionEnabled
              })
            }
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-semibold text-white"
          >
            {currentTenant.footerAttributionEnabled ? (
              <>
                <ToggleRight className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300">Attribution ENABLED</span>
              </>
            ) : (
              <>
                <ToggleLeft className="w-5 h-5 text-slate-500" />
                <span className="text-slate-400">Attribution DISABLED (White-Label)</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs space-y-2">
          <div className="text-slate-300 font-medium">Attribution Preview:</div>
          <div className="p-3 rounded-lg bg-[#06090e] border border-white/10 text-slate-300 flex items-center justify-between">
            <span className="font-mono text-slate-400">
              Designed & Architected by <strong className="text-white">Mahmudur R Bhuiyan</strong> — Architecting the Systems Behind Great Businesses.
            </span>
            <span className="text-[10px] text-blue-400 font-mono">Configurable</span>
          </div>
        </div>
      </div>

      {/* Multi-Tenant SaaS Organizations Directory */}
      <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" /> Contractor Business Tenants ({availableTenants.length})
          </h3>
          <button
            onClick={() => alert('Tenant Provisioning Wizard')}
            className="btn-cos-primary px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Provision Tenant
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableTenants.map((tenant) => (
            <div
              key={tenant.id}
              className={`p-4 rounded-xl border transition-all space-y-3 ${
                tenant.id === currentTenant.id
                  ? 'bg-blue-600/10 border-blue-500/40'
                  : 'bg-white/5 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-blue-400">{tenant.id}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {tenant.status}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{tenant.name}</h4>
                <div className="text-xs text-slate-400 font-mono">{tenant.domain}</div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Plan: <strong className="text-indigo-300">{tenant.plan}</strong></span>
                <span className="text-slate-400">
                  Attribution: <strong className={tenant.footerAttributionEnabled ? 'text-emerald-400' : 'text-slate-500'}>
                    {tenant.footerAttributionEnabled ? 'ON' : 'OFF'}
                  </strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Feature Flags */}
      <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
          <Key className="w-4 h-4 text-amber-400" /> Tenant Feature Flags & Module Toggles
        </h3>

        <div className="space-y-3">
          {featureFlags.map((flag) => (
            <div
              key={flag.id}
              className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-blue-400 font-semibold">{flag.key}</span>
                  <h4 className="font-bold text-white">{flag.name}</h4>
                </div>
                <p className="text-slate-400 mt-0.5">{flag.description}</p>
              </div>

              <button
                onClick={() => toggleFeatureFlag(flag.id)}
                className="p-1 text-slate-400 hover:text-white"
              >
                {flag.enabled ? (
                  <ToggleRight className="w-6 h-6 text-emerald-400" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-600" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Global Audit Logs */}
      <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
          <Activity className="w-4 h-4 text-purple-400" /> Cross-Tenant Security Audit Log
        </h3>

        <div className="space-y-2 text-xs">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300">
                    {log.action}
                  </span>
                  <strong className="text-white">{log.tenant}</strong>
                </div>
                <div className="text-slate-400">{log.details} • By {log.user}</div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
