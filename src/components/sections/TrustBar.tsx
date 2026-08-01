import React from 'react';
import { Star, ShieldCheck, Award, ThumbsUp, Layers, CheckCircle2 } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-[#2D2D2D] text-white py-12 border-b border-white/10 relative overflow-hidden">
      {/* Background Glow Overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 pb-10 border-b border-white/10 text-center">
          <div className="flex items-center gap-2">
            <div className="flex text-[#F58220]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F58220]" />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-200">5.0 Google Verified Reviews</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#F58220]" />
            <span className="text-xs font-bold text-gray-200">BBB A+ Accredited Business</span>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#F58220]" />
            <span className="text-xs font-bold text-gray-200">Angi Super Service Winner</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#F58220]" />
            <span className="text-xs font-bold text-gray-200">ACI Certified Master Craftsmen</span>
          </div>
        </div>

        {/* Live Counters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-10 text-center">
          
          <div className="p-4 rounded-xl bg-[#1A1A1A]/80 border border-white/5 shadow-lg hover:border-[#F58220]/40 transition-colors">
            <div className="flex justify-center mb-2">
              <Layers className="w-6 h-6 text-[#F58220]" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">
              1,247<span className="text-[#F58220]">+</span>
            </div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">
              Projects Completed
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1A1A1A]/80 border border-white/5 shadow-lg hover:border-[#F58220]/40 transition-colors">
            <div className="flex justify-center mb-2">
              <Award className="w-6 h-6 text-[#F58220]" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">
              18,420<span className="text-[#F58220]"> yd³</span>
            </div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">
              Concrete Poured
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1A1A1A]/80 border border-white/5 shadow-lg hover:border-[#F58220]/40 transition-colors">
            <div className="flex justify-center mb-2">
              <ThumbsUp className="w-6 h-6 text-[#F58220]" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">
              98.8<span className="text-[#F58220]">%</span>
            </div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">
              Client Satisfaction
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1A1A1A]/80 border border-white/5 shadow-lg hover:border-[#F58220]/40 transition-colors">
            <div className="flex justify-center mb-2">
              <ShieldCheck className="w-6 h-6 text-[#F58220]" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">
              15<span className="text-[#F58220]"> Yrs</span>
            </div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">
              Family Owned
            </p>
          </div>

          <div className="col-span-2 md:col-span-1 p-4 rounded-xl bg-[#1A1A1A]/80 border border-white/5 shadow-lg hover:border-[#F58220]/40 transition-colors">
            <div className="flex justify-center mb-2">
              <CheckCircle2 className="w-6 h-6 text-[#F58220]" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">
              99.9<span className="text-[#F58220]">%</span>
            </div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">
              Safety Record
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
