import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';

export const FloatingBar: React.FC = () => {
  const { openEstimateModal, language, companyDetails } = useCMS();

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-[#1A1A1A]/95 backdrop-blur-md border-t border-white/15 px-3 py-2 shadow-2xl"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)' }}
      role="region"
      aria-label="Quick contact actions"
    >
      <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
        {/* Compact Phone Call Button */}
        <a
          href={`tel:${companyDetails.phone1.replace(/\D/g, '')}`}
          aria-label={`Call ${companyDetails.phone1}`}
          className="bg-[#2D2D2D] hover:bg-white/10 active:scale-95 text-white h-10 px-3 rounded-xl border border-white/10 flex items-center justify-center gap-1.5 text-xs font-bold transition-all shrink-0"
        >
          <Phone className="w-3.5 h-3.5 text-[#F58220]" aria-hidden="true" />
          <span className="hidden xs:inline">Call</span>
        </a>

        {/* Compact SMS Button */}
        <a
          href={`sms:${companyDetails.phone1.replace(/\D/g, '')}`}
          aria-label="Send an SMS text message"
          className="bg-[#2D2D2D] hover:bg-white/10 active:scale-95 text-white h-10 px-3 rounded-xl border border-white/10 flex items-center justify-center gap-1.5 text-xs font-bold transition-all shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#F58220]" aria-hidden="true" />
          <span className="hidden xs:inline">SMS</span>
        </a>

        {/* Primary CTA Button — Dominant & Sleek */}
        <button
          onClick={() => openEstimateModal()}
          aria-label="Get a free estimate"
          className="flex-1 bg-gradient-to-r from-[#F58220] to-[#E07110] active:scale-[0.98] text-white font-extrabold text-xs uppercase tracking-wider h-10 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-[#F58220]/25 transition-all"
        >
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="truncate">{language === 'ES' ? 'Cotizar Gratis' : 'Free Estimate'}</span>
        </button>
      </div>
    </div>
  );
};
