import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';

export const FloatingBar: React.FC = () => {
  const { openEstimateModal, language } = useCMS();

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-[#1A1A1A]/95 backdrop-blur-md border-t border-white/20 p-2.5 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-extrabold">
        <a
          href="tel:3169930376"
          className="bg-[#2D2D2D] hover:bg-white/10 text-white py-2.5 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-0.5"
        >
          <Phone className="w-4 h-4 text-[#F58220]" />
          <span>Call Now</span>
        </a>

        <a
          href="sms:3169930376"
          className="bg-[#2D2D2D] hover:bg-white/10 text-white py-2.5 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-0.5"
        >
          <MessageSquare className="w-4 h-4 text-[#F58220]" />
          <span>SMS Text</span>
        </a>

        <button
          onClick={() => openEstimateModal()}
          className="btn-lara-primary py-2.5 rounded-xl text-white flex flex-col items-center justify-center gap-0.5 uppercase tracking-wider"
        >
          <Calendar className="w-4 h-4" />
          <span>{language === 'ES' ? 'Cotizar' : 'Free Quote'}</span>
        </button>
      </div>
    </div>
  );
};
