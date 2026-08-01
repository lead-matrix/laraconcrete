import React, { useState } from 'react';
import { Star, ChevronRight, Eye, X, SlidersHorizontal } from 'lucide-react';
import { PROJECT_SHOWCASE } from '../../data/concreteData';
import type { ProjectShowcaseItem } from '../../types/concrete';
import { useCMS } from '../../cms/useCMS';

export const ProjectShowcase: React.FC = () => {
  const { openEstimateModal } = useCMS();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectShowcaseItem | null>(null);
  const [beforeAfterPos, setBeforeAfterPos] = useState<number>(50); // percentage

  const filteredProjects = activeCategory === 'All'
    ? PROJECT_SHOWCASE
    : PROJECT_SHOWCASE.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-[#F6F6F6] text-[#2D2D2D] relative border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="bg-[#F58220]/15 text-[#F58220] border border-[#F58220]/30 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
            Proven Master Craftsman Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#2D2D2D]">
            Recent Concrete Transformation Projects
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Explore our verified job site portfolio. Filter by category or try our interactive Before / After slider below.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {['All', 'Driveways', 'Patios', 'Commercial', 'Foundations'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-[#F58220] text-white shadow-lg shadow-[#F58220]/30 scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Draggable Before / After Feature Showcase */}
        <div className="mb-16 bg-[#2D2D2D] rounded-2xl p-6 border border-gray-300 shadow-2xl text-white">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
            <span className="text-xs font-extrabold text-[#F58220] uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              INTERACTIVE BEFORE / AFTER SLIDER DEMO
            </span>
            <span className="text-xs text-gray-400">Drag center slider to compare transformations</span>
          </div>

          <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden select-none">
            {/* After Image (Full width background) */}
            <img
              src="https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1200&q=80"
              alt="After Stamped Concrete Driveway Pour"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 right-4 bg-[#F58220] text-white text-xs font-black px-3 py-1 rounded-full uppercase shadow">
              AFTER: 4500 PSI STAMPED SLATE
            </span>

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${beforeAfterPos}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80"
                alt="Before Old Cracked Asphalt Driveway"
                className="h-full object-cover max-w-none"
                style={{ width: '1000px' }} // fixed width for smooth slider clip
              />
              <span className="absolute top-4 left-4 bg-[#1A1A1A]/90 text-gray-200 text-xs font-black px-3 py-1 rounded-full uppercase shadow border border-white/20">
                BEFORE: CRACKED AGING ASPHALT
              </span>
            </div>

            {/* Draggable Vertical Slider Line */}
            <div
              className="absolute inset-y-0 w-1 bg-[#F58220] shadow-[0_0_15px_#F58220] cursor-ew-resize"
              style={{ left: `${beforeAfterPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#F58220] text-white flex items-center justify-center font-bold text-xs shadow-2xl border-2 border-white">
                ↔
              </div>
            </div>

            {/* Hidden Input Range for Slider Controls */}
            <input
              type="range"
              min="0"
              max="100"
              value={beforeAfterPos}
              onChange={(e) => setBeforeAfterPos(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>
        </div>

        {/* Masonry Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden bg-[#2D2D2D]">
                <img
                  src={project.afterImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D] via-transparent to-transparent opacity-80"></div>

                <span className="absolute top-4 left-4 bg-[#2D2D2D]/90 backdrop-blur-md text-[#F58220] border border-[#F58220]/40 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                  {project.category}
                </span>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <h3 className="text-lg font-black text-white">{project.title}</h3>
                    <p className="text-xs text-gray-300 font-medium">{project.location}</p>
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="bg-[#F58220] hover:bg-[#FF8E2B] text-white p-2 rounded-lg transition-colors shadow"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <span className="text-gray-500 text-[10px] font-bold uppercase block">Square Feet</span>
                    <span className="font-extrabold text-[#2D2D2D]">{project.sqFt} sq ft</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <span className="text-gray-500 text-[10px] font-bold uppercase block">PSI Strength</span>
                    <span className="font-extrabold text-[#F58220]">{project.psi} PSI</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <span className="text-gray-500 text-[10px] font-bold uppercase block">Duration</span>
                    <span className="font-extrabold text-[#2D2D2D]">{project.durationDays} Days</span>
                  </div>
                </div>

                {/* Review Snippet */}
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs italic text-gray-700">
                  <div className="flex text-[#F58220] mb-1">
                    {[...Array(project.customerReview.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#F58220]" />
                    ))}
                  </div>
                  "{project.customerReview.text.slice(0, 110)}..."
                  <span className="block font-bold not-italic text-[#2D2D2D] mt-1">— {project.customerReview.author}</span>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-bold">Cost Range: <strong className="text-[#2D2D2D]">{project.costRange}</strong></span>
                  <button
                    onClick={() => openEstimateModal(`Project Inspiration: ${project.title}`)}
                    className="btn-lara-primary px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-extrabold flex items-center gap-1"
                  >
                    <span>Get Similar Quote</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Case Study Detailed Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] text-white border border-white/20 rounded-2xl max-w-3xl w-full p-6 relative overflow-hidden shadow-2xl animate-fadeIn">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-[#2D2D2D] hover:bg-white/20 rounded-full text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-white mb-1">{selectedProject.title}</h3>
            <p className="text-xs text-gray-400 font-bold mb-4">{selectedProject.location} • Completed {selectedProject.completionDate}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="h-44 rounded-xl overflow-hidden bg-[#2D2D2D]">
                <img src={selectedProject.afterImage} alt="After" className="w-full h-full object-cover" />
              </div>
              <div className="h-44 rounded-xl overflow-hidden bg-[#2D2D2D]">
                <img src={selectedProject.beforeImage} alt="Before" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <h4 className="font-extrabold text-[#F58220] uppercase tracking-wider">Engineered Materials & Mix Specifications:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.materialsUsed.map((m, i) => (
                  <span key={i} className="bg-white/10 text-gray-200 px-3 py-1 rounded-lg border border-white/10 font-semibold">
                    {m}
                  </span>
                ))}
              </div>

              <div className="bg-[#2D2D2D] p-4 rounded-xl border border-white/10 mt-4">
                <div className="flex text-[#F58220] mb-1">
                  {[...Array(selectedProject.customerReview.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F58220]" />
                  ))}
                </div>
                <p className="text-gray-200 italic font-medium leading-relaxed">"{selectedProject.customerReview.text}"</p>
                <span className="block font-bold text-[#F58220] mt-2">— Verified Customer: {selectedProject.customerReview.author}</span>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button onClick={() => setSelectedProject(null)} className="px-4 py-2 rounded-lg bg-[#2D2D2D] text-gray-300 font-bold">
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    openEstimateModal(`Inspiration Case Study: ${title}`);
                  }}
                  className="btn-lara-primary px-6 py-2 rounded-lg text-xs uppercase font-extrabold"
                >
                  Request Similar Project Estimate
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
