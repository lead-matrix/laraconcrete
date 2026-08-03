import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';

export const FAQSection: React.FC = () => {
  const { faqs } = useCMS();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Generate JSON-LD FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  };

  return (
    <section
      id="faq"
      className="py-20 bg-[#2D2D2D] text-white relative border-b border-white/10 overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 bg-[#F58220]/20 text-[#F58220] border border-[#F58220]/40 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Everything You Need To Know
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Honest answers regarding concrete pricing, thickness specifications, rebar
            reinforcement, curing timelines, and warranty guarantees.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-[#1A1A1A] rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-[#F58220] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-black text-[#F58220] bg-[#F58220]/10 px-2.5 py-1 rounded-lg border border-[#F58220]/30 font-mono shrink-0">
                      0{index + 1}
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#F58220] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 bg-[#161616]">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
