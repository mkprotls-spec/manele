
import React, { useState, useEffect } from 'react';

const LoadingOverlay: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    "Recherche des meilleures destinations...",
    "Analyse des tarifs aériens en temps réel...",
    "Sélection des hôtels les mieux notés...",
    "Conception de votre itinéraire sur mesure...",
    "Finalisation des derniers détails..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative w-24 h-24 mb-12">
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-4xl">✈️</div>
      </div>
      
      <h2 className="text-3xl font-black text-slate-900 mb-4 animate-pulse">
        Voyage de Moha et Manele
      </h2>
      <p className="text-xl text-slate-600 font-medium h-8 transition-all duration-500">
        {steps[step]}
      </p>
      
      <div className="mt-12 w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-1000 ease-out"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
