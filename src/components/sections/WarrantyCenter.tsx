import React, { useState } from 'react';
import { Shield, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';

export const WarrantyCenter: React.FC = () => {
  const { searchWarranty, activeWarranty, showToast } = useCMS();
  const [searchInput, setSearchInput] = useState('LARA-W-2026-9812');
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchWarranty(searchInput);
  };

  const handleClaim = () => {
    setClaimSubmitted(true);
    showToast(
      'Warranty claim inspection request submitted! An inspector will visit your site within 48 hours.'
    );
  };

  return (
    <section
      id="warranty-center"
      className="py-20 bg-[#2D2D2D] text-white relative border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F58220]/20 text-[#F58220] border border-[#F58220]/40 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" />
            <span>10-Year Structural Protection Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Warranty Certificate Lookup & Claims Portal
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Every Lara Concrete pour includes a written 10-Year Structural Crack & Settlement
            Warranty. Enter your Certificate ID below to view coverage details.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="max-w-xl mx-auto mb-10">
          <form
            onSubmit={handleSearch}
            className="flex gap-2 bg-[#1A1A1A] p-2 rounded-2xl border border-white/20 shadow-2xl"
          >
            <input
              type="text"
              placeholder="Enter Warranty Certificate ID (e.g. LARA-W-2026-9812)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 bg-transparent px-4 text-xs font-bold text-white placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="btn-lara-primary px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center gap-1.5 shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Lookup</span>
            </button>
          </form>
          <p className="text-center text-[10px] text-gray-400 mt-2 font-medium">
            Sample Warranty ID:{' '}
            <code className="text-[#F58220] bg-white/5 px-1.5 py-0.5 rounded font-bold">
              LARA-W-2026-9812
            </code>
          </p>
        </div>

        {/* Active Warranty Card Display */}
        {activeWarranty ? (
          <div className="max-w-3xl mx-auto bg-[#1A1A1A] p-8 rounded-2xl border-2 border-[#F58220] shadow-2xl space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] bg-[#F58220]/20 text-[#F58220] font-black px-2.5 py-1 rounded border border-[#F58220]/40 uppercase tracking-widest">
                  OFFICIAL CERTIFICATE #{activeWarranty.warrantyId}
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {activeWarranty.customerName}
                </h3>
                <p className="text-xs text-gray-400 font-medium">
                  {activeWarranty.propertyAddress}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {activeWarranty.status} ({activeWarranty.coverageYears}-Year Structural)
                </span>
                <p className="text-[10px] text-gray-400 mt-1">
                  Completion Date: {activeWarranty.completionDate}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-extrabold text-[#F58220] text-xs uppercase tracking-wider mb-3">
                Covered Warranty Protections & Guarantees:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {activeWarranty.coverageDetails.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#2D2D2D] p-3 rounded-xl border border-white/10 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                    <span className="text-gray-200 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs text-gray-400">
                Need a free site inspection under warranty?
              </span>
              <button
                onClick={handleClaim}
                disabled={claimSubmitted}
                className="btn-lara-secondary px-5 py-2.5 rounded-xl text-xs uppercase font-extrabold flex items-center gap-1.5"
              >
                <AlertCircle className="w-4 h-4 text-[#F58220]" />
                <span>
                  {claimSubmitted ? 'Claim Inspection Scheduled' : 'Submit Warranty Claim'}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center p-8 bg-[#1A1A1A] rounded-2xl border border-white/10 text-gray-400 text-xs">
            <Shield className="w-8 h-8 text-[#F58220] mx-auto mb-2 opacity-50" />
            <p>
              Click "Lookup" above or search <code className="text-white">LARA-W-2026-9812</code> to
              test the live certificate inspector.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
