
import React, { useState } from 'react';
import { Itinerary, DayPlan } from '../types';

interface Props {
  itinerary: Itinerary;
}

const ItineraryDisplay: React.FC<Props> = ({ itinerary }) => {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
        {itinerary.itinerary.map((day) => (
          <button
            key={day.day}
            onClick={() => setActiveDay(day.day)}
            className={`flex-shrink-0 px-6 py-4 rounded-2xl text-center transition-all ${
              activeDay === day.day 
                ? 'bg-slate-900 text-white shadow-xl' 
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-70">Jour</p>
            <p className="text-xl font-black">{day.day}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 min-h-[500px]">
        {itinerary.itinerary.find(d => d.day === activeDay)?.activities.map((activity, idx) => (
          <div key={idx} className="relative pl-12 pb-12 last:pb-0 group">
            <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-slate-100 group-last:bg-transparent"></div>
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border-4 border-emerald-500 shadow-sm z-10"></div>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-bold text-emerald-600 mb-1">{activity.time}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{activity.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-4">{activity.description}</p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-500 text-xs font-bold rounded-full border border-slate-100">
                    📍 {activity.location}
                  </span>
                </div>
              </div>
              <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 text-right min-w-[120px]">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Coût Est.</p>
                <p className="text-lg font-bold text-slate-800">{activity.estimatedCost}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {itinerary.hotelRecommendations.map((hotel, idx) => (
          <div key={idx} className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 bg-slate-200 relative">
               <img src={`https://picsum.photos/seed/${idx+40}/600/400`} alt={hotel.name} className="w-full h-full object-cover" />
               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-black shadow-sm">
                 ⭐ {hotel.rating}
               </div>
            </div>
            <div className="p-6">
              <h4 className="text-lg font-bold text-slate-900 mb-2">{hotel.name}</h4>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{hotel.description}</p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <span className="text-xl font-bold text-slate-900">{hotel.pricePerNight} <span className="text-xs text-slate-400 font-normal">/ nuit</span></span>
                <a href={hotel.link} className="text-indigo-600 font-bold text-sm hover:underline">Réserver →</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryDisplay;
