import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How much does a concrete driveway cost per square foot in 2026?',
      a: 'Standard 4,000 PSI broom-finish concrete driveways range from $11.50 to $13.50 per square foot installed. Decorative stamped concrete driveways range from $14.50 to $18.50 per square foot, including #4 rebar reinforcement on 18-inch centers and site prep.'
    },
    {
      q: 'Why does Lara Concrete LLC use 4,000 PSI concrete instead of 3,000 PSI?',
      a: '3,000 PSI concrete is suitable for indoor house footings, but it lacks the compressive density to survive heavy pickup trucks and freeze-thaw winter cycles. We pour a minimum of 4,000+ PSI with fiber mesh matrix for superior longevity.'
    },
    {
      q: 'How long must I wait before driving a vehicle on my new concrete driveway?',
      a: 'You can walk on the slab after 24 hours. Light passenger vehicles (sedans) can park on the slab after 7 days (70% strength). Heavy trucks and RVs should wait the full 28 days for 100% cure capacity.'
    },
    {
      q: 'What is the difference between Rebar Grid and Wire Mesh?',
      a: 'Wire mesh often gets stepped on during the pour and ends up sitting on the dirt beneath the slab—rendering it useless. We insist on #4 Grade 60 Rebar (1/2" steel) tied on 18-inch centers and supported by concrete chairs to ensure true structural reinforcement.'
    },
    {
      q: 'Do you handle municipal building permits and utility locates?',
      a: 'Yes! Lara Concrete LLC handles all municipal building permits, city ROW (right-of-way) inspections, and 811 utility locate calls before any equipment touches your property.'
    },
    {
      q: 'Does stamped concrete get slippery when wet?',
      a: 'We mix micronized anti-slip polymer grip additives directly into our clear acrylic topcoat sealer, providing exceptional traction for pool decks, walkways, and wet driveways.'
    },
    {
      q: 'What is covered under Lara Concrete\'s 10-Year Structural Warranty?',
      a: 'Our written warranty covers major structural cracking (>3/16"), subbase settlement, freeze-thaw spalling, and surface scaling. We repair or re-pour non-conforming slabs at no cost to you.'
    },
    {
      q: 'How do control joints prevent cracking in concrete slabs?',
      a: 'Concrete shrinks slightly as it cures. We saw-cut control joints at precise 10-to-12-foot intervals to create engineered weakness lines where microscopic stress relieves naturally—keeping the visible surface pristine.'
    },
    {
      q: 'Can old cracked concrete be resurfaced instead of completely demolished?',
      a: 'If the underlying slab is structurally sound without deep settling, we can apply a polymer-modified engineered overlay at roughly half the cost of full replacement.'
    },
    {
      q: 'How do I maintain my stamped concrete patio?',
      a: 'Rinse off dirt periodically with a garden hose and re-apply a protective silane/acrylic sealer every 3 to 4 years to maintain vibrant color depth and freeze protection.'
    }
  ];

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
    <section id="faqs" className="py-20 bg-[#F6F6F6] text-[#2D2D2D] relative border-b border-gray-300">
      
      {/* Inject FAQ Schema in head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F58220]/15 text-[#F58220] border border-[#F58220]/30 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>20 SEO-Rich Concrete Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#2D2D2D]">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Have questions about cure times, rebar specs, or permits? Explore answers from our master concrete engineers.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-extrabold text-sm sm:text-base text-[#2D2D2D]">
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'bg-[#F58220] text-white rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    {faq.a}
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
