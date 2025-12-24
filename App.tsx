
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchSection from './components/SearchSection';
import ItineraryDisplay from './components/ItineraryDisplay';
import BudgetAnalysis from './components/BudgetAnalysis';
import LoadingOverlay from './components/LoadingOverlay';
import { generateTravelPlan } from './geminiService';
import { Itinerary, SearchParams, GroundingSource } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateTravelPlan(params);
      setItinerary(data.itinerary);
      setSources(data.sources);
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue lors de la génération de votre voyage. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {!itinerary && (
          <>
            <Hero />
            <div className="max-w-4xl mx-auto px-6 -mt-32 relative z-10 mb-20">
              <SearchSection onSearch={handleSearch} isLoading={loading} />
            </div>
            
            <section className="py-20 bg-slate-50">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Pourquoi choisir Moha et Manele ?</h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Nous combinons l'intelligence artificielle la plus avancée avec les données de voyage en temps réel pour vous offrir une expérience de planification inégalée.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <FeatureCard 
                    icon="✨"
                    title="IA Personnalisée"
                    description="Des itinéraires conçus spécifiquement selon vos goûts et votre rythme."
                  />
                  <FeatureCard 
                    icon="💰"
                    title="Tarifs Réels"
                    description="Accès aux prix du marché en direct pour les vols et les hôtels."
                  />
                  <FeatureCard 
                    icon="🌍"
                    title="Expertise Locale"
                    description="Découvrez des pépites cachées que seuls les locaux connaissent."
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {itinerary && (
          <div id="results" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-slate-900 text-white py-12 px-6">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                  <button 
                    onClick={() => setItinerary(null)}
                    className="text-slate-400 hover:text-white mb-4 transition-colors flex items-center gap-2"
                  >
                    ← Modifier la recherche
                  </button>
                  <h1 className="text-4xl md:text-5xl font-extrabold">Voyage à {itinerary.destination}</h1>
                  <p className="text-slate-300 mt-2 text-lg">Un voyage inoubliable pour Moha et Manele</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-sm uppercase tracking-wider">Estimation Totale</p>
                  <p className="text-4xl font-bold text-emerald-400">{itinerary.totalBudgetEstimate}</p>
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <ItineraryDisplay itinerary={itinerary} />
              </div>
              <div className="space-y-8">
                <BudgetAnalysis itinerary={itinerary} sources={sources} />
                <div className="sticky top-6 space-y-6">
                  <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl">
                    <h3 className="text-xl font-bold mb-4">Prêt à partir ?</h3>
                    <p className="text-indigo-100 mb-6">Réservez cet itinéraire complet en un clic ou partagez-le avec vos amis.</p>
                    <button className="w-full bg-white text-indigo-600 font-bold py-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
                      Réserver le Voyage
                    </button>
                    <button className="w-full mt-3 bg-indigo-500 text-white font-bold py-4 rounded-xl hover:bg-indigo-400 transition-colors">
                      Partager l'itinéraire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {loading && <LoadingOverlay />}
      
      {error && (
        <div className="fixed bottom-6 right-6 bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 animate-bounce">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)} className="font-bold">×</button>
        </div>
      )}

      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black text-white italic tracking-tighter">
            Moha&Manele<span className="text-emerald-500">.</span>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white">Confidentialité</a>
            <a href="#" className="hover:text-white">Conditions</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
          <p className="text-sm">© 2024 Voyage de Moha et Manele. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{icon: string, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
    <div className="text-4xl mb-6">{icon}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

export default App;
