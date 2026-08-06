import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calculator,
  HardHat,
  ShieldAlert,
  Search,
  Building2,
  ChevronDown,
  Menu,
  X,
  User,
  Sparkles,
  FileText
} from 'lucide-react';
import { useTenant } from '../../core/tenantContext';
import { useRBAC } from '../../core/rbacContext';
import { CommandBar } from '../ui/CommandBar';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { currentTenant, availableTenants, switchTenant } = useTenant();
  const { activeRole, availableRoles, switchRole } = useRBAC();

  const [isTenantDropdownOpen, setIsTenantDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);

  const navItems = [
    { label: 'Mission Control', path: '/', icon: LayoutDashboard },
    { label: 'CRM & Pipeline', path: '/crm', icon: Users },
    { label: 'Smart Estimator', path: '/estimator', icon: Calculator },
    { label: 'Field Ops & Jobs', path: '/jobs', icon: HardHat },
    { label: 'Customer Portal', path: '/portal', icon: FileText },
    { label: 'Super Admin', path: '/superadmin', icon: ShieldAlert }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#090d16]/90 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Brand & Logo */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                    <img src="/logo.svg" alt="Contractor OS" className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <span className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                    Contractor OS<span className="text-[10px] text-blue-400 font-mono">TM</span>
                  </span>
                  <span className="text-[10px] text-slate-400 block -mt-1 font-medium">
                    Enterprise SaaS Platform
                  </span>
                </div>
              </Link>

              {/* Tenant Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsTenantDropdownOpen(!isTenantDropdownOpen);
                    setIsRoleDropdownOpen(false);
                  }}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-200 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  <span className="max-w-[140px] truncate">{currentTenant.name}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isTenantDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-fadeIn">
                    <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Switch Organization Tenant
                    </div>
                    <div className="space-y-1 mt-1">
                      {availableTenants.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            switchTenant(t.id);
                            setIsTenantDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                            t.id === currentTenant.id
                              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40'
                              : 'text-slate-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{t.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-400">
                            {t.plan}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Middle Nav Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                      isActive
                        ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions: Cmd+K & Role Switcher */}
            <div className="flex items-center gap-3">
              {/* Cmd+K Hotkey Trigger Button */}
              <button
                onClick={() => setIsCommandBarOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/40 text-slate-400 hover:text-white text-xs font-medium transition-all"
              >
                <Search className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-300">
                  ⌘K
                </kbd>
              </button>

              {/* RBAC Role Switcher */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsRoleDropdownOpen(!isRoleDropdownOpen);
                    setIsTenantDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 text-xs font-medium text-indigo-300 hover:bg-indigo-500/20 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline max-w-[120px] truncate">{activeRole}</span>
                  <ChevronDown className="w-3 h-3 text-indigo-400" />
                </button>

                {isRoleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-fadeIn">
                    <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Simulate User Role
                    </div>
                    <div className="space-y-1 mt-1">
                      {availableRoles.map((role) => (
                        <button
                          key={role}
                          onClick={() => {
                            switchRole(role);
                            setIsRoleDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
                            role === activeRole
                              ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
                              : 'text-slate-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <User className="w-3 h-3 text-indigo-400" />
                          <span>{role}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-white/10 bg-[#090d16] p-4 space-y-2 animate-fadeIn">
            <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Tenant: {currentTenant.name}
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-3 transition-colors ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 text-blue-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Command Palette Modal */}
      <CommandBar isOpen={isCommandBarOpen} onClose={() => setIsCommandBarOpen(false)} />
    </>
  );
};
