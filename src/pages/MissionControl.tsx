import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sun,
  CloudRain,
  DollarSign,
  HardHat,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Zap,
  TrendingUp,
  Users,
  FileText,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Calendar,
  Cpu
} from 'lucide-react';
import { useTenant } from '../core/tenantContext';
import { useRBAC } from '../core/rbacContext';
import { BusinessHealthScore } from '../components/ui/BusinessHealthScore';

// ─── Types ───────────────────────────────────────────────────────────────────

interface PulseItem {
  id: string;
  type: 'revenue' | 'job' | 'crew' | 'alert' | 'approval' | 'weather' | 'payment' | 'ai';
  label: string;
  value?: string;
  urgency: 'critical' | 'warning' | 'info' | 'positive';
  action?: string;
  actionPath?: string;
}

interface TimeHorizon {
  label: string;
  revenue: string;
  jobs: number;
  estimatesOut: number;
  collectable: string;
}

// ─── Morning Briefing Data ────────────────────────────────────────────────────

const PULSE_ITEMS: PulseItem[] = [
  {
    id: 'p1',
    type: 'job',
    label: '6 active jobs on the board today',
    value: '3 crews dispatched',
    urgency: 'positive',
  },
  {
    id: 'p2',
    type: 'payment',
    label: '2 deposits pending collection',
    value: '$5,430',
    urgency: 'warning',
    action: 'Send reminders',
    actionPath: '/crm',
  },
  {
    id: 'p3',
    type: 'approval',
    label: '1 estimate expires today — Elm Street Patio',
    value: 'Sent 6 days ago',
    urgency: 'critical',
    action: 'Follow up now',
    actionPath: '/estimator',
  },
  {
    id: 'p4',
    type: 'weather',
    label: 'Rain tomorrow 9AM–2PM may affect Vance Foundation pour',
    value: '70% chance',
    urgency: 'warning',
    action: 'Reschedule crew',
    actionPath: '/jobs',
  },
  {
    id: 'p5',
    type: 'alert',
    label: 'Crew 2 is 14% over material budget on Elm Street',
    value: '+$1,840 over',
    urgency: 'critical',
    action: 'Review job costs',
    actionPath: '/jobs',
  },
  {
    id: 'p6',
    type: 'ai',
    label: 'Prevented a $1,870 underpriced quote on Lincoln Ave bid',
    value: 'Margin lock triggered',
    urgency: 'positive',
  },
  {
    id: 'p7',
    type: 'revenue',
    label: 'Estimated profit this week',
    value: '$18,420',
    urgency: 'positive',
  },
];

