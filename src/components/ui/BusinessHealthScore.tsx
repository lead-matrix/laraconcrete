import React, { useState } from 'react';
import {
  Activity,
  FileText,
  DollarSign,
  Calendar,
  Zap,
  Users,
  Shield,
  ChevronUp,
  ChevronDown,
  Info
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface HealthMetric {
  id: string;
  label: string;
  score: number;
  icon: React.ElementType;
  description: string;
  callToAction?: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
}

// ─── Health Metrics ───────────────────────────────────────────────────────────

const HEALTH_METRICS: HealthMetric[] = [
  {
    id: 'docs',
    label: 'Documentation',
    score: 100,
    icon: FileText,
    description: 'All active jobs have site photos, permits, and daily field reports filed.',
    trend: 'stable',
    trendValue: 'No gaps',
  },
  {
    id: 'cashflow',
    label: 'Cash Flow',
    score: 82,
    icon: DollarSign,
    description: '$5,430 in approved estimates still unpaid. 2 deposit reminders overdue.',
    callToAction: 'Collect 2 deposits',
    trend: 'down',
    trendValue: '-6% vs last week',
  },
  {
    id: 'scheduling',
    label: 'Scheduling',
    score: 97,
    icon: Calendar,
    description: 'All crews scheduled through next 10 days. 1 weather conflict flagged.',
    trend: 'stable',
    trendValue: '1 weather flag',
  },
  {
    id: 'automation',
    label: 'Automation',
    score: 45,
    icon: Zap,
    description: 'Only 3 of 7 available workflow automations are active. Deposit reminders and estimate follow-ups are off.',
    callToAction: 'Enable automations',
    trend: 'down',
    trendValue: 'Low coverage',
  },
  {
    id: 'customers',
    label: 'Customer Satisfaction',
    score: 91,
    icon: Users,
    description: 'All active clients have received at least one update in the past 72 hours.',
    trend: 'up',
    trendValue: '+4% vs last month',
  },
  {
    id: 'safety',
    label: 'Safety',
    score: 88,
    icon: Shield,
    description: '1 job missing pre-pour safety checklist sign-off. Elm Street.',
    callToAction: 'Complete checklist',
    trend: 'stable',
    trendValue: '1 open item',
  },
];

// ─── Score Color Helpers ──────────────────────────────────────────────────────

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-emerald-400';
  if (score >= 75) return 'text-amber-400';
  return 'text-rose-400';
}

function getScoreBg(score: number): string {
  if (score >= 90) return 'bg-emerald-500/10 border-emerald-500/30';
  if (score >= 75) return 'bg-amber-500/10 border-amber-500/30';
  return 'bg-rose-500/10 border-rose-500/30';
}

function getBarColor(score: number): string {
  if (score >= 90) return 'from-emerald-500 to-emerald-400';
  if (score >= 75) return 'from-amber-500 to-amber-400';
  return 'from-rose-500 to-rose-400';
}

// ─── Component ────────────────────────────────────────────────────────────────

export const BusinessHealthScore: React.FC = () => {
  const [expandedMetric, setExpandedMetric] = useState<string | null>('automation');

  const overallScore = Math.round(
    HEALTH_METRICS.reduce((acc, m) => acc + m.score, 0) / HEALTH_METRICS.length
  );

  return (
    <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/10 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <Activity className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Business OS Health Score</h2>
            <p className="text-xs text-slate-400">
              Real-time operational health across every system — like Windows Task Manager for your business.
            </p>
          </div>
        </div>

        {/* Overall Score Ring */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18" cy="18" r="15.9"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="3"
              />
              <circle
                cx="18" cy="18" r="15.9"
                fill="none"
                stroke={overallScore >= 90 ? '#10b981' : overallScore >= 75 ? '#f59e0b' : '#f43f5e'}
                strokeWidth="3"
                strokeDasharray={`${overallScore} ${100 - overallScore}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-sm font-extrabold font-mono ${getScoreColor(overallScore)}`}>
                {overallScore}
              </span>
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-slate-400">Overall Health</div>
            <div className={`text-sm font-bold ${getScoreColor(overallScore)}`}>
              {overallScore >= 90 ? 'Excellent' : overallScore >= 75 ? 'Good' : 'Needs Work'}
            </div>
          </div>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {HEALTH_METRICS.map((metric) => {
          const Icon = metric.icon;
          const isExpanded = expandedMetric === metric.id;

          return (
            <button
              key={metric.id}
              onClick={() => setExpandedMetric(isExpanded ? null : metric.id)}
              className={`text-left p-4 rounded-xl border transition-all space-y-3 ${
                isExpanded
                  ? 'bg-white/8 border-white/20'
                  : `bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10 ${getScoreBg(metric.score)} border-opacity-30`
              }`}
            >
              {/* Metric Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${getScoreColor(metric.score)}`} />
                  <span className="text-xs font-semibold text-slate-200">{metric.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-extrabold font-mono ${getScoreColor(metric.score)}`}>
                    {metric.score}
                  </span>
                  {isExpanded
                    ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                    : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  }
                </div>
              </div>

              {/* Score Bar */}
              <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getBarColor(metric.score)} rounded-full transition-all duration-700`}
                  style={{ width: `${metric.score}%` }}
                />
              </div>

              {/* Trend */}
              <div className={`text-[10px] font-mono ${
                metric.trend === 'up' ? 'text-emerald-400' :
                metric.trend === 'down' ? 'text-rose-400' :
                'text-slate-500'
              }`}>
                {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'} {metric.trendValue}
              </div>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <p className="text-[11px] text-slate-300 leading-relaxed">{metric.description}</p>
                  {metric.callToAction && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 rounded-lg">
                      <Info className="w-3 h-3" />
                      {metric.callToAction}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Note */}
      <p className="text-[11px] text-slate-500 font-mono text-center pt-2 border-t border-white/5">
        Score updates in real-time as jobs progress, documents are filed, and automations run.
      </p>
    </div>
  );
};
