import React, { useState } from 'react';
import { DollarSign, CheckCircle2, ChevronRight, Calculator } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';

export const FinancingSection: React.FC = () => {
  const { openEstimateModal, showToast } = useCMS();
  const [projectAmount, setProjectAmount] = useState<number>(6500);
  const [termMonths, setTermMonths] = useState<number>(48);

  // Interest rate assumption: 7.99% APR
  const monthlyInterestRate = 0.0799 / 12;
  const estimatedMonthly = Math.round(
    (projectAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termMonths)) /
      (Math.pow(1 + monthlyInterestRate, termMonths) - 1)
  );

  const handlePrequalify = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Soft pre-qualification submitted! No impact on your credit score.');
    openEstimateModal(`Financing Application: $${projectAmount.toLocaleString()} ($${estimatedMonthly}/mo)`);
  };

  return (
    <section id="financing" className="py-20 bg-[#F6F6F6] text-[#2D2D2D] relative border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F58220]/15 text-[#F58220] border border-[#F58220]/30 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Low Monthly Payment Partner Financing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#2D2D2D]">
            Flexible $0 Down Payment Options
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Don't let budget hold back your concrete upgrade. Pay for your stamped patio, driveway, or garage slab in low monthly installments.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="max-w-4xl mx-auto bg-[#2D2D2D] text-white rounded-2xl border border-gray-300 shadow-2xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Sliders */}
          <div className="space-y-6">
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#F58220]" />
              <span>Monthly Payment Estimator</span>
            </h3>

            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-gray-300">Total Project Amount:</span>
                <span className="text-[#F58220] text-lg font-black">${projectAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="2500"
                max="35000"
                step="500"
                value={projectAmount}
                onChange={(e) => setProjectAmount(parseInt(e.target.value))}
                className="w-full accent-[#F58220] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-gray-300 mb-2">Select Loan Term:</label>
              <div className="grid grid-cols-3 gap-2">
                {[24, 36, 48, 60].map((term) => (
                  <button
                    key={term}
                    onClick={() => setTermMonths(term)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                      termMonths === term
                        ? 'bg-[#F58220] text-white border-[#F58220] shadow-md'
                        : 'bg-[#1A1A1A] text-gray-400 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {term} Months
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-300 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F58220]" />
                <span>$0 Down Payment Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F58220]" />
                <span>No Soft-Pull Credit Impact for Prequalification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F58220]" />
                <span>Same-Day Approval in under 5 Minutes</span>
              </div>
            </div>
          </div>

          {/* Monthly Output & Pre-qualify */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/10 text-center space-y-4">
            <span className="text-xs uppercase font-extrabold text-[#F58220] tracking-widest block">
              Estimated Monthly Payment
            </span>
            <div className="text-5xl font-black text-white tracking-tight">
              ${estimatedMonthly}<span className="text-lg text-gray-400 font-normal">/mo</span>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              Based on ${projectAmount.toLocaleString()} loan over {termMonths} months at 7.99% APR.
            </p>

            <button
              onClick={handlePrequalify}
              className="w-full btn-lara-primary py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2"
            >
              <span>Instant Prequalify ($0 Down)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
