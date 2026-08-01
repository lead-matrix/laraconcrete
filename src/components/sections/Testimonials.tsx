import React, { useState } from 'react';
import { Star, ShieldCheck, Quote, Play, X } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const reviews = [
    {
      author: 'Robert & Elena Vance',
      location: 'Wichita, KS (Eastborough)',
      rating: 5,
      date: 'July 2026',
      project: '2,800 Sq Ft Stamped Driveway',
      text: 'Lara Concrete brought out their signature orange fleet and poured our 2,800 sq ft ashlar slate stamped driveway in 4 days. Zero mess left on our lawn. Absolute master craftsmen!',
      photo: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=400&q=80'
    },
    {
      author: 'Marcus Sterling',
      location: 'Andover, KS',
      rating: 5,
      date: 'June 2026',
      project: 'Wood Grain Stamped Patio',
      text: 'The wood-plank stamped patio looks like real hard timber but will last 50 years without rot. Carlos and his crew were punctual, polite, and extremely clean.',
      photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80'
    },
    {
      author: 'Apex Logistics Operations',
      location: 'Derby Industrial Park, KS',
      rating: 5,
      date: 'May 2026',
      project: '8,500 Sq Ft Commercial Loading Dock',
      text: 'Needed 8,500 sq ft poured for semi trucks. Lara Concrete passed all 5,000 PSI compression tests with flying colors. Zero downtime on our schedule.',
      photo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-[#2D2D2D] text-white relative border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F58220]/20 text-[#F58220] border border-[#F58220]/40 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            <Star className="w-3.5 h-3.5 fill-[#F58220]" />
            <span>Verified 5-Star Reviews & Video Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Hundreds of Satisfied Homeowners & Builders
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Read real customer feedback verified by Google & Angi.
          </p>
        </div>

        {/* Video Testimonial Preview Banner */}
        <div className="mb-12 bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setVideoModalOpen(true)}
              className="w-16 h-16 rounded-full bg-[#F58220] hover:bg-[#FF8E2B] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform shrink-0"
            >
              <Play className="w-6 h-6 fill-white ml-1" />
            </button>
            <div>
              <span className="text-[10px] bg-red-500/20 text-red-400 font-extrabold px-2 py-0.5 rounded border border-red-500/30 uppercase tracking-widest">
                WATCH VIDEO TESTIMONIAL
              </span>
              <h3 className="text-lg font-black text-white mt-1">Robert Vance's 2,800 Sq Ft Stamped Driveway Tour</h3>
              <p className="text-xs text-gray-400">See the step-by-step pour and laser screed process in 4K resolution.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs bg-[#2D2D2D] px-4 py-2 rounded-xl border border-white/10 text-gray-200">
            <ShieldCheck className="w-4 h-4 text-[#F58220]" />
            <span>Google Verified Review • 5.0 Rating</span>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col justify-between space-y-4 hover:border-[#F58220]/50 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex text-[#F58220]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F58220]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold bg-[#2D2D2D] px-2 py-0.5 rounded">
                    {rev.date}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-[#F58220]/40 mb-2" />

                <p className="text-xs text-gray-200 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={rev.photo}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#F58220]"
                />
                <div>
                  <h4 className="font-extrabold text-xs text-white">{rev.author}</h4>
                  <span className="text-[10px] text-gray-400 block">{rev.location}</span>
                  <span className="text-[10px] text-[#F58220] font-bold">{rev.project}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-white/20 rounded-2xl max-w-3xl w-full p-6 relative">
            <button onClick={() => setVideoModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-black text-[#F58220] mb-4">Video Case Study: 2,800 Sq Ft Stamped Slate Driveway</h3>
            <div className="h-80 bg-[#121212] rounded-xl flex items-center justify-center text-xs text-gray-400 border border-white/10">
              <div className="text-center space-y-2">
                <Play className="w-12 h-12 text-[#F58220] mx-auto animate-pulse" />
                <p>[Video Player Simulation: 4K Drone Footage & Laser Pour Walkthrough]</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
