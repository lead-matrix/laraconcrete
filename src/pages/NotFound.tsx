import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, ArrowLeft, Construction } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 animate-fadeIn">
      <div className="max-w-lg w-full text-center bg-[#0f172a] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Construction className="w-8 h-8 text-blue-400" />
        </div>

        <h1 className="text-5xl font-black text-white font-mono mb-2">404</h1>
        <h2 className="text-lg font-bold text-slate-200 mb-3">
          Page Not Found
        </h2>
        <p className="text-slate-400 text-xs mb-8 leading-relaxed">
          The requested operating system module or route could not be found.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="btn-cos-primary py-3 px-6 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Go to Mission Control</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-cos-secondary py-3 px-6 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
