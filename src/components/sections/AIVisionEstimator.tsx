import React, { useState } from 'react';
import { Sparkles, Eye, ChevronRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';

export const AIVisionEstimator: React.FC = () => {
  const { openEstimateModal, showToast } = useCMS();
  const [selectedImage, setSelectedImage] = useState<string>(
    'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80'
  );
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState({
    sqFt: 1850,
    crackingSeverity: 'Moderate Scaling & Cracks',
    slopeGrade: '2.8% Runoff Pitch',
    excavationLevel: 'Light Demolition Required',
    concreteYards: 31.4,
    psiRecommendation: '4,000 PSI Fiber Mix',
    rebarRecommendation: '#4 Rebar @ 18" O.C.',
    estimatedCost: '$21,500 - $24,000'
  });

  const samplePhotos = [
    {
      id: 1,
      title: 'Cracked Residential Driveway',
      url: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80',
      sqFt: 1850,
      cost: '$21,500 - $24,000'
    },
    {
      id: 2,
      title: 'Backyard Lawn for Stamped Patio',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      sqFt: 1200,
      cost: '$15,600 - $17,800'
    },
    {
      id: 3,
      title: 'Industrial Commercial Yard',
      url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
      sqFt: 4500,
      cost: '$54,000 - $61,000'
    }
  ];

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      showToast('AI Vision Analysis Complete! Site dimensions & material recommendations generated.');
    }, 2000);
  };

  return (
    <section id="photo-estimator" className="py-20 bg-[#2D2D2D] text-white relative border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F58220]/20 text-[#F58220] border border-[#F58220]/40 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Photo Vision Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Upload Your Site Photo & Get an Instant Diagnosis
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Our smart photo scan analyzes property photos to detect square footage, surface cracking, slope pitch, and concrete volume needs instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column - Image Scanner Display */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-[#1A1A1A] border-2 border-white/20 shadow-2xl h-80 sm:h-96">
              <img
                src={selectedImage}
                alt="Property Site for Concrete Scan"
                className="w-full h-full object-cover"
              />

              {/* Scanline Reticle Overlay when scanning */}
              {isScanning && (
                <div className="absolute inset-0 bg-black/40">
                  <div className="w-full h-1 bg-[#F58220] shadow-[0_0_15px_#F58220] absolute left-0 animate-scanline"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-[#1A1A1A]/90 text-[#F58220] font-black text-xs px-4 py-2 rounded-xl border border-[#F58220]/50 flex items-center gap-2 shadow-2xl">
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>ANALYZING PIXELS & CALCULATING REBAR NEEDS...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bounding Box HUD Overlays */}
              {!isScanning && (
                <>
                  <div className="absolute top-8 left-8 border-2 border-dashed border-[#F58220] bg-[#F58220]/20 p-2 rounded text-[10px] font-black text-white">
                    DETECTED SLAB: 1,850 SQ FT
                  </div>
                  <div className="absolute bottom-12 right-12 border-2 border-dashed border-emerald-400 bg-emerald-500/20 p-2 rounded text-[10px] font-black text-white">
                    REBAR REINFORCEMENT NEEDED
                  </div>
                </>
              )}

              {/* Scan Trigger Bar */}
              <div className="absolute bottom-3 left-3 right-3 bg-[#1A1A1A]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-200">
                  Select sample site or upload photo:
                </span>
                <button
                  onClick={handleRunScan}
                  disabled={isScanning}
                  className="btn-lara-primary px-5 py-2 rounded-lg text-xs uppercase tracking-wider font-extrabold flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isScanning ? 'Scanning...' : 'Run Photo Scan'}</span>
                </button>
              </div>
            </div>

            {/* Sample Photo Pickers */}
            <div className="grid grid-cols-3 gap-3">
              {samplePhotos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => {
                    setSelectedImage(photo.url);
                    setScanResult((prev) => ({
                      ...prev,
                      sqFt: photo.sqFt,
                      estimatedCost: photo.cost
                    }));
                  }}
                  className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === photo.url ? 'border-[#F58220] scale-105 shadow-lg' : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] font-bold text-gray-200 p-1 text-center truncate">
                    {photo.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Engineering Output */}
          <div className="lg:col-span-5 bg-[#1A1A1A] p-6 rounded-2xl border border-white/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#F58220]" />
                <h3 className="font-extrabold text-base text-white uppercase tracking-wider">
                  Site Diagnosis
                </h3>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-emerald-500/40">
                HIGH ACCURACY
              </span>
            </div>

            {/* Recommendation Quote Banner */}
            <div className="bg-[#2D2D2D] p-4 rounded-xl border-l-4 border-[#F58220] space-y-1">
              <span className="text-[10px] font-black text-[#F58220] uppercase tracking-widest">
                Lara Concrete Engineering Recommendation:
              </span>
              <p className="text-xs text-white font-bold leading-relaxed">
                "We recommend a 5-inch 4000 PSI slab reinforced with #4 rebar at 18" O.C. over 4 inches of compacted limestone gravel base."
              </p>
            </div>

            {/* Output Specs Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#2D2D2D] p-3 rounded-xl border border-white/5">
                <span className="text-gray-400 text-[10px] font-bold block uppercase">Est. Surface Area</span>
                <span className="text-base font-extrabold text-white">{scanResult.sqFt} Sq Ft</span>
              </div>
              <div className="bg-[#2D2D2D] p-3 rounded-xl border border-white/5">
                <span className="text-gray-400 text-[10px] font-bold block uppercase">Concrete Volume</span>
                <span className="text-base font-extrabold text-[#F58220]">{scanResult.concreteYards} Cu Yds</span>
              </div>
              <div className="bg-[#2D2D2D] p-3 rounded-xl border border-white/5">
                <span className="text-gray-400 text-[10px] font-bold block uppercase">Surface Condition</span>
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1 mt-1">
                  <AlertTriangle className="w-3 h-3 shrink-0" />
                  {scanResult.crackingSeverity}
                </span>
              </div>
              <div className="bg-[#2D2D2D] p-3 rounded-xl border border-white/5">
                <span className="text-gray-400 text-[10px] font-bold block uppercase">Drainage Pitch</span>
                <span className="text-xs font-bold text-gray-200 mt-1 block">{scanResult.slopeGrade}</span>
              </div>
            </div>

            {/* Estimated Price & Action */}
            <div className="pt-2">
              <div className="flex justify-between items-center bg-[#2D2D2D] p-3.5 rounded-xl border border-white/10 mb-4">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Estimated Project Range</span>
                  <span className="text-2xl font-black text-[#F58220]">{scanResult.estimatedCost}</span>
                </div>
                <span className="text-[10px] text-gray-400 bg-white/5 px-2.5 py-1 rounded font-semibold">Turnkey Estimate</span>
              </div>

              <button
                onClick={() => openEstimateModal(`Photo Scan Analysis (${scanResult.sqFt} sq ft)`)}
                className="w-full btn-lara-primary py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2"
              >
                <span>Send Analysis & Get Official Quote</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
