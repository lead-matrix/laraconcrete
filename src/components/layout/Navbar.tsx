import React, { useState, useEffect } from 'react';
import { Phone, Shield, Calendar, Menu, X, ChevronDown, Wrench, Globe, UserCheck } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { openEstimateModal, language, setLanguage, companyDetails } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);

    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Hotline Bar */}
      <div className="bg-[#1A1A1A] text-white py-2 px-4 text-xs font-semibold border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#F58220]">
              <span className="w-2 h-2 rounded-full bg-[#F58220] animate-pulse"></span>
              {language === 'ES' ? 'Despacho Rápido 24/7 Activo' : '⚡ Fast Response 24/7 Dispatch Active'}
            </span>
            <span className="hidden sm:inline text-gray-400">|</span>
            <span className="hidden sm:flex items-center gap-1 text-gray-300">
              <Shield className="w-3.5 h-3.5 text-[#F58220]" />
              {language === 'ES' ? 'Con Licencia y Asegurado por $2M' : 'Licensed & Insured ($2M Guarantee)'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'EN' ? 'ES' : 'EN')}
              className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-gray-200 transition-colors"
            >
              <Globe className="w-3 h-3 text-[#F58220]" />
              <span>{language === 'EN' ? 'ESPAÑOL' : 'ENGLISH'}</span>
            </button>

            <a
              href={`tel:${companyDetails.phone1.replace(/\D/g, '')}`}
              className="flex items-center gap-1.5 text-[#F58220] hover:text-[#FF8E2B] font-bold tracking-wider transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{companyDetails.phone1}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar — 3-Column: Left Nav | Center Logo | Right CTAs */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/97 backdrop-blur-md shadow-md py-2 border-b border-gray-200/80'
            : 'bg-white py-3 border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 items-center">

          {/* ── LEFT: Navigation Links ── */}
          <div className="hidden lg:flex items-center gap-5 text-sm font-semibold text-[#374151]">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-[#F58220] transition-colors duration-200 whitespace-nowrap"
            >
              {language === 'ES' ? 'Inicio' : 'Home'}
            </button>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
                aria-label="Toggle services submenu"
                className="flex items-center gap-1 hover:text-[#F58220] transition-colors duration-200 py-2 whitespace-nowrap"
              >
                <span>{language === 'ES' ? 'Servicios' : 'Services'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#F58220] transition-colors" />
              </button>

              <div className="absolute top-full left-0 w-72 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl p-3 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50 translate-y-1 group-hover:translate-y-0">
                <div className="text-xs uppercase font-bold text-[#F58220] px-2 py-1 tracking-wider border-b border-white/10 mb-1">
                  14 Core Concrete Services
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
                  {[
                    { label: 'Concrete Driveways', popular: true },
                    { label: 'Patios & Outdoor Living' },
                    { label: 'Stamped & Decorative' },
                    { label: 'Foundations & Slabs' },
                    { label: 'Garage & Shop Floors' },
                    { label: 'Commercial Flatwork' },
                    { label: 'Sidewalks & Walkways' },
                    { label: 'Concrete Repair & Resurfacing' },
                  ].map((s) => (
                    <button
                      key={s.label}
                      onClick={() => scrollToSection('services')}
                      className="w-full text-left px-2 py-1.5 text-xs text-gray-300 hover:bg-[#F58220]/20 hover:text-white rounded transition-colors flex items-center justify-between"
                    >
                      <span>{s.label}</span>
                      {s.popular && (
                        <span className="text-[10px] bg-[#F58220] text-white px-1.5 rounded font-bold">Popular</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => scrollToSection('cad-estimator')}
              className="hover:text-[#F58220] transition-colors duration-200 flex items-center gap-1 whitespace-nowrap"
            >
              <Wrench className="w-3.5 h-3.5 text-[#F58220]" />
              <span>Estimator</span>
            </button>

            <button
              onClick={() => scrollToSection('projects')}
              className="hover:text-[#F58220] transition-colors duration-200 whitespace-nowrap"
            >
              {language === 'ES' ? 'Proyectos' : 'Projects'}
            </button>

            <button
              onClick={() => scrollToSection('customer-portal')}
              className="hover:text-[#F58220] transition-colors duration-200 flex items-center gap-1 whitespace-nowrap"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#F58220]" />
              <span>Portal</span>
            </button>
          </div>

          {/* ── CENTER: Logo (bigger, perfectly centered) ── */}
          <div className="flex justify-center items-center">
            <Link to="/" className="group flex items-center" aria-label="Lara Concrete LLC Home">
              <div className={`transition-all duration-300 ${isScrolled ? 'py-1' : 'py-1.5'}`}>
                <img
                  src="/lara-logo.jpg"
                  alt="Lara Concrete LLC"
                  className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-sm ${
                    isScrolled ? 'h-12 sm:h-14' : 'h-14 sm:h-16'
                  }`}
                />
              </div>
            </Link>
          </div>

          {/* ── RIGHT: CTA Buttons + Admin ── */}
          <div className="flex items-center justify-end gap-3">
            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2.5">
              <button
                onClick={() => scrollToSection('blog')}
                className="text-sm font-semibold text-[#374151] hover:text-[#F58220] transition-colors duration-200 whitespace-nowrap"
              >
                {language === 'ES' ? 'Guías' : 'Blog'}
              </button>

              <Link
                to="/admin"
                className="text-xs bg-[#1F2937] hover:bg-[#F58220] text-white px-3 py-1.5 rounded-lg font-bold transition-all duration-200 shadow-sm whitespace-nowrap"
              >
                CRM
              </Link>

              <a
                href={`tel:${companyDetails.phone1.replace(/\D/g, '')}`}
                className="btn-lara-secondary px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#F58220]" />
                <span>Call Now</span>
              </a>

              <button
                onClick={() => openEstimateModal()}
                className="btn-lara-primary px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{language === 'ES' ? 'Cotizar' : 'Free Estimate'}</span>
              </button>
            </div>

            {/* Mobile: Call pill + Hamburger */}
            <a
              href={`tel:${companyDetails.phone1.replace(/\D/g, '')}`}
              className="lg:hidden flex items-center gap-1 bg-[#F58220]/10 hover:bg-[#F58220] text-[#F58220] hover:text-white border border-[#F58220]/30 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Call</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-gray-100 text-[#1F2937] hover:bg-[#F58220] hover:text-white transition-all duration-200 border border-gray-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-xl animate-fadeIn">
          {/* Orange accent top strip */}
          <div className="h-0.5 bg-gradient-to-r from-[#F58220] via-[#FF8E2B] to-[#F58220]" />

          <div className="p-5 space-y-4">
            {/* Navigation Grid */}
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
              {[
                { label: language === 'ES' ? 'Inicio' : 'Home', section: 'hero' },
                { label: language === 'ES' ? 'Servicios (14)' : 'Services (14)', section: 'services' },
                { label: 'CAD Estimator', section: 'cad-estimator', accent: true },
                { label: 'Photo Estimator', section: 'photo-estimator', accent: true },
                { label: 'Customer Portal', section: 'customer-portal' },
                { label: language === 'ES' ? 'Flota' : 'Fleet', section: 'fleet' },
                { label: language === 'ES' ? 'Proyectos' : 'Projects', section: 'projects' },
                { label: language === 'ES' ? 'Guías' : 'Blog', section: 'blog' },
              ].map((item) => (
                <button
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className={`text-left py-2.5 px-3 rounded-xl text-sm font-semibold transition-colors ${
                    item.accent
                      ? 'bg-[#F58220]/10 text-[#F58220] border border-[#F58220]/20 hover:bg-[#F58220]/20'
                      : 'bg-gray-50 text-[#1F2937] hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Admin Link */}
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-2.5 px-3 bg-[#1F2937] text-white rounded-xl text-sm font-bold hover:bg-[#374151] transition-colors"
            >
              CRM Admin Portal
            </Link>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEstimateModal();
                }}
                className="w-full btn-lara-primary py-3.5 rounded-xl text-sm text-center uppercase tracking-wider font-bold"
              >
                {language === 'ES' ? 'Presupuesto Gratis' : '⚡ Get Free Estimate'}
              </button>
              <a
                href={`tel:${companyDetails.phone1.replace(/\D/g, '')}`}
                className="w-full btn-lara-secondary py-3 rounded-xl text-sm text-center uppercase tracking-wider font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#F58220]" />
                <span>{companyDetails.phone1}</span>
              </a>
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'EN' ? 'ES' : 'EN')}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-gray-500 hover:text-[#F58220] border-t border-gray-100 pt-3 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'EN' ? 'Switch to Español' : 'Switch to English'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
