import React, { useState } from 'react';
import {
  Car,
  Sun,
  Footprints,
  Building,
  Warehouse,
  Sparkles,
  Palette,
  Hammer,
  Layers,
  Building2,
  Shield,
  Truck,
  Wrench,
  Award,
  ChevronRight,
  CheckCircle2,
  X,
  Info
} from 'lucide-react';
import { useCMS } from '../../cms/useCMS';

const ICON_MAP: Record<string, React.ReactNode> = {
  Car: <Car className="w-6 h-6" />,
  Sun: <Sun className="w-6 h-6" />,
  Footprints: <Footprints className="w-6 h-6" />,
  Building: <Building className="w-6 h-6" />,
  Warehouse: <Warehouse className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Hammer: <Hammer className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Truck: <Truck className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />
};

export const ServicesSection: React.FC = () => {
  const {
    services,
    openEstimateModal,
    activeServiceDrawer,
    openServiceDrawer,
    closeServiceDrawer
  } = useCMS();
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'residential' | 'commercial' | 'decorative' | 'structural'
  >('all');

  const filteredServices =
    activeFilter === 'all' ? services : services.filter((s) => s.category === activeFilter);

  return (
    <section id="services" className="py-20 bg-[#F8FAFC] text-[#1F2937] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="bg-[#F58220]/15 text-[#F58220] border border-[#F58220]/30 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
            Full-Spectrum Concrete Contractors
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1F2937]">
            Precision Engineering for Every Pour
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            From 4,000+ PSI rebar-reinforced residential driveways to laser-screed commercial slabs,
            explore our 14 specialized concrete services.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {(['all', 'residential', 'structural', 'commercial', 'decorative'] as const).map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeFilter === filter
                      ? 'bg-[#F58220] text-white shadow-lg shadow-[#F58220]/30 scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
            >
              {/* Image & Popular Badge */}
              <div className="relative h-52 overflow-hidden bg-[#2D2D2D]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D] via-transparent to-transparent opacity-80"></div>

                {/* Popular Pill */}
                {service.popular && (
                  <span className="absolute top-3 right-3 bg-[#F58220] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
                    POPULAR CHOICE
                  </span>
                )}

                {/* Icon Box */}
                <div className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-[#F58220] text-white flex items-center justify-center shadow-lg border-2 border-white">
                  {ICON_MAP[service.iconName] || <Wrench className="w-6 h-6" />}
                </div>

                {/* Est Price Badge */}
                <div className="absolute bottom-3 right-4 bg-[#2D2D2D]/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg border border-white/20">
                  Est:{' '}
                  <span className="text-[#F58220]">${service.basePricePerSqFt.toFixed(2)}</span> /
                  sq ft
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-[#2D2D2D] group-hover:text-[#F58220] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs mt-2 leading-relaxed">{service.shortDesc}</p>

                  {/* Bullet features */}
                  <ul className="mt-4 space-y-1.5 border-t border-gray-100 pt-3">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs text-gray-700 font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F58220] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex items-center gap-2 border-t border-gray-100">
                  <button
                    onClick={() => openServiceDrawer(service)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5 text-[#F58220]" />
                    <span>View Specs</span>
                  </button>

                  <button
                    onClick={() => openEstimateModal(service.title)}
                    className="flex-1 btn-lara-primary py-2.5 rounded-lg text-xs uppercase tracking-wider font-extrabold text-center flex items-center justify-center gap-1"
                  >
                    <span>Get Quote</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Specs Drawer / Modal */}
      {activeServiceDrawer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] text-white border border-white/20 rounded-2xl max-w-2xl w-full p-6 relative overflow-hidden shadow-2xl animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => closeServiceDrawer()}
              className="absolute top-4 right-4 p-2 bg-[#2D2D2D] hover:bg-white/20 rounded-full text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#F58220] flex items-center justify-center text-white shrink-0">
                {ICON_MAP[activeServiceDrawer.iconName]}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#F58220] tracking-widest bg-[#F58220]/20 px-2 py-0.5 rounded border border-[#F58220]/30">
                  {activeServiceDrawer.category}
                </span>
                <h3 className="text-2xl font-black text-white">{activeServiceDrawer.title}</h3>
              </div>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 text-xs">
              <p className="text-gray-300 text-sm leading-relaxed">
                {activeServiceDrawer.fullDesc}
              </p>

              <div className="grid grid-cols-2 gap-3 bg-[#2D2D2D] p-4 rounded-xl border border-white/10">
                <div>
                  <span className="text-gray-400 font-bold block text-[10px] uppercase">
                    Base Estimated Cost
                  </span>
                  <span className="text-xl font-extrabold text-[#F58220]">
                    ${activeServiceDrawer.basePricePerSqFt.toFixed(2)} / sq ft
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-bold block text-[10px] uppercase">
                    Typical Slab Depth
                  </span>
                  <span className="text-xl font-extrabold text-white">
                    {activeServiceDrawer.typicalThicknessInches}" Inches
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#F58220] uppercase tracking-wider mb-2">
                  Steel & Mesh Reinforcement Options:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeServiceDrawer.rebarOptions.map((opt, i) => (
                    <span
                      key={i}
                      className="bg-white/10 text-gray-200 px-3 py-1 rounded-lg border border-white/10 font-semibold"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#F58220] uppercase tracking-wider mb-2">
                  Available Decorative Finishes:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeServiceDrawer.finishTypes.map((fin, i) => (
                    <span
                      key={i}
                      className="bg-[#F58220]/20 text-[#F58220] px-3 py-1 rounded-lg border border-[#F58220]/30 font-semibold"
                    >
                      {fin}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  onClick={() => closeServiceDrawer()}
                  className="px-4 py-2.5 rounded-lg bg-[#2D2D2D] text-gray-300 font-bold hover:text-white"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    const title = activeServiceDrawer.title;
                    closeServiceDrawer();
                    openEstimateModal(title);
                  }}
                  className="btn-lara-primary px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider font-extrabold"
                >
                  Request Quote for {activeServiceDrawer.title}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
