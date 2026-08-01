import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#F6F6F6] text-[#2D2D2D] relative border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Image Grid */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 bg-[#2D2D2D]">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80"
                alt="Lara Concrete LLC Crew & Branded Fleet"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D] via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-[#1A1A1A]/95 text-white p-4 rounded-xl border border-white/20">
                <div className="flex items-center gap-2 text-[#F58220] font-extrabold text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>FAMILY OWNED & OPERATED SINCE 2011</span>
                </div>
                <p className="text-xs text-gray-300 mt-1">Founder Carlos Lara with senior finishing crew on site.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-md">
                <span className="text-2xl font-black text-[#F58220]">15+ Years</span>
                <p className="text-xs text-gray-600 font-bold uppercase mt-1">Concrete Mastery</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-md">
                <span className="text-2xl font-black text-[#2D2D2D]">100% OSHA</span>
                <p className="text-xs text-gray-600 font-bold uppercase mt-1">Safety Certified</p>
              </div>
            </div>
          </div>

          {/* Right Column Story */}
          <div className="lg:col-span-6 space-y-6">
            <span className="bg-[#F58220]/15 text-[#F58220] border border-[#F58220]/30 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
              Our Story & Core Values
            </span>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#2D2D2D]">
              Built on Honesty, Precision, and Family Pride
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Lara Concrete LLC was founded with a simple mission: bring uncompromising engineering standards, honest pricing, and high-end aesthetics to concrete construction. What started with one work truck has grown into an industry-leading orange fleet serving thousands of homeowners, commercial developers, and municipal projects.
            </p>

            <div className="space-y-3 pt-2 text-xs text-gray-700">
              <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2D2D2D] block">Uncompromising Structural Integrity:</strong>
                  We use Grade 60 rebar chairs, 4,000+ PSI engineered concrete, and laser screed transit leveling on every single slab.
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2D2D2D] block">Clean Job Site & Respect:</strong>
                  We treat your home like our own. All lawn edges protected, curbs washed, and debris hauled off.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
