import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Splash: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const steps = [
    "Initializing System Architect OS...",
    "Loading Strategy Engine...",
    "Querying Digital Assets...",
    "Compiling Systems Matrix...",
    "Ready."
  ];

  useEffect(() => {
    // Fast transitions between text
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          // Hide splash shortly after "Ready"
          setTimeout(() => {
            setIsVisible(false);
          }, 600);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-darker text-white font-mono"
        >
          <div className="max-w-md w-full px-6 space-y-8 text-left">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src="/logo.jpg" alt="MRB Logo" className="h-7 w-7 rounded-full border border-white/10" />
              <span className="text-xl font-bold tracking-widest font-display text-transparent bg-clip-text bg-gradient-primary">
                MRB.LIFE
              </span>
            </div>

            {/* Step list */}
            <div className="space-y-2 text-sm text-gray-500">
              {steps.map((text, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  {idx < step ? (
                    <span className="text-emerald-400">✓</span>
                  ) : idx === step ? (
                    <span className="text-cyan-400 animate-pulse">❯</span>
                  ) : (
                    <span className="opacity-20">○</span>
                  )}
                  <span className={idx === step ? "text-white font-semibold" : idx < step ? "text-gray-400" : "opacity-30"}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Loading Bar */}
            <div className="relative h-1 w-full bg-gray-900 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-emerald-500 to-cyan-500"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