const TIME_HORIZONS: TimeHorizon[] = [
  { label: 'Today', revenue: '$12,400', jobs: 6, estimatesOut: 3, collectable: '$5,430' },
  { label: 'This Week', revenue: '$48,200', jobs: 18, estimatesOut: 7, collectable: '$18,900' },
  { label: 'Next 30 Days', revenue: '$184,500', jobs: 42, estimatesOut: 14, collectable: '$67,000' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const urgencyConfig = {
  critical: {
    bg: 'bg-rose-500/10 border-rose-500/30',
    dot: 'bg-rose-400',
    text: 'text-rose-300',
    icon: AlertTriangle,
    iconColor: 'text-rose-400',
  },
  warning: {
    bg: 'bg-amber-500/10 border-amber-500/30',
    dot: 'bg-amber-400',
    text: 'text-amber-300',
    icon: Clock,
    iconColor: 'text-amber-400',
  },
  info: {
    bg: 'bg-blue-500/10 border-blue-500/30',
    dot: 'bg-blue-400',
    text: 'text-blue-300',
    icon: Bell,
    iconColor: 'text-blue-400',
  },
  positive: {
    bg: 'bg-emerald-500/10 border-emerald-500/30',
    dot: 'bg-emerald-400',
    text: 'text-emerald-300',
    icon: CheckCircle2,
    iconColor: 'text-emerald-400',
  },
};

const typeIcons: Record<PulseItem['type'], React.ElementType> = {
  revenue: DollarSign,
  job: HardHat,
  crew: Users,
  alert: AlertTriangle,
  approval: FileText,
  weather: CloudRain,
  payment: DollarSign,
  ai: Zap,
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const MissionControl: React.FC = () => {
  const navigate = useNavigate();
  const { currentTenant } = useTenant();
  const { activeRole } = useRBAC();
  const [greeting, setGreeting] = useState('Good morning');
  const [activeHorizon, setActiveHorizon] = useState(0);
  const [showHealth, setShowHealth] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const horizon = TIME_HORIZONS[activeHorizon];
  const criticalItems = PULSE_ITEMS.filter((p) => p.urgency === 'critical');

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* ── Business Pulse™ Morning Briefing Card ── */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900 p-6 md:p-8">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-40" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              <span className="text-slate-600">•</span>
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>{currentTenant.name}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {greeting}, Carlos.
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Here is everything you need to run today. {criticalItems.length > 0 && (
                <span className="text-rose-400 font-semibold">
                  {criticalItems.length} issue{criticalItems.length > 1 ? 's' : ''} need your attention right now.
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHealth(!showHealth)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-semibold text-slate-200"
            >
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Business Health Score</span>
            </button>
            <div className="px-4 py-2.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-mono font-bold">
              {activeRole}
            </div>
          </div>
        </div>

        {/* Business Pulse™ Items */}
        <div className="relative z-10 mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {PULSE_ITEMS.map((item) => {
            const cfg = urgencyConfig[item.urgency];
            const TypeIcon = typeIcons[item.type];
            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border ${cfg.bg} flex items-start justify-between gap-3 group`}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className={`p-1.5 rounded-lg bg-white/5 shrink-0 mt-0.5`}>
                    <TypeIcon className={`w-3.5 h-3.5 ${cfg.iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-200 leading-snug">{item.label}</p>
                    {item.value && (
                      <p className={`text-xs font-mono font-bold mt-0.5 ${cfg.text}`}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
                {item.action && item.actionPath && (
                  <button
                    onClick={() => navigate(item.actionPath!)}
                    className={`text-[10px] font-semibold ${cfg.text} hover:text-white flex items-center gap-1 shrink-0 mt-0.5 whitespace-nowrap`}
                  >
                    <span>{item.action}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Business OS Health Score (expandable) ── */}
      {showHealth && <BusinessHealthScore />}

      {/* ── Time Horizon Switcher ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
          {TIME_HORIZONS.map((h, i) => (
            <button
              key={h.label}
              onClick={() => setActiveHorizon(i)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeHorizon === i
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {h.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Revenue',
              value: horizon.revenue,
              icon: TrendingUp,
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10 border-emerald-500/20',
              trend: '+18.4%',
              positive: true,
            },
            {
              label: 'Active Jobs',
              value: `${horizon.jobs} jobs`,
              icon: HardHat,
              color: 'text-amber-400',
              bg: 'bg-amber-500/10 border-amber-500/20',
              trend: '3 crews out',
              positive: true,
            },
            {
              label: 'Estimates Sent',
              value: `${horizon.estimatesOut} open`,
              icon: FileText,
              color: 'text-blue-400',
              bg: 'bg-blue-500/10 border-blue-500/20',
              trend: '1 expiring',
              positive: false,
            },
            {
              label: 'Collectable',
              value: horizon.collectable,
              icon: DollarSign,
              color: 'text-indigo-400',
              bg: 'bg-indigo-500/10 border-indigo-500/20',
              trend: 'Pending deposits',
              positive: true,
            },
          ].map((metric) => {
            const Icon = metric.icon;
            const TrendIcon = metric.positive ? ArrowUpRight : ArrowDownRight;
            return (
              <div
                key={metric.label}
                className="p-5 rounded-2xl bg-[#0f172a] border border-white/10 hover:border-white/20 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <div className={`p-2 rounded-xl border ${metric.bg}`}>
                    <Icon className={`w-4 h-4 ${metric.color}`} />
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white font-mono tracking-tight">
                    {metric.value}
                  </div>
                  <div className={`text-[11px] font-mono flex items-center gap-1 mt-1 ${metric.positive ? 'text-emerald-400' : 'text-amber-400'}`}>
                    <TrendIcon className="w-3 h-3" />
                    <span>{metric.trend}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Main Operations Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left 2/3: What's Happening Right Now */}
        <div className="lg:col-span-2 space-y-5">

          {/* Critical Issues */}
          {criticalItems.length > 0 && (
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
              <div className="flex items-center gap-2 border-b border-rose-500/20 pb-3">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <h3 className="text-sm font-bold text-white">Needs Immediate Attention</h3>
                <span className="ml-auto text-xs font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                  {criticalItems.length} critical
                </span>
              </div>
              {criticalItems.map((item) => {
                const TypeIcon = typeIcons[item.type];
                return (
                  <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <TypeIcon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <div>
                        <span className="text-slate-200 font-medium">{item.label}</span>
                        {item.value && (
                          <span className="text-rose-400 font-mono font-bold ml-2">{item.value}</span>
                        )}
                      </div>
                    </div>
                    {item.action && item.actionPath && (
                      <button
                        onClick={() => navigate(item.actionPath!)}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-[10px] font-bold hover:bg-rose-500 transition-colors whitespace-nowrap"
                      >
                        {item.action} →
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Today's Field Operations */}
          <div className="p-5 rounded-2xl bg-[#0f172a] border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HardHat className="w-4 h-4 text-amber-400" /> Today's Jobs
              </h3>
              <button
                onClick={() => navigate('/jobs')}
                className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                Full dispatch board <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { id: 'JOB-8823', title: 'Westside Logistics Apron', crew: 'Crew Charlie', progress: 90, status: 'Inspection', risk: false },
                { id: 'JOB-8821', title: 'Vance Foundation (rain risk)', crew: 'Crew Alpha', progress: 65, status: 'In Progress', risk: true },
                { id: 'JOB-8822', title: 'Pineview Estate Patio', crew: 'Crew Bravo', progress: 30, status: 'Scheduled', risk: false },
              ].map((job) => (
                <div key={job.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {job.risk && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      <span className="text-xs font-semibold text-slate-100 truncate">{job.title}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[10px] font-mono text-slate-400">{job.id}</span>
                      <span className="text-[10px] text-slate-500">•</span>
                      <span className="text-[10px] text-slate-400">{job.crew}</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right space-y-1.5">
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                      job.status === 'Inspection'
                        ? 'bg-emerald-500/10 text-emerald-300'
                        : job.status === 'In Progress'
                        ? 'bg-blue-500/10 text-blue-300'
                        : 'bg-slate-500/10 text-slate-300'
                    }`}>
                      {job.status}
                    </span>
                    <div className="w-24">
                      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 text-right mt-0.5">{job.progress}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1/3: AI Decisions + Quick Actions */}
        <div className="space-y-5">

          {/* AI Decisions Panel (outcomes not features) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 space-y-4">
            <div className="flex items-center gap-2 border-b border-indigo-500/20 pb-3">
              <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
              <h3 className="text-sm font-bold text-white">Decisions Made Today</h3>
            </div>
            <div className="space-y-3 text-xs">
              {[
                { outcome: 'Prevented a $1,870 underpriced quote', detail: 'Lincoln Ave bid — margin lock triggered at 28%', positive: true },
                { outcome: 'Found $5,430 in uncollected deposits', detail: '2 customers approved estimates 3+ days ago', positive: true },
                { outcome: "Rain risk flagged for tomorrow's pour", detail: 'Vance Foundation — 70% precipitation window', positive: false },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <div className={`font-semibold ${item.positive ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {item.positive ? '✓' : '!'} {item.outcome}
                  </div>
                  <div className="text-slate-400 leading-relaxed">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-5 rounded-2xl bg-[#0f172a] border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" /> Quick Actions
            </h3>
            {[
              { label: 'Create new estimate', path: '/estimator', color: 'text-blue-400' },
              { label: 'Log a new lead', path: '/crm', color: 'text-emerald-400' },
              { label: 'Dispatch crew to job', path: '/jobs', color: 'text-amber-400' },
              { label: 'Send follow-up to customer', path: '/portal', color: 'text-indigo-400' },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all flex items-center justify-between group text-xs"
              >
                <span className={`font-medium ${action.color}`}>{action.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
