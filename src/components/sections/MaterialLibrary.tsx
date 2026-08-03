import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { MATERIAL_ITEMS } from '../../data/concreteData';

export const MaterialLibrary: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'PSI Mix', 'Reinforcement', 'Stamp Pattern'];
  const filteredMaterials =
    selectedCat === 'All'
      ? MATERIAL_ITEMS
      : MATERIAL_ITEMS.filter((m) => m.category === selectedCat);

  return (
    <section
      id="materials"
      className="py-20 bg-[#1A1A1A] text-white relative border-b border-white/10 overflow-hidden"
    >
      {/* Texture */}
      <div className="absolute inset-0 bg-concrete-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F58220]/20 text-[#F58220] border border-[#F58220]/40 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Material & Finish Library</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Engineered High-PSI Mixes & Stamp Finishes
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Compare concrete compressive strengths, steel rebar grades, fiber mesh matrices, and
            architectural stamp patterns before you pour.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCat === cat
                    ? 'bg-[#F58220] text-white shadow-lg shadow-[#F58220]/30 scale-105'
                    : 'bg-[#2D2D2D] text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Material Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMaterials.map((mat) => (
            <div
              key={mat.id}
              className="bg-[#2D2D2D] rounded-2xl border border-white/10 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#F58220]/50 transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden bg-[#121212]">
                <img
                  src={mat.image}
                  alt={mat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#F58220] text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                  {mat.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-black/80 text-emerald-400 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-500/30">
                  {mat.durabilityYears}+ Year Durability
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-black text-white">{mat.name}</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{mat.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                  <div className="bg-[#1A1A1A] p-2 rounded-lg">
                    <span className="text-gray-400 text-[9px] font-bold block uppercase">
                      Engineering Specs
                    </span>
                    <span className="text-gray-200 font-medium">{mat.specs}</span>
                  </div>
                  <div className="bg-[#1A1A1A] p-2 rounded-lg">
                    <span className="text-gray-400 text-[9px] font-bold block uppercase">
                      Recommended Application
                    </span>
                    <span className="text-[#F58220] font-bold">{mat.recommendedUse}</span>
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
