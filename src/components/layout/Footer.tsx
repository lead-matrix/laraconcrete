import React, { useState } from 'react';
import { Phone, Mail, MapPin, Shield, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { openEstimateModal } = useCMS();
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const [robotsOpen, setRobotsOpen] = useState(false);

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Subtle concrete texture overlay */}
      <div className="absolute inset-0 bg-concrete-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F58220] to-[#E07110] flex items-center justify-center text-white font-black text-xl shadow-md">
                  ZB
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xl tracking-tight text-white leading-none">
                      ZenBid<span className="text-[#F58220]">.Pro</span>
                    </span>
                    <span className="text-[9px] bg-[#F58220]/20 text-[#F58220] border border-[#F58220]/40 font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                      FOR OWNERSHIP
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                    Turnkey Estimating SaaS Platform
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              A complete, independent, enterprise-grade SaaS estimating platform for concrete
              contractors & flatwork specialists. Features 3D Visual CAD calculations, AI photo
              vision, client portal, admin CMS, and local SEO city engine. Available for immediate
              turnkey acquisition & ownership.
            </p>

            <div className="flex items-center gap-4 pt-2 text-xs text-gray-300">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-[#F58220]" />
                <span>Production Ready SaaS</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-[#F58220]" />
                <span>100% Test Coverage</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openEstimateModal()}
                className="btn-lara-primary px-6 py-3 rounded-lg text-xs uppercase tracking-wider font-bold"
              >
                Request Free Estimate
              </button>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider border-l-4 border-[#F58220] pl-2.5 mb-4">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a
                  href="#services"
                  className="hover:text-[#F58220] transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#F58220]" /> Concrete Driveways
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#F58220] transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#F58220]" /> Stamped Concrete Patios
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#F58220] transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#F58220]" /> Foundations & Footings
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#F58220] transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#F58220]" /> Garage Slabs & Shop Floors
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#F58220] transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#F58220]" /> Commercial Loading Docks
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#F58220] transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#F58220]" /> Retaining Walls
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#F58220] transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#F58220]" /> Concrete Repair & Sealing
                </a>
              </li>
            </ul>
          </div>

          {/* Enterprise Features */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider border-l-4 border-[#F58220] pl-2.5 mb-4">
              Enterprise Tools
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a
                  href="#cad-estimator"
                  className="hover:text-[#F58220] transition-colors flex items-center gap-1 font-semibold text-gray-200"
                >
                  <ChevronRight className="w-3 h-3 text-[#F58220]" /> CAD Concrete Estimator
                </a>
              </li>
              <li>
                <a
                  href="#photo-estimator"
                  className="hover:text-[#F58220] transition-colors flex items-center gap-1 font-semibold text-gray-200"
                >
                  <ChevronRight className="w-3 h-3 text-[#F58220]" /> Photo Vision Estimator
                </a>
              </li>
              <li>
                <a
                  href="#customer-portal"
                  className="hover:text-[#F58220] transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#F58220]" /> Live Customer Portal
                </a>
              </li>
              <li>
                <a
                  href="#fleet"
                  className="hover:text-[#F58220] transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#F58220]" /> Branded Fleet Showcase
                </a>
              </li>
              <li>
                <a
                  href="#warranty-center"
                  className="hover:text-[#F58220] transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#F58220]" /> Warranty Center & Claims
                </a>
              </li>
              <li>
                <a
                  href="#financing"
                  className="hover:text-[#F58220] transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#F58220]" /> Monthly Financing ($0 Down)
                </a>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="hover:text-[#F58220] transition-colors flex items-center gap-1 text-[#F58220] font-bold"
                >
                  <ChevronRight className="w-3 h-3 text-[#F58220]" /> CRM Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider border-l-4 border-[#F58220] pl-2.5 mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                <span>Headquarters: 4100 E 21st St, Wichita, KS 67208</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F58220] shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:3169930376" className="hover:text-[#F58220] font-bold text-white">
                    (316) 993-0376
                  </a>
                  <a href="tel:3162499873" className="hover:text-[#F58220] font-bold text-white">
                    (316) 249-9873
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F58220] shrink-0" />
                <a href="mailto:estimates@laraconcrete.com" className="hover:text-[#F58220]">
                  estimates@laraconcrete.com
                </a>
              </div>
              <div className="pt-2 text-[11px] text-gray-400 bg-[#2D2D2D] p-3 rounded-lg border border-white/10">
                <p className="font-bold text-white mb-1">Dispatch Operating Hours:</p>
                <p>Mon - Fri: 6:00 AM - 7:00 PM</p>
                <p>Saturday: 7:00 AM - 4:00 PM</p>
                <p className="text-[#F58220] font-bold mt-1">24/7 Emergency Dispatch Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} ZenBid Pro. Enterprise SaaS Platform — Available For
            Ownership & White-Label Deployment.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSitemapOpen(!sitemapOpen)}
              className="hover:text-gray-300 transition-colors flex items-center gap-1"
            >
              <FileText className="w-3 h-3 text-[#F58220]" /> XML Sitemap
            </button>
            <button
              onClick={() => setRobotsOpen(!robotsOpen)}
              className="hover:text-gray-300 transition-colors flex items-center gap-1"
            >
              <FileText className="w-3 h-3 text-[#F58220]" /> robots.txt
            </button>
            <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-300 cursor-pointer">ADA Compliance</span>
          </div>
        </div>
      </div>

      {/* XML Sitemap Viewer Modal */}
      {sitemapOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-white/20 rounded-xl p-6 max-w-2xl w-full text-white text-xs font-mono max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
              <h3 className="text-sm font-bold text-[#F58220]">
                sitemap.xml (Auto-Generated SEO Index)
              </h3>
              <button
                onClick={() => setSitemapOpen(false)}
                className="text-gray-400 hover:text-white font-bold"
              >
                ✕ Close
              </button>
            </div>
            <pre className="text-emerald-400 bg-[#121212] p-4 rounded-lg overflow-x-auto">
              {`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://laraconcrete.com/</loc><priority>1.0</priority></url>
  <url><loc>https://laraconcrete.com/services/concrete-driveways</loc><priority>0.9</priority></url>
  <url><loc>https://laraconcrete.com/services/stamped-concrete</loc><priority>0.9</priority></url>
  <url><loc>https://laraconcrete.com/services/patios-outdoor-living</loc><priority>0.9</priority></url>
  <url><loc>https://laraconcrete.com/services/foundations-footings</loc><priority>0.9</priority></url>
  <url><loc>https://laraconcrete.com/services/commercial-concrete</loc><priority>0.9</priority></url>
  <url><loc>https://laraconcrete.com/locations/wichita-ks</loc><priority>0.8</priority></url>
  <url><loc>https://laraconcrete.com/locations/derby-ks</loc><priority>0.8</priority></url>
  <url><loc>https://laraconcrete.com/locations/andover-ks</loc><priority>0.8</priority></url>
</urlset>`}
            </pre>
          </div>
        </div>
      )}

      {/* robots.txt Viewer Modal */}
      {robotsOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-white/20 rounded-xl p-6 max-w-xl w-full text-white text-xs font-mono">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
              <h3 className="text-sm font-bold text-[#F58220]">robots.txt</h3>
              <button
                onClick={() => setRobotsOpen(false)}
                className="text-gray-400 hover:text-white font-bold"
              >
                ✕ Close
              </button>
            </div>
            <pre className="text-[#F58220] bg-[#121212] p-4 rounded-lg">
              {`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/private

Sitemap: https://laraconcrete.com/sitemap.xml`}
            </pre>
          </div>
        </div>
      )}
    </footer>
  );
};
