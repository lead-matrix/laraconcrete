import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';

export const FloatingBar: React.FC = () => {
  const { openEstimateModal, language, companyDetails } = useCMS();

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-[#1A1A1A]/97 backdrop-blur-md border-t border-white/20 shadow-2xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      role="region"
      aria-label="Quick contact actions"
    >
      {/* Primary CTA — Full Width */}
      <div className="px-4 pt-3 pb-1">
        <button
          onClick={() => openEstimateModal()}
          aria-label="Get a free estimate"
          className="w-full bg-gradient-to-r from-[#F58220] to-[#E07110] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#F58220]/30 active:scale-[0.98] transition-transform"
          style={{ minHeight: '52px' }}
        >
          <Calendar className="w-4 h-4" aria-hidden="true" />
          <span>{language === 'ES' ? 'Cotizar Gratis' : 'Free Estimate'}</span>
        </button>
      </div>

      {/* Secondary CTAs — Side by Side */}
      <div className="grid grid-cols-2 gap-2 px-4 pt-1.5 pb-2">
        <a
          href={`tel:${companyDetails.phone1.replace(/\D/g, '')}`}
          aria-label={`Call ${companyDetails.phone1}`}
          className="bg-[#2D2D2D] hover:bg-white/10 active:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
          style={{ minHeight: '40px' }}
        >
          <Phone className="w-3.5 h-3.5 text-[#F58220]" aria-hidden="true" />
          <span>Call Now</span>
        </a>

        <a
          href={`sms:${companyDetails.phone1.replace(/\D/g, '')}`}
          aria-label="Send an SMS text message"
          className="bg-[#2D2D2D] hover:bg-white/10 active:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
          style={{ minHeight: '40px' }}
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#F58220]" aria-hidden="true" />
          <span>SMS Text</span>
        </a>
      </div>
    </div>
  );
};
