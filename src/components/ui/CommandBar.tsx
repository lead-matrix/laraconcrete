import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  Users,
  Calculator,
  HardHat,
  ShieldAlert,
  UserCheck,
  Building2,
  X,
  FileText
} from 'lucide-react';
import { useTenant } from '../../core/tenantContext';
import { useRBAC } from '../../core/rbacContext';
import type { UserRole } from '../../core/types';

interface CommandBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandBar: React.FC<CommandBarProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { availableTenants, currentTenant, switchTenant } = useTenant();
  const { availableRoles, activeRole, switchRole } = useRBAC();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mainActions = [
    {
      id: 'nav-dashboard',
      label: 'Mission Control Dashboard',
      category: 'Navigation',
      icon: LayoutDashboard,
      action: () => {
        navigate('/');
        onClose();
      }
    },
    {
      id: 'nav-crm',
      label: 'CRM & Sales Pipeline',
      category: 'Navigation',
      icon: Users,
      action: () => {
        navigate('/crm');
        onClose();
      }
    },
    {
      id: 'nav-estimator',
      label: 'Smart Estimator Engine',
      category: 'Navigation',
      icon: Calculator,
      action: () => {
        navigate('/estimator');
        onClose();
      }
    },
    {
      id: 'nav-jobs',
      label: 'Field Operations & Dispatch',
      category: 'Navigation',
      icon: HardHat,
      action: () => {
        navigate('/jobs');
        onClose();
      }
    },
    {
      id: 'nav-portal',
      label: 'Customer Portal',
      category: 'Navigation',
      icon: FileText,
      action: () => {
        navigate('/portal');
        onClose();
      }
    },
    {
      id: 'nav-superadmin',
      label: 'Platform Control Center (Super Admin)',
      category: 'Navigation',
      icon: ShieldAlert,
      action: () => {
        navigate('/superadmin');
        onClose();
      }
    }
  ];

  const filteredActions = mainActions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Command Input Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-[#090d16]/80">
          <Search className="w-5 h-5 text-blue-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search (e.g. Estimator, CRM, Tenant)..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-sm font-medium focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Scroll Area */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Main Actions */}
          <div>
            <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase px-2 mb-1.5">
              Quick Navigation
            </div>
            <div className="space-y-1">
              {filteredActions.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-600/10 hover:border-blue-500/30 border border-transparent flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Jump →</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Multi-Tenant Switcher Quick Commands */}
          <div>
            <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase px-2 mb-1.5 flex items-center justify-between">
              <span>Switch Tenant Business</span>
              <span className="text-blue-400 font-mono text-[9px]">Active: {currentTenant.name}</span>
            </div>
            <div className="grid grid-cols-1 gap-1">
              {availableTenants.map((tenant) => (
                <button
                  key={tenant.id}
                  onClick={() => {
                    switchTenant(tenant.id);
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl border flex items-center justify-between transition-all text-xs font-medium ${
                    tenant.id === currentTenant.id
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                      : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{tenant.name}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 font-mono">
                    {tenant.plan}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RBAC Role Switcher Quick Commands */}
          <div>
            <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase px-2 mb-1.5 flex items-center justify-between">
              <span>Demo Role Simulator</span>
              <span className="text-indigo-400 font-mono text-[9px]">Active Role: {activeRole}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 p-1">
              {availableRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    switchRole(role as UserRole);
                    onClose();
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
                    role === activeRole
                      ? 'bg-indigo-600 text-white border-indigo-400'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <UserCheck className="w-3 h-3" />
                  <span>{role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 border-t border-white/10 bg-[#090d16]/90 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-mono">Esc</kbd> close
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-mono">Cmd+K</kbd> toggle
            </span>
          </div>
          <span className="font-mono text-blue-400">Contractor Operating System™</span>
        </div>
      </div>
    </div>
  );
};
