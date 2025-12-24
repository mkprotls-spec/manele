
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-40 pb-52 px-6 overflow-hidden bg-[radial-gradient(circle_at_top_right,_#f0f9ff_0%,_#ffffff_100%)]">
      <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-60 -z-10"></div>
      
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
          AI-POWERED TRAVEL PLANNING
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
          Voyage de <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">Moha et Manele</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
          Planifiez votre prochaine aventure en quelques secondes. Nos algorithmes créent des itinéraires personnalisés avec les meilleurs tarifs garantis.
        </p>
      </div>
    </section>
  );
};

export default Hero;
