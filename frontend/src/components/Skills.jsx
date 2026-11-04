import React, { useState } from 'react';
import { 
  Code2, 
  Database, 
  Terminal, 
  Cpu, 
  Layers, 
  CheckCircle, 
  Sparkles,
  ShieldCheck,
  Server,
  Box,
  Wrench
} from 'lucide-react';

export default function Skills({ skills }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Backend', 'Frontend', 'Database', 'DevOps & Tools'];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Backend': return 'text-amber-400 bg-amber-950/40 border-amber-800/40';
      case 'Frontend': return 'text-cyan-400 bg-cyan-950/40 border-cyan-800/40';
      case 'Database': return 'text-indigo-400 bg-indigo-950/40 border-indigo-800/40';
      case 'DevOps & Tools': return 'text-pink-400 bg-pink-950/40 border-pink-800/40';
      default: return 'text-brand-400 bg-brand-950/40 border-brand-800/40';
    }
  };

  const getCategoryBar = (category) => {
    switch (category) {
      case 'Backend': return 'bg-gradient-to-r from-amber-500 to-orange-500';
      case 'Frontend': return 'bg-gradient-to-r from-cyan-500 to-blue-500';
      case 'Database': return 'bg-gradient-to-r from-indigo-500 to-purple-500';
      case 'DevOps & Tools': return 'bg-gradient-to-r from-pink-500 to-rose-500';
      default: return 'bg-brand-500';
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-400 mb-3">
          <Sparkles size={14} /> Technical Arsenal
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Core Technologies & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-brand-300 to-pink-400">Engineering Skills</span>
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg">
          Deep hands-on experience across modern enterprise stacks, cloud databases, build systems, and reactive user interfaces.
        </p>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id || skill.name}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-300 shadow-xl group hover:shadow-2xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryColor(skill.category)}`}>
                  {skill.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-2 group-hover:text-brand-300 transition-colors">
                  {skill.name}
                </h3>
              </div>
              <span className="font-mono text-sm font-bold text-slate-300">
                {skill.proficiency}%
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed min-h-[36px]">
              {skill.description}
            </p>

            {/* Proficiency Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-700 ${getCategoryBar(skill.category)}`}
                style={{ width: `${skill.proficiency}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
