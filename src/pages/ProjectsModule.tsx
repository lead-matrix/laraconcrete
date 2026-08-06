import React, { useState } from 'react';
import {
  HardHat,
  MapPin,
  Calendar,
  Users,
  Camera,
  Plus,
  UploadCloud
} from 'lucide-react';
import { useTenant } from '../core/tenantContext';
import type { Job } from '../core/types';

export const ProjectsModule: React.FC = () => {
  const { currentTenant } = useTenant();

  const [jobs] = useState<Job[]>([
    {
      id: 'JOB-8821',
      tenantId: currentTenant.id,
      title: 'Highland Oaks Commercial Foundation',
      customerName: 'Vance Cold Storage Inc',
      address: '4100 E 21st St, Wichita, KS',
      status: 'In Progress',
      crewLeader: 'Marcus Brody',
      crewMembersCount: 5,
      startDate: '2025-08-04',
      endDate: '2025-08-12',
      progressPct: 65
    },
    {
      id: 'JOB-8822',
      tenantId: currentTenant.id,
      title: 'Pineview Estate Stamped Patio & Walkway',
      customerName: 'Dr. Sarah Lin',
      address: '8910 E 13th St N, Andover, KS',
      status: 'Scheduled',
      crewLeader: 'Jason Croft',
      crewMembersCount: 4,
      startDate: '2025-08-10',
      endDate: '2025-08-14',
      progressPct: 30
    },
    {
      id: 'JOB-8823',
      tenantId: currentTenant.id,
      title: 'Westside Logistics Heavy Duty Apron',
      customerName: 'Prologis Distribution',
      address: '1200 K-42 Hwy, Wichita, KS',
      status: 'Inspection',
      crewLeader: 'David Vance',
      crewMembersCount: 6,
      startDate: '2025-07-29',
      endDate: '2025-08-08',
      progressPct: 90
    }
  ]);

  const [photos] = useState([
    { id: 'ph-1', title: 'Rebar Inspection & Vapor Barrier', time: 'Aug 5, 08:30 AM', author: 'Marcus Brody' },
    { id: 'ph-2', title: '4,000 PSI Pour Operation', time: 'Aug 5, 01:15 PM', author: 'Marcus Brody' },
    { id: 'ph-3', title: 'Power Trowel Finish & Curing Agent', time: 'Aug 6, 09:00 AM', author: 'Jason Croft' }
  ]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <HardHat className="w-4 h-4" />
            <span>Field Operations & Dispatch • {currentTenant.name}</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Active Jobs & Crew Dispatch</h1>
          <p className="text-xs text-slate-400">
            Dispatch crews, monitor field progress, track GPS check-ins, and manage job documentation.
          </p>
        </div>

        <button
          onClick={() => alert('New Job Dispatch modal opened')}
          className="btn-cos-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Dispatch New Job</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Active Jobs List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400" /> Dispatch Timeline
          </h3>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-5 rounded-2xl bg-[#0f172a] border border-white/10 glass-panel-hover space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-amber-400 font-bold">{job.id}</span>
                      <h4 className="text-base font-bold text-white">{job.title}</h4>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{job.address}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 self-start sm:self-auto">
                    {job.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Client</span>
                    <strong className="text-white">{job.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Crew Assigned</span>
                    <strong className="text-amber-400">{job.crewLeader} ({job.crewMembersCount} members)</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Timeline</span>
                    <span>{job.startDate} → {job.endDate}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Job Progress</span>
                    <span>{job.progressPct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${job.progressPct}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Field Photo & Document Vault */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-blue-400" /> Field Photo Vault
              </h3>
              <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono">
                <UploadCloud className="w-3.5 h-3.5" /> Upload
              </button>
            </div>

            <div className="space-y-3">
              {photos.map((ph) => (
                <div
                  key={ph.id}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between font-semibold text-slate-200">
                    <span>{ph.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{ph.time}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Users className="w-3 h-3 text-amber-400" /> Uploaded by: {ph.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
