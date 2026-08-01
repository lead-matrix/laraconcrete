import React, { useState } from 'react';
import { DollarSign, Calculator } from 'lucide-react';

export const RoiCalc: React.FC = () => {
  const [traffic, setTraffic] = useState(2000);
  const [leads, setLeads] = useState(100);
  const [bookingRate, setBookingRate] = useState(25); // 25%
  const [jobValue, setJobValue] = useState(3000); // $3000 avg job value

  // Math models
  const currentBookings = leads * (bookingRate / 100);
  const currentRevenue = currentBookings * jobValue;

  // New pipeline results
  // Speed reduces bounce rate => increases lead rate by 15%
  const newLeads = Math.round(leads * 1.15);
  // Speed-to-lead inside 45s increases booking conversion rate by 12%
  const newBookingRate = Math.min(95, bookingRate + 12);
  const newBookings = newLeads * (newBookingRate / 100);
  const newRevenue = newBookings * jobValue;

  const monthlyUplift = newRevenue - currentRevenue;
  const yearlyUplift = monthlyUplift * 12;

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left Column: Sliders */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center space-x-2 text-emerald-400 mb-2">
          <Calculator className="h-5 w-5" />
          <h3 className="font-display font-bold text-lg text-white">ROI Estimator Engine</h3>
        </div>

        {/* Traffic slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-gray-400">Monthly Traffic</span>
            <span className="text-white">{traffic.toLocaleString()} visitors</span>
          </div>
          <input
            type="range"
            min="500"
            max="15000"
            step="100"
            value={traffic}
            onChange={(e) => setTraffic(Number(e.target.value))}
            className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
        </div>

        {/* Leads slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-gray-400">Monthly Inbound Leads</span>
            <span className="text-white">{leads} leads</span>
          </div>
          <input
            type="range"
            min="10"
            max="800"
            step="5"
            value={leads}
            onChange={(e) => setLeads(Number(e.target.value))}
            className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
        </div>

        {/* Booking Rate slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-gray-400">Current Booking Conversion Rate</span>
            <span className="text-white">{bookingRate}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="80"
            step="1"
            value={bookingRate}
            onChange={(e) => setBookingRate(Number(e.target.value))}
            className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
        </div>

        {/* Job Value slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-gray-400">Average Job Value</span>
            <span className="text-white">${jobValue.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="500"
            max="15000"
            step="250"
            value={jobValue}
            onChange={(e) => setJobValue(Number(e.target.value))}
            className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
        </div>
      </div>

      {/* Right Column: Outcomes display */}
      <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-[#061e16]/30 border border-emerald-500/10">
        
        {/* Math Summary */}
        <div className="space-y-6">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold mb-1">
              Estimated Monthly Revenue Uplift
            </div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl text-emerald-300 flex items-center">
              <DollarSign className="h-8 w-8 -ml-2 text-emerald-400" />
              <span>{Math.round(monthlyUplift).toLocaleString()}</span>
            </div>
          </div>

          <div className="h-px bg-emerald-500/10" />

          {/* Breakdown cards */}
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-gray-500 block mb-1">Current Revenue:</span>
              <span className="text-gray-300 font-bold">${Math.round(currentRevenue).toLocaleString()}</span>
            </div>
            <div>
              <span className="text-emerald-500 block mb-1">Optimized Revenue:</span>
              <span className="text-emerald-300 font-bold">${Math.round(newRevenue).toLocaleString()}</span>
            </div>
          </div>

          <div className="h-px bg-emerald-500/10" />

          {/* Core factors explanation */}
          <div className="space-y-2 text-[11px] text-gray-400 leading-relaxed font-normal">
            <div className="flex items-center space-x-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Speed prevents bounce, capturing +15% more leads.</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Speed-to-lead SMS increases booking rates by +12%.</span>
            </div>
          </div>
        </div>

        {/* Annual Uplift Callout */}
        <div className="mt-8 pt-4 border-t border-emerald-500/20 text-center">
          <div className="text-[10px] uppercase font-mono tracking-widest text-gray-400 font-bold mb-1">
            Calculated Annual Benefit
          </div>
          <div className="text-xl font-bold text-white font-display">
            +${Math.round(yearlyUplift).toLocaleString()}/year
          </div>
        </div>

      </div>

    </div>
  );
};
