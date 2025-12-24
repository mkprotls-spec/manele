
import React, { useState } from 'react';
import { SearchParams } from '../types';

interface Props {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

const SearchSection: React.FC<Props> = ({ onSearch, isLoading }) => {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState<SearchParams['budget']>('standard');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    onSearch({ destination, dates, travelers, budget });
  };

  return (
    <div className="bg-white p-2 rounded-[32px] shadow-2xl border border-slate-100 flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="p-4 flex flex-col lg:flex-row items-center gap-4">
        <div className="flex-1 w-full relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input 
            type="text" 
            placeholder="Où voulez-vous aller ?" 
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-900 font-medium"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="flex-1 w-full relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          </div>
          <input 
            type="text" 
            placeholder="Dates (ex: 12 - 20 Juil)" 
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-900 font-medium"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
          />
        </div>

        <button 
          disabled={isLoading || !destination}
          className="w-full lg:w-auto bg-slate-900 text-white font-bold px-10 py-4 rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            'Planifier mon voyage'
          )}
        </button>
      </form>
      
      <div className="px-6 pb-6 pt-2 flex flex-wrap items-center gap-4 border-t border-slate-50 mt-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Options :</span>
        <div className="flex bg-slate-50 p-1 rounded-xl">
          {(['budget', 'standard', 'luxury'] as const).map(b => (
            <button
              key={b}
              onClick={() => setBudget(b)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${budget === b ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {b}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-xl">
          <span className="text-sm font-semibold text-slate-500">Voyageurs:</span>
          <select 
            value={travelers} 
            onChange={(e) => setTravelers(Number(e.target.value))}
            className="bg-transparent text-sm font-bold text-slate-900 outline-none"
          >
            {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
