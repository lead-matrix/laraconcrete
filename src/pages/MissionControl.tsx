import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  TrendingUp,
  HardHat,
  ShieldCheck,
  Plus,
  ArrowUpRight,
  Clock,
  Users,
  ChevronRight,
  FileCheck,
  Building2
} from 'lucide-react';
import { useTenant } from '../core/tenantContext';
import { useRBAC } from '../core/rbacContext';

export const MissionControl: React.FC = () => {
  const navigate = useNavigate();
  const { currentTenant } = useTenant();
  const { activeRole } = useRBAC();

  const metrics = [
    {
      title: 'Monthly Cash Flow',
      value: '$184,500',
      change: '+18.4% vs last mo',
      isPositive: true,
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Active Sales Pipeline',
      value: '$412,000',
      change: '14 Active Deals',
      isPositive: true,
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Active Field Jobs',
      value: '8 Jobs',
      change: '3 Crews Dispatched',
      isPositive: true,
      icon: HardHat,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Avg Profit Margin',
      value: '38.4%',
      change: 'Target: 35.0%',
      isPositive: true,
      icon: ShieldCheck,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10 border-indigo-500/20'
    }
  ];

  const recentActivities = [
    {
      id: 'act-1',
      time: '10 mins ago',
      title: 'Estimate #EST-1048 Approved',
      description: 'Robert Vance approved 4,500 sq ft Commercial Slab ($48,500)',
      status: 'Approved',
      icon: FileCheck,
      color: 'text-emerald-400'
    },
    {
      id: 'act-2',
      time: '45 mins ago',
      title: 'Crew #02 Check-in',
      description: 'Marcus Brody dispatched 5 crew members to site #JOB-8821',
      status: 'Dispatched',
      icon: HardHat,
      color: 'text-amber-400'
    },
    {
      id: 'act-3',
      time: '2 hours ago',
      title: 'Deposit Received',
      description: 'Customer paid $14,550 initial deposit via Customer Portal',
      status: 'Paid',
      icon: DollarSign,
      color: 'text-blue-400'
    }
  ];

  const activeJobsList = [
    {
      id: 'JOB-8821',
      title: 'Highland Oaks Commercial Foundation',
      customer: 'Vance Cold Storage Inc',
      crew: 'Crew Alpha (Marcus Brody)',
      progress: 65,
      status: 'In Progress',
      value: '$94,000'
    },
    {
      id: 'JOB-8822',
      title: 'Pineview Estate Stamped Patio & Walkway',
      customer: 'Dr. Sarah Lin',
      crew: 'Crew Bravo (Jason Croft)',
      progress: 30,
      status: 'Scheduled',
      value: '$28,400'
    },
    {
      id: 'JOB-8823',
      title: 'Westside Logistics Heavy Duty Apron',
      customer: 'Prologis Distribution',
      crew: 'Crew Charlie (David Vance)',
      progress: 90,
      status: 'Inspection',
      value: '$145,000'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Welcome Shell */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/60 via-[#0f172a] to-indigo-950/60 border border-white/10 p-6 md:p-8">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
              <Building2 className="w-3.5 h-3.5" />
              <span>{currentTenant.name}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">{activeRole} View</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Mission Control Dashboard
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Real-time operational clarity across estimates, field dispatch, cash flow, and profit margin protection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/estimator')}
              className="btn-cos-primary px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Smart Estimate</span>
            </button>
            <button
              onClick={() => navigate('/crm')}
              className="btn-cos-secondary px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#0f172a] border border-white/10 glass-panel-hover flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{metric.title}</span>
                <div className={`p-2 rounded-xl border ${metric.bgColor}`}>
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">{metric.value}</div>
                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>{metric.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Active Field Operations & Live Audit Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Field Ops & Active Jobs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <HardHat className="w-5 h-5 text-amber-400" /> Active Job Operations
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time status of active field crews and project completion rates.
                </p>
              </div>
              <button
                onClick={() => navigate('/jobs')}
                className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>View All Jobs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {activeJobsList.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-blue-400 font-semibold">
                          {job.id}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-100">{job.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400">
                        Client: {job.customer} • Crew: {job.crew}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono font-bold text-white">{job.value}</span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {job.status}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Completion Progress</span>
                      <span>{job.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Live Activity Timeline & Profit Protection Guard */}
        <div className="space-y-6">
          {/* Profit Margin Guard Alert Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-3">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
              <h4 className="text-sm font-bold text-white">Smart Profit Margin Lock</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Contractor OS enforces a hard floor margin (35.0%) on all quotes. 0 underpriced estimates detected this month.
            </p>
            <div className="pt-2 border-t border-indigo-500/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Underpriced Risk: <strong className="text-emerald-400">0%</strong></span>
              <span>Floor Lock: <strong className="text-indigo-300">Active</strong></span>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Clock className="w-4 h-4 text-blue-400" /> Operations Audit Stream
            </h3>

            <div className="space-y-4">
              {recentActivities.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="flex gap-3 text-xs">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0 h-fit">
                      <Icon className={`w-3.5 h-3.5 ${act.color}`} />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-200">{act.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{act.time}</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">{act.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
