import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Construction } from 'lucide-react';
import { SEOMetadata } from '../components/ui/SEOMetadata';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-16">
      <SEOMetadata
        title="404 - Page Not Found | Lara Concrete LLC"
        description="The page you are looking for does not exist on Lara Concrete LLC."
      />
      <div className="max-w-lg w-full text-center bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
        <div className="w-20 h-20 bg-[#F58220]/10 border border-[#F58220]/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Construction className="w-10 h-10 text-[#F58220]" />
        </div>

        <h1 className="text-6xl font-black text-[#1F2937] font-display mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          Page Under Construction or Not Found
        </h2>
        <p className="text-gray-600 text-sm mb-8 leading-relaxed">
          The page you requested could not be located. It may have been moved, renamed, or is
          currently under construction.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-[#F58220] hover:bg-[#D66D10] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-md cursor-pointer min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3.5 px-6 rounded-xl transition-all duration-200 border border-gray-300 cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
