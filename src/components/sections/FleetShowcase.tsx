import React from 'react';
import { Truck } from 'lucide-react';
import { FLEET_ITEMS } from '../../data/concreteData';

export const FleetShowcase: React.FC = () => {
  return (
    <section id="fleet" className="py-20 bg-[#1A1A1A] text-white relative border-b border-white/10 overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 bg-concrete-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F58220]/20 text-[#F58220] border border-[#F58220]/40 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            <Truck className="w-3.5 h-3.5" />
            <span>Heavy Equipment & Branded Vehicle Fleet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Built Heavy. Wrapped in Orange. Ready to Pour.
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Our signature orange and dark charcoal fleet represents professional reliability, job site safety, and high-capacity concrete output on every project.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FLEET_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-[#2D2D2D] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col group hover:border-[#F58220]/50 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-[#121212]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D] via-transparent to-black/30"></div>

                <span className="absolute top-4 left-4 bg-[#F58220] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow">
                  {item.type}
                </span>

                <div className="absolute bottom-4 left-4 right-4 bg-[#1A1A1A]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 flex justify-between items-center">
                  <span className="text-xs font-extrabold text-[#F58220] uppercase tracking-wider">
                    {item.livery}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                    {item.safetyScore}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-black text-white">{item.name}</h3>
                  <p className="text-gray-300 text-xs mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                  <div className="bg-[#1A1A1A] p-2.5 rounded-lg border border-white/5">
                    <span className="text-gray-400 text-[10px] font-bold block uppercase">Power Specs</span>
                    <span className="text-white font-bold">{item.specs}</span>
                  </div>
                  <div className="bg-[#1A1A1A] p-2.5 rounded-lg border border-white/5">
                    <span className="text-gray-400 text-[10px] font-bold block uppercase">Daily Capacity</span>
                    <span className="text-[#F58220] font-bold">{item.capacity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
