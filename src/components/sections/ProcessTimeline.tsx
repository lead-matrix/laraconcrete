import React from 'react';
import { Calendar, Search, FileText, Clock, Hammer, CheckCircle2, ChevronRight } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';

export const ProcessTimeline: React.FC = () => {
  const { openEstimateModal } = useCMS();

  const steps = [
    {
      num: 1,
      title: 'Request Quote',
      desc: 'Submit online form or call (316) 993-0376. Takes under 60 seconds.',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      num: 2,
      title: 'Free Site Inspection',
      desc: 'Master estimator visits your property for laser transit elevation measurements.',
      icon: <Search className="w-5 h-5" />
    },
    {
      num: 3,
      title: 'Transparent Estimate',
      desc: 'Receive itemized proposal breakdown with zero hidden fees or surprise costs.',
      icon: <FileText className="w-5 h-5" />
    },
    {
      num: 4,
      title: 'Schedule & Permitting',
      desc: 'We handle municipal permits, utility line locates, and schedule pour date.',
      icon: <Clock className="w-5 h-5" />
    },
    {
      num: 5,
      title: 'Heavy Pour & Finish',
      desc: 'Orange fleet mobilizes 4,000+ PSI mix, rebar cages, and laser screed finishing.',
      icon: <Hammer className="w-5 h-5" />
    },
    {
      num: 6,
      title: 'Walkthrough & Warranty',
      desc: 'Final inspection, job site cleanup guarantee, and 10-Year Warranty certificate.',
      icon: <CheckCircle2 className="w-5 h-5" />
    }
  ];

  return (
    <section id="process" className="py-20 bg-[#2D2D2D] text-white relative border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="bg-[#F58220]/20 text-[#F58220] border border-[#F58220]/40 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
            Seamless 6-Step Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            From Initial Call to Final Walkthrough
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            We make concrete installation effortless, transparent, and completely stress-free.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/10 flex flex-col justify-between relative group hover:border-[#F58220] transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F58220] text-white flex items-center justify-center font-bold shadow-lg">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-gray-700 group-hover:text-[#F58220] transition-colors">
                    0{step.num}
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-white">{step.title}</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{step.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#F58220]">
                  <ChevronRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => openEstimateModal()}
            className="btn-lara-primary px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-extrabold inline-flex items-center gap-2"
          >
            <span>Start Step 1: Request Free Estimate</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
