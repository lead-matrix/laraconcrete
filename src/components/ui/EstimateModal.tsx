import React, { useState } from 'react';
import { X, CheckCircle2, ChevronRight } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';

export const EstimateModal: React.FC = () => {
  const { isEstimateModalOpen, closeEstimateModal, selectedServiceForModal, addLead } = useCMS();
  const [step, setStep] = useState<1 | 2>(1);
  const defaultFormData = {
    name: '',
    phone: '',
    email: '',
    service: selectedServiceForModal || 'Concrete Driveways',
    address: '',
    sqFt: 1200,
    preferredContact: 'Call' as 'Call' | 'SMS' | 'Email'
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleClose = () => {
    setStep(1);
    setFormData(defaultFormData);
    closeEstimateModal();
  };

  if (!isEstimateModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    addLead({
      customerName: formData.name,
      phone: formData.phone,
      email: formData.email || 'customer@example.com',
      address: formData.address || 'Property Site',
      city: 'Wichita',
      serviceType: formData.service || 'Concrete Driveways',
      estimatedSqFt: Number(formData.sqFt),
      estimatedBudget: Number(formData.sqFt) * 12.50,
      preferredContact: formData.preferredContact,
      notes: `Modal Request: ${formData.service} (${formData.sqFt} sq ft)`
    });

    setStep(2);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#1A1A1A] text-white border-2 border-[#F58220] rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 bg-[#2D2D2D] hover:bg-white/20 rounded-full text-gray-300 hover:text-white"
          aria-label="Close estimate modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F58220] animate-ping"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F58220] bg-[#F58220]/20 px-2.5 py-1 rounded border border-[#F58220]/30">
                15-MINUTE FAST RESPONSE GUARANTEE
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">Get Your Free Concrete Estimate</h3>
              <p className="text-xs text-gray-400 mt-1">
                Zero obligation. Our senior estimator will call or text with pricing breakdown.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-gray-300 font-extrabold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robert Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#2D2D2D] border border-white/10 text-white rounded-xl p-3 focus:border-[#F58220]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-extrabold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(316) 555-0199"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#2D2D2D] border border-white/10 text-white rounded-xl p-3 focus:border-[#F58220]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-extrabold mb-1">Concrete Service</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#2D2D2D] border border-white/10 text-white rounded-xl p-3 font-bold focus:border-[#F58220]"
                  >
                    <option value="Concrete Driveways">Concrete Driveway</option>
                    <option value="Patios & Outdoor Living">Stamped Patio</option>
                    <option value="Foundations & Footings">Foundation Slab</option>
                    <option value="Garage Slabs & Shop Floors">Garage Shop Floor</option>
                    <option value="Commercial Concrete">Commercial Slab</option>
                    <option value="Concrete Repair & Resurfacing">Repair / Sealing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-extrabold mb-1">Property Address / City</label>
                <input
                  type="text"
                  placeholder="e.g. 1420 Eastborough Ln, Wichita"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#2D2D2D] border border-white/10 text-white rounded-xl p-3 focus:border-[#F58220]"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-extrabold mb-1">Preferred Contact Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Call', 'SMS', 'Email'] as const).map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setFormData({ ...formData, preferredContact: method })}
                      className={`py-2 rounded-lg font-bold border transition-colors ${
                        formData.preferredContact === method
                          ? 'bg-[#F58220] text-white border-[#F58220]'
                          : 'bg-[#2D2D2D] text-gray-400 border-white/10'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-lara-primary py-4 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 mt-4"
              >
                <span>Request Free Estimate Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F58220] text-white flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">Quote Request Received!</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              We received your request for <strong>{formData.service}</strong>. Senior estimator Carlos Lara will reach out via {formData.preferredContact} within 15 minutes.
            </p>
            <button
              onClick={handleClose}
              className="btn-lara-primary px-6 py-3 rounded-xl text-xs uppercase font-extrabold"
            >
              Done & Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
