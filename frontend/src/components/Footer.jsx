import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer({ profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-[#070a10]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-purple-600 p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-mono font-bold text-brand-400 text-sm">
              AR
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-white">
              {profile.fullName || 'Ashish Rathi'}
            </p>
            <p className="text-xs text-slate-500 font-mono">
              Java Full-Stack Developer | C-DAC Pune & COER
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <span>Crafted with Spring Boot 3.4 & React 19</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.email || 'rathiashish7079@gmail.com'}`}
            className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition"
            title="Email"
          >
            <Mail size={16} />
          </a>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition"
            title="Back to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
}
