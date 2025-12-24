
import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
      <div className="text-2xl font-black text-slate-900 italic tracking-tighter cursor-pointer">
        Moha&Manele<span className="text-emerald-500">.</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
        <a href="#" className="hover:text-slate-900 transition-colors">Explorer</a>
        <a href="#" className="hover:text-slate-900 transition-colors">Mes Voyages</a>
        <a href="#" className="hover:text-slate-900 transition-colors">Prix</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-slate-900 font-semibold px-4 py-2 hover:bg-white/50 rounded-lg transition-colors">Connexion</button>
        <button className="bg-slate-900 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
          Démarrer
        </button>
      </div>
    </nav>
  );
};

export default Header;
