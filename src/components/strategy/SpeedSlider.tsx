import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Cpu } from 'lucide-react';

export const SpeedSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50); // percentage

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5 space-y-6">
      {/* Header */}
      <div>
        <h3 className="font-display font-bold text-xl text-white mb-2 flex items-center space-x-2">
          <Cpu className="h-5 w-5 text-emerald-400" />
          <span>Interactive Infrastructure Performance Slider</span>
        </h3>
        <p className="text-xs text-gray-400">
          Slide the divider left and right to compare a bulky template site vs. optimized clean code
          engines.
        </p>
      </div>

      {/* Interactive Slider Box */}
      <div className="relative h-64 rounded-2xl overflow-hidden border border-white/5 select-none bg-gray-950">
        {/* Left Side: WordPress Heavy (Underneath layer) */}
        <div className="absolute inset-0 flex flex-col items-start justify-center p-8 bg-red-950/20 text-left space-y-3">
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono font-bold uppercase">
            <ShieldAlert className="h-4 w-4" />
            <span>Legacy WordPress Template</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-display">4.9s load latency</div>
          <div className="space-y-1 font-mono text-[10px] text-gray-500">
            <div>• Lighthouse Score: 38/100</div>
            <div>• CSS render blocks: 1.4s delay</div>
            <div>• Heavy layout shift (CLS): 0.28</div>
          </div>
        </div>

        {/* Right Side: Vite React Static (Clips based on slider position) */}
        <div
          className="absolute inset-0 flex flex-col items-end justify-center p-8 bg-[#041d14] text-right space-y-3 border-l border-emerald-500/20"
          style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
        >
          <div className="flex items-center justify-end space-x-2 text-emerald-400 text-xs font-mono font-bold uppercase">
            <ShieldCheck className="h-4 w-4" />
            <span>Vite React Engine</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-display">0.8s load latency</div>
          <div className="space-y-1 font-mono text-[10px] text-emerald-500">
            <div>• Lighthouse Score: 99/100</div>
            <div>• CSS render blocks: 0s (inlined)</div>
            <div>• Zero layout shifts (CLS: 0)</div>
          </div>
        </div>

        {/* The Sliding Bar Control (invisible range input covering container) */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize z-20"
        />

        {/* Visual Line and Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-emerald-500 pointer-events-none z-10"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full border border-emerald-500 bg-black flex items-center justify-center shadow-lg">
            <span className="text-[10px] font-bold text-emerald-400">↔</span>
          </div>
        </div>
      </div>
    </div>
  );
};
