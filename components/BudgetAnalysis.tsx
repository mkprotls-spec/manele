
import React from 'react';
import { Itinerary, GroundingSource } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Props {
  itinerary: Itinerary;
  sources: GroundingSource[];
}

const BudgetAnalysis: React.FC<Props> = ({ itinerary, sources }) => {
  // Simple mock data for chart based on text extraction
  const data = [
    { name: 'Vols', value: 35 },
    { name: 'Logement', value: 40 },
    { name: 'Activités', value: 15 },
    { name: 'Nourriture', value: 10 },
  ];
  
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Répartition du Budget</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
              <span className="text-sm font-semibold text-slate-600">{item.name}</span>
              <span className="text-sm font-bold text-slate-900 ml-auto">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Estimations Vols</h3>
        <div className="space-y-4">
          {itinerary.flightEstimates.map((flight, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-900">{flight.airline}</span>
                <span className="text-emerald-600 font-bold">{flight.priceRange}</span>
              </div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{flight.route}</p>
            </div>
          ))}
        </div>
      </div>

      {sources.length > 0 && (
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Sources et Tarifs réels</h3>
          <ul className="space-y-3">
            {sources.map((source, idx) => (
              <li key={idx}>
                <a 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-start gap-2 group"
                >
                  <span className="mt-1 opacity-50">🔗</span>
                  <span className="group-hover:underline line-clamp-2 leading-tight">{source.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BudgetAnalysis;
