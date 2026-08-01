import React, { useState, useEffect } from 'react';
import { Phone, Shield, Calendar, Sparkles, Menu, X, ChevronDown, Wrench, Globe, UserCheck } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { openEstimateModal, language, setLanguage } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    
    // If not on homepage, navigate home first
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'EN' ? 'ES' : 'EN')}
              className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-gray-200 transition-colors"
            >
              <Globe className="w-3 h-3 text-[#F58220]" />
              <span>{language === 'EN' ? 'ESPAÑOL' : 'ENGLISH'}</span>
            </button>

            {/* Hotline Phone */}
            <a
              href="tel:3169930376"
              className="flex items-center gap-1.5 text-[#F58220] hover:text-[#FF8E2B] font-bold tracking-wider transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(316) 993-0376</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#2D2D2D]/95 backdrop-blur-md shadow-2xl py-3 border-b border-white/10'
            : 'bg-[#2D2D2D] py-4 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with Lara Concrete Fleet Truck Wrap Emblem */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/lara-logo.jpg"
              alt="Lara Concrete LLC Logo"
              className="h-11 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-200">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-[#F58220] transition-colors"
            >
              {language === 'ES' ? 'Inicio' : 'Home'}
            </button>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#F58220] transition-colors py-2"
              >
                <span>{language === 'ES' ? 'Servicios' : 'Services'}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#F58220] transition-colors" />
              </button>

              <div className="absolute top-full left-0 w-72 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl p-3 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="text-xs uppercase font-bold text-[#F58220] px-2 py-1 tracking-wider border-b border-white/10 mb-1">
                  14 Core Concrete Services
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
                  <button
                    onClick={() => scrollToSection('services')}
                    className="w-full text-left px-2 py-1.5 text-xs text-gray-300 hover:bg-[#F58220]/20 hover:text-white rounded transition-colors flex items-center justify-between"
                  >
                    <span>Concrete Driveways</span>
                    <span className="text-[10px] bg-[#F58220] text-white px-1.5 rounded font-bold">Popular</span>
                  </button>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="w-full text-left px-2 py-1.5 text-xs text-gray-300 hover:bg-[#F58220]/20 hover:text-white rounded transition-colors"
                  >
                    Patios & Outdoor Living
                  </button>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="w-full text-left px-2 py-1.5 text-xs text-gray-300 hover:bg-[#F58220]/20 hover:text-white rounded transition-colors"
                  >
                    Stamped & Decorative
                  </button>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="w-full text-left px-2 py-1.5 text-xs text-gray-300 hover:bg-[#F58220]/20 hover:text-white rounded transition-colors"
                  >
                    Foundations & Slabs
                  </button>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="w-full text-left px-2 py-1.5 text-xs text-gray-300 hover:bg-[#F58220]/20 hover:text-white rounded transition-colors"
                  >
                    Commercial Concrete
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => scrollToSection('cad-estimator')}
              className="hover:text-[#F58220] transition-colors flex items-center gap-1"
            >
              <Wrench className="w-3.5 h-3.5 text-[#F58220]" />
              <span>CAD Estimator</span>
            </button>

            <button
              onClick={() => scrollToSection('photo-estimator')}
              className="hover:text-[#F58220] transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
              <span>Photo Estimator</span>
            </button>

            <button
              onClick={() => scrollToSection('customer-portal')}
              className="hover:text-[#F58220] transition-colors flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#F58220]" />
              <span>Portal</span>
            </button>

            <button
              onClick={() => scrollToSection('fleet')}
              className="hover:text-[#F58220] transition-colors"
            >
              {language === 'ES' ? 'Flota' : 'Fleet'}
            </button>

            <button
              onClick={() => scrollToSection('projects')}
              className="hover:text-[#F58220] transition-colors"
            >
              {language === 'ES' ? 'Proyectos' : 'Projects'}
            </button>

            <button
              onClick={() => scrollToSection('blog')}
              className="hover:text-[#F58220] transition-colors"
            >
              {language === 'ES' ? 'Guías' : 'Blog'}
            </button>

            <Link
              to="/admin"
              className="text-xs bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white px-2.5 py-1 rounded-md transition-colors"
            >
              CRM Admin
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:3169930376"
              className="btn-lara-secondary px-4 py-2 rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#F58220]" />
              <span>Call Now</span>
            </a>

            <button
              onClick={() => openEstimateModal()}
              className="btn-lara-primary px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{language === 'ES' ? 'Presupuesto Gratis' : 'Get Free Estimate'}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1A1A1A] border-b border-white/10 p-6 space-y-4 shadow-2xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-3 text-sm font-semibold">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left py-2 px-3 bg-[#2D2D2D] rounded text-gray-200 hover:text-[#F58220]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2 px-3 bg-[#2D2D2D] rounded text-gray-200 hover:text-[#F58220]"
            >
              Services (14)
            </button>
            <button
              onClick={() => scrollToSection('cad-estimator')}
              className="text-left py-2 px-3 bg-[#2D2D2D] rounded text-[#F58220] font-bold"
            >
              CAD Estimator
            </button>
            <button
              onClick={() => scrollToSection('photo-estimator')}
              className="text-left py-2 px-3 bg-[#2D2D2D] rounded text-[#F58220] font-bold"
            >
              Photo Estimator
            </button>
            <button
              onClick={() => scrollToSection('customer-portal')}
              className="text-left py-2 px-3 bg-[#2D2D2D] rounded text-gray-200 hover:text-[#F58220]"
            >
              Customer Portal
            </button>
            <button
              onClick={() => scrollToSection('fleet')}
              className="text-left py-2 px-3 bg-[#2D2D2D] rounded text-gray-200 hover:text-[#F58220]"
            >
              Truck & Fleet
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-left py-2 px-3 bg-[#2D2D2D] rounded text-gray-200 hover:text-[#F58220]"
            >
              Projects Gallery
            </button>

            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 px-3 bg-[#F58220]/20 text-[#F58220] rounded border border-[#F58220]/40 font-bold"
            >
              CRM Admin Portal
            </Link>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEstimateModal();
              }}
              className="w-full btn-lara-primary py-3 rounded-lg text-sm text-center uppercase tracking-wider font-bold"
            >
              Get Free Estimate
            </button>
            <a
              href="tel:3169930376"
              className="w-full btn-lara-secondary py-3 rounded-lg text-sm text-center uppercase tracking-wider font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#F58220]" />
              <span>Call (316) 993-0376</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
