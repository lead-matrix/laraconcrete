import React, { useState } from 'react';
import { Wrench, ChevronRight, RotateCcw, Download } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';
import type { CADEstimateState } from '../../types/concrete';

export const CADConcreteEstimator: React.FC = () => {
  const { openEstimateModal, showToast } = useCMS();

  const [cadState, setCadState] = useState<CADEstimateState>({
    shape: 'rectangle',
    lengthFt: 40,
    widthFt: 20,
    depthInches: 5,
    psiMix: 4000,
    reinforcement: 'rebar-18',
    finish: 'stamped',
    excavationNeeded: true,
    wasteFactorPct: 10
  });

  // Calculations
  const sqFt = cadState.lengthFt * cadState.widthFt;
  const rawCubicFeet = sqFt * (cadState.depthInches / 12);
  const rawCubicYards = rawCubicFeet / 27;
  const totalCubicYards = rawCubicYards * (1 + cadState.wasteFactorPct / 100);
  const totalBags80lb = Math.ceil(totalCubicYards * 45); // ~45 bags per cu yd

  // Rebar sticks (20ft length) formula
  const lengthRebarRuns = Math.floor(
    cadState.widthFt / (cadState.reinforcement === 'rebar-12' ? 1 : 1.5)
  );
  const widthRebarRuns = Math.floor(
    cadState.lengthFt / (cadState.reinforcement === 'rebar-12' ? 1 : 1.5)
  );
  const totalRebarFeet = lengthRebarRuns * cadState.lengthFt + widthRebarRuns * cadState.widthFt;
  const totalRebarSticks = Math.ceil(totalRebarFeet / 20);

  // Pricing math
  const baseRatePerSqFt =
    cadState.finish === 'stamped' ? 15.5 : cadState.finish === 'stained' ? 14.0 : 11.5;
  const psiMultiplier = cadState.psiMix === 5000 ? 1.15 : cadState.psiMix === 4000 ? 1.05 : 1.0;
  const excavationCost = cadState.excavationNeeded ? sqFt * 2.5 : 0;

  const estimatedTotalCost = sqFt * baseRatePerSqFt * psiMultiplier + excavationCost;

  const handleExportPDF = () => {
    showToast(
      `CAD Blueprint exported! ${sqFt} sq ft (${totalCubicYards.toFixed(1)} yd³) quote saved.`
    );
  };

  return (
    <section
      id="cad-estimator"
      className="py-20 bg-[#1A1A1A] text-white relative border-b border-white/10 overflow-hidden"
    >
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-concrete-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F58220]/20 text-[#F58220] border border-[#F58220]/40 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            <Wrench className="w-3.5 h-3.5" />
            <span>Interactive 3D Visual CAD Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Design Your Slab & Calculate Cost Instantly
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Adjust dimensions, PSI strength, rebar spacing, and stamp patterns in real time. Powered
            by ZenBid Pro\'s engineering pricing engine.
          </p>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-[#2D2D2D] p-6 rounded-2xl border border-white/10 shadow-2xl space-y-6">
            {/* Shape Picker */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-300 mb-2">
                1. Select Slab Layout Shape
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'rectangle', label: 'Driveway / Rectangle' },
                  { id: 'patio-custom', label: 'Custom Patio' },
                  { id: 'l-shape', label: 'L-Shape Slab' },
                  { id: 'circle', label: 'Circular Apron' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setCadState((prev) => ({ ...prev, shape: s.id as any }))}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all border ${
                      cadState.shape === s.id
                        ? 'bg-[#F58220] text-white border-[#F58220] shadow-md'
                        : 'bg-[#1A1A1A] text-gray-300 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders for Dimensions */}
            <div className="space-y-4 bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-300">Length (Feet):</span>
                  <span className="text-[#F58220] text-sm font-extrabold">
                    {cadState.lengthFt} ft
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="1"
                  value={cadState.lengthFt}
                  onChange={(e) => setCadState({ ...cadState, lengthFt: parseInt(e.target.value) })}
                  className="w-full accent-[#F58220] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-300">Width (Feet):</span>
                  <span className="text-[#F58220] text-sm font-extrabold">
                    {cadState.widthFt} ft
                  </span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="80"
                  step="1"
                  value={cadState.widthFt}
                  onChange={(e) => setCadState({ ...cadState, widthFt: parseInt(e.target.value) })}
                  className="w-full accent-[#F58220] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-300">Slab Depth (Inches):</span>
                  <span className="text-[#F58220] text-sm font-extrabold">
                    {cadState.depthInches}" Inches
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {[4, 5, 6, 8].map((d) => (
                    <button
                      key={d}
                      onClick={() => setCadState({ ...cadState, depthInches: d })}
                      className={`py-1 rounded text-xs font-bold border ${
                        cadState.depthInches === d
                          ? 'bg-[#F58220] text-white border-[#F58220]'
                          : 'bg-[#2D2D2D] text-gray-400 border-white/10'
                      }`}
                    >
                      {d}" {d === 4 ? '(Patio)' : d === 5 ? '(Driveway)' : '(Heavy)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* PSI Mix & Reinforcement */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-gray-300 mb-1">
                  PSI Strength
                </label>
                <select
                  value={cadState.psiMix}
                  onChange={(e) =>
                    setCadState({ ...cadState, psiMix: parseInt(e.target.value) as any })
                  }
                  className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-lg p-2 text-xs font-bold focus:border-[#F58220]"
                >
                  <option value={3000}>3000 PSI (Footings)</option>
                  <option value={4000}>4000 PSI (Driveways)</option>
                  <option value={5000}>5000 PSI (Commercial)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-gray-300 mb-1">
                  Finish Type
                </label>
                <select
                  value={cadState.finish}
                  onChange={(e) => setCadState({ ...cadState, finish: e.target.value as any })}
                  className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-lg p-2 text-xs font-bold focus:border-[#F58220]"
                >
                  <option value="broom">Standard Broom Finish</option>
                  <option value="stamped">Ashlar Stamped Pattern</option>
                  <option value="stained">Acid Stained Color</option>
                  <option value="exposed-aggregate">Exposed Aggregate</option>
                </select>
              </div>
            </div>

            {/* Reinforcement */}
            <div>
              <label className="block text-xs font-extrabold text-gray-300 mb-1">
                Steel Reinforcement
              </label>
              <select
                value={cadState.reinforcement}
                onChange={(e) => setCadState({ ...cadState, reinforcement: e.target.value as any })}
                className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-lg p-2 text-xs font-bold focus:border-[#F58220]"
              >
                <option value="rebar-18">#4 Rebar Grid @ 18" O.C. (Recommended)</option>
                <option value="rebar-12">#4 Rebar Grid @ 12" O.C. (Heavy Truck)</option>
                <option value="fiber-mesh">Synthetic Fiber Mesh Matrix</option>
              </select>
            </div>

            {/* Excavation Toggle */}
            <div className="flex items-center justify-between bg-[#1A1A1A] p-3 rounded-xl border border-white/10">
              <div>
                <span className="text-xs font-bold text-gray-200 block">
                  Demolition & Site Excavation
                </span>
                <span className="text-[10px] text-gray-400">
                  Haul off old concrete / dirt subbase grading
                </span>
              </div>
              <input
                type="checkbox"
                checked={cadState.excavationNeeded}
                onChange={(e) => setCadState({ ...cadState, excavationNeeded: e.target.checked })}
                className="w-5 h-5 accent-[#F58220] cursor-pointer"
              />
            </div>
          </div>

          {/* Canvas & Output Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual CAD Canvas Box */}
            <div className="bg-[#2D2D2D] rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#F58220] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F58220] animate-ping"></span>
                  LIVE CAD BLUEPRINT VISUALIZER
                </span>
                <button
                  onClick={() =>
                    setCadState({
                      shape: 'rectangle',
                      lengthFt: 40,
                      widthFt: 20,
                      depthInches: 5,
                      psiMix: 4000,
                      reinforcement: 'rebar-18',
                      finish: 'stamped',
                      excavationNeeded: true,
                      wasteFactorPct: 10
                    })
                  }
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Dynamic SVG CAD Blueprint Rendering */}
              <div className="h-64 sm:h-72 w-full bg-[#121212] rounded-xl border border-dashed border-[#F58220]/40 flex items-center justify-center relative p-6">
                {/* SVG Blueprint Grid Lines */}
                <svg className="w-full h-full" viewBox="0 0 400 240">
                  <defs>
                    <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="rgba(245, 130, 32, 0.15)"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="400" height="240" fill="url(#cadGrid)" />

                  {/* Dynamic Concrete Slab Rectangle */}
                  <rect
                    x="50"
                    y="30"
                    width="300"
                    height="160"
                    rx="8"
                    fill="rgba(45, 45, 45, 0.85)"
                    stroke="#F58220"
                    strokeWidth="3"
                  />

                  {/* Rebar Grid Lines Representation */}
                  <line
                    x1="50"
                    y1="70"
                    x2="350"
                    y2="70"
                    stroke="rgba(255,255,255,0.2)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="50"
                    y1="110"
                    x2="350"
                    y2="110"
                    stroke="rgba(255,255,255,0.2)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="50"
                    y1="150"
                    x2="350"
                    y2="150"
                    stroke="rgba(255,255,255,0.2)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="125"
                    y1="30"
                    x2="125"
                    y2="190"
                    stroke="rgba(255,255,255,0.2)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="200"
                    y1="30"
                    x2="200"
                    y2="190"
                    stroke="rgba(255,255,255,0.2)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="275"
                    y1="30"
                    x2="275"
                    y2="190"
                    stroke="rgba(255,255,255,0.2)"
                    strokeDasharray="4 4"
                  />

                  {/* Dimension Annotations */}
                  <text
                    x="200"
                    y="22"
                    fill="#F58220"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Length: {cadState.lengthFt} FT
                  </text>
                  <text
                    x="35"
                    y="115"
                    fill="#F58220"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                    transform="rotate(-90 35 115)"
                  >
                    Width: {cadState.widthFt} FT
                  </text>

                  {/* Center Spec Label */}
                  <text
                    x="200"
                    y="105"
                    fill="#FFFFFF"
                    fontSize="14"
                    fontWeight="black"
                    textAnchor="middle"
                  >
                    {sqFt} SQ FT • {cadState.depthInches}" DEPTH
                  </text>
                  <text x="200" y="125" fill="#8D99AE" fontSize="10" textAnchor="middle">
                    {cadState.psiMix} PSI • {cadState.finish.toUpperCase()}
                  </text>

                  {/* Corner Handles */}
                  <circle cx="50" cy="30" r="5" fill="#F58220" />
                  <circle cx="350" cy="30" r="5" fill="#F58220" />
                  <circle cx="50" cy="190" r="5" fill="#F58220" />
                  <circle cx="350" cy="190" r="5" fill="#F58220" />
                </svg>
              </div>

              {/* Engineering Metrics Output Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <div className="bg-[#1A1A1A] p-3 rounded-xl border border-white/10 text-center">
                  <span className="text-gray-400 text-[10px] uppercase font-bold">Total Area</span>
                  <p className="text-xl font-extrabold text-white">{sqFt} sq ft</p>
                </div>
                <div className="bg-[#1A1A1A] p-3 rounded-xl border border-white/10 text-center">
                  <span className="text-gray-400 text-[10px] uppercase font-bold">
                    Concrete Volume
                  </span>
                  <p className="text-xl font-extrabold text-[#F58220]">
                    {totalCubicYards.toFixed(1)} yd³
                  </p>
                  <span className="text-[9px] text-gray-500">incl. 10% waste</span>
                </div>
                <div className="bg-[#1A1A1A] p-3 rounded-xl border border-white/10 text-center">
                  <span className="text-gray-400 text-[10px] uppercase font-bold">
                    80lb Bags Equiv.
                  </span>
                  <p className="text-xl font-extrabold text-white">{totalBags80lb} bags</p>
                </div>
                <div className="bg-[#1A1A1A] p-3 rounded-xl border border-white/10 text-center">
                  <span className="text-gray-400 text-[10px] uppercase font-bold">
                    Rebar Sticks
                  </span>
                  <p className="text-xl font-extrabold text-[#F58220]">{totalRebarSticks} sticks</p>
                  <span className="text-[9px] text-gray-500">20ft #4 rebar</span>
                </div>
              </div>

              {/* Price Calculation Summary Box */}
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] p-5 rounded-xl border-2 border-[#F58220] mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <span className="text-xs uppercase font-extrabold text-[#F58220] tracking-wider block">
                    Estimated Turnkey Installed Cost Range
                  </span>
                  <div className="text-3xl font-black text-white mt-1">
                    $
                    {(estimatedTotalCost * 0.95).toLocaleString('en-US', {
                      maximumFractionDigits: 0
                    })}{' '}
                    – $
                    {(estimatedTotalCost * 1.08).toLocaleString('en-US', {
                      maximumFractionDigits: 0
                    })}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Includes 4000 PSI concrete, rebar cage, laser leveling, finish, and 10-Yr
                    Warranty.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleExportPDF}
                    className="bg-[#2D2D2D] hover:bg-white/10 text-white font-bold text-xs px-4 py-3 rounded-xl border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#F58220]" />
                    <span>Save CAD</span>
                  </button>

                  <button
                    onClick={() =>
                      openEstimateModal(
                        `CAD Blueprint: ${sqFt} sq ft (${totalCubicYards.toFixed(1)} yd³)`
                      )
                    }
                    className="btn-lara-primary px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-1.5"
                  >
                    <span>Convert to Official Quote</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
