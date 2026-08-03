import React, { useState } from 'react';
import { Phone, MapPin, Calendar, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';

export const ContactSection: React.FC = () => {
  const { addLead } = useCMS();
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Wichita',
    serviceType: 'Concrete Driveways',
    estimatedSqFt: 1200,
    notes: '',
    preferredContact: 'Call' as 'Call' | 'SMS' | 'Email'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) return;

    addLead({
      customerName: formData.customerName,
      phone: formData.phone,
      email: formData.email || 'customer@example.com',
      address: formData.address || 'Property Site',
      city: formData.city,
      serviceType: formData.serviceType,
      estimatedSqFt: Number(formData.estimatedSqFt),
      estimatedBudget: Number(formData.estimatedSqFt) * 12.5,
      preferredContact: formData.preferredContact,
      notes: formData.notes
    });

    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-[#2D2D2D] text-white relative border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F58220]/20 text-[#F58220] border border-[#F58220]/40 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            <span>Fast 15-Minute Response Time</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Request Your Free On-Site Estimate
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Ready to pour your new driveway, patio, or foundation? Fill out the form below or call
            our dispatch hotline directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-7 bg-[#1A1A1A] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F58220] text-white flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white">
                  Thank You, {formData.customerName}!
                </h3>
                <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                  Your quote request has been routed to senior estimator Carlos Lara. We will
                  contact you via <strong>{formData.preferredContact}</strong> within 15 minutes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-lara-secondary px-6 py-2.5 rounded-xl text-xs uppercase font-extrabold"
                >
                  Submit Another Estimate Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Robert Vance"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-[#2D2D2D] border border-white/10 text-white rounded-xl p-3 text-xs focus:border-[#F58220]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(316) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#2D2D2D] border border-white/10 text-white rounded-xl p-3 text-xs focus:border-[#F58220]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#2D2D2D] border border-white/10 text-white rounded-xl p-3 text-xs focus:border-[#F58220]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-300 mb-1">
                      City / Location
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#2D2D2D] border border-white/10 text-white rounded-xl p-3 text-xs font-bold focus:border-[#F58220]"
                    >
                      <option value="Wichita">Wichita, KS</option>
                      <option value="Derby">Derby, KS</option>
                      <option value="Andover">Andover, KS</option>
                      <option value="Maize">Maize, KS</option>
                      <option value="Goddard">Goddard, KS</option>
                      <option value="Bel Aire">Bel Aire, KS</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-300 mb-1">
                      Concrete Service Needed
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-[#2D2D2D] border border-white/10 text-white rounded-xl p-3 text-xs font-bold focus:border-[#F58220]"
                    >
                      <option value="Concrete Driveways">Concrete Driveway</option>
                      <option value="Patios & Outdoor Living">Stamped Patio</option>
                      <option value="Foundations & Footings">House / Garage Foundation</option>
                      <option value="Garage Slabs & Shop Floors">Garage Shop Floor</option>
                      <option value="Commercial Concrete">Commercial Slab</option>
                      <option value="Concrete Repair & Resurfacing">
                        Concrete Repair / Overlay
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-300 mb-1">
                      Est. Area (Sq Ft)
                    </label>
                    <input
                      type="number"
                      value={formData.estimatedSqFt}
                      onChange={(e) =>
                        setFormData({ ...formData, estimatedSqFt: parseInt(e.target.value) || 0 })
                      }
                      className="w-full bg-[#2D2D2D] border border-white/10 text-white rounded-xl p-3 text-xs font-bold focus:border-[#F58220]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-300 mb-1">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Call', 'SMS', 'Email'] as const).map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setFormData({ ...formData, preferredContact: method })}
                        className={`py-2 rounded-xl text-xs font-bold border ${
                          formData.preferredContact === method
                            ? 'bg-[#F58220] text-white border-[#F58220]'
                            : 'bg-[#2D2D2D] text-gray-400 border-white/10'
                        }`}
                      >
                        {method === 'Call'
                          ? 'Phone Call'
                          : method === 'SMS'
                            ? 'Text / SMS'
                            : 'Email'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-300 mb-1">
                    Project Details / Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your project, removal of old concrete, timing requirements, etc."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#2D2D2D] border border-white/10 text-white rounded-xl p-3 text-xs focus:border-[#F58220]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-lara-primary py-4 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-2xl"
                >
                  <span>Submit Free Quote Request</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-extrabold text-lg text-white">Direct Dispatch Contacts</h3>

              <div className="space-y-3 text-xs">
                <a
                  href="tel:3169930376"
                  className="flex items-center gap-3 bg-[#2D2D2D] p-3 rounded-xl border border-white/10 hover:border-[#F58220] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F58220] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold block text-[10px] uppercase">
                      Phone Line 1
                    </span>
                    <span className="text-base font-black text-white">(316) 993-0376</span>
                  </div>
                </a>

                <a
                  href="tel:3162499873"
                  className="flex items-center gap-3 bg-[#2D2D2D] p-3 rounded-xl border border-white/10 hover:border-[#F58220] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2D2D2D] text-[#F58220] border border-[#F58220]/40 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold block text-[10px] uppercase">
                      Phone Line 2
                    </span>
                    <span className="text-sm font-bold text-white">(316) 249-9873</span>
                  </div>
                </a>

                <div className="bg-[#2D2D2D] p-3 rounded-xl border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#F58220]" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold block text-[10px] uppercase">
                      Headquarters
                    </span>
                    <span className="text-xs font-bold text-white">
                      4100 E 21st St, Wichita, KS 67208
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="h-56 bg-[#1A1A1A] rounded-2xl border border-white/10 overflow-hidden relative shadow-xl">
              <iframe
                title="Lara Concrete LLC Location - 4100 E 21st St Wichita KS"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3141.263!2d-97.29!3d37.693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87bae4c0b1234567%3A0xabc123def456!2s4100+E+21st+St%2C+Wichita%2C+KS+67208!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: 'invert(0.9) hue-rotate(180deg) saturate(0.7) brightness(0.8)'
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay badge */}
              <div className="absolute top-3 left-3 bg-[#1A1A1A]/95 backdrop-blur-md border border-[#F58220]/50 px-3 py-2 rounded-xl shadow-xl pointer-events-none">
                <p className="font-extrabold text-[11px] text-white leading-tight">
                  LARA CONCRETE HQ
                </p>
                <p className="text-[10px] text-gray-400">4100 E 21st St, Wichita KS</p>
              </div>
              <a
                href="https://maps.google.com/?q=4100+E+21st+St+Wichita+KS+67208"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-[#F58220] hover:bg-[#FF8E2B] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg transition-colors"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
