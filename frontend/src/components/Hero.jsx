import React from 'react';
import { 
  ArrowRight, 
  Download, 
  MapPin, 
  Mail, 
  Phone, 
  Sparkles, 
  GitBranch, 
  Terminal, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export default function Hero({ profile }) {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Hero Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Full-Stack Developer Roles</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400">{profile.fullName || 'Ashish Rathi'}</span>
            </h1>

            <p className="text-xl sm:text-2xl font-semibold text-slate-200">
              {profile.title || 'Java Full-Stack Developer'}
            </p>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
              {profile.summary || 'Java Full-Stack Developer with a PGCP-AC in Advanced Computing from C-DAC Pune and a B.Tech in CS. Experienced in RESTful APIs, React.js, Spring Boot, and PostgreSQL/MySQL.'}
            </p>

            {/* Contact quick strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <MapPin size={13} className="text-brand-400" />
                {profile.location || 'Pune, Maharashtra'}
              </span>
              <a href={`mailto:${profile.email || 'rathiashish7079@gmail.com'}`} className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 hover:text-white transition">
                <Mail size={13} className="text-brand-400" />
                {profile.email || 'rathiashish7079@gmail.com'}
              </a>
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <Phone size={13} className="text-brand-400" />
                {profile.phone || '+91 7037283879'}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#journey"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 hover:brightness-110 transition group"
              >
                Explore Skills & Journey Map
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 font-semibold text-sm transition"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-sm transition"
                title="Contact Ashish"
              >
                <Mail size={15} />
                Contact
              </a>
            </div>

            {/* Stack Highlights pills */}
            <div className="pt-4 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-purple-950/60 text-purple-300 border border-purple-800/40 font-mono">
                C-DAC Pune PGCP-AC
              </span>
              <span className="px-2.5 py-1 rounded-md bg-amber-950/60 text-amber-300 border border-amber-800/40 font-mono">
                Java 17+
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-mono">
                Spring Boot 3.4.0
              </span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-800/40 font-mono">
                React 19 & Tailwind
              </span>
              <span className="px-2.5 py-1 rounded-md bg-blue-950/60 text-blue-300 border border-blue-800/40 font-mono">
                MySQL & PostgreSQL
              </span>
            </div>
          </div>

          {/* Right Column: Code/System Architecture Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-950/90 shadow-2xl overflow-hidden backdrop-blur-xl group">
              {/* Window Controls Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="text-slate-400 font-mono text-[11px] ml-2">AshishProfileController.java</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                  <Terminal size={12} /> Spring Boot 3.4
                </div>
              </div>

              {/* Code Snippet Body */}
              <div className="p-5 font-mono text-xs leading-relaxed text-slate-300 space-y-2 overflow-x-auto">
                <div>
                  <span className="text-purple-400">@RestController</span>
                  <br />
                  <span className="text-purple-400">@RequestMapping</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-emerald-400">"/api/developer"</span>
                  <span className="text-slate-400">)</span>
                </div>

                <div>
                  <span className="text-blue-400">public class</span>{' '}
                  <span className="text-amber-300">AshishRathi</span>{' '}
                  <span className="text-slate-400">{'{'}</span>
                </div>

                <div className="pl-4 space-y-1 text-slate-400">
                  <p><span className="text-blue-400">private final String</span> name = <span className="text-emerald-300">"Ashish Rathi"</span>;</p>
                  <p><span className="text-blue-400">private final String</span> role = <span className="text-emerald-300">"Java Full-Stack Developer"</span>;</p>
                  <p><span className="text-blue-400">private final String</span> education = <span className="text-emerald-300">"C-DAC Pune (PGCP-AC)"</span>;</p>
                  <p><span className="text-blue-400">private final List&lt;String&gt;</span> coreStack = List.of(</p>
                  <p className="pl-4 text-emerald-300">"Java 17", "Spring Boot 3.x", "React 19", "MySQL", "PostgreSQL", "Docker"</p>
                  <p>);</p>
                </div>

                <div className="pl-4 pt-2">
                  <span className="text-purple-400">@GetMapping</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-emerald-400">"/mission"</span>
                  <span className="text-slate-400">)</span>
                  <br />
                  <span className="text-blue-400">public</span> ResponseEntity&lt;Mission&gt; getMission() {'{'}
                  <br />
                  &nbsp;&nbsp;<span className="text-blue-400">return</span> ResponseEntity.ok(
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">new</span> Mission(<span className="text-emerald-300">"Building high-throughput, secure microservices & reactive UIs"</span>)
                  <br />
                  &nbsp;&nbsp;);
                  <br />
                  {'}'}
                </div>

                <div><span className="text-slate-400">{'}'}</span></div>
              </div>

              {/* Status bar */}
              <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle size={13} /> REST API Ready (Port 8080)
                </span>
                <span>UTF-8 | LF | Maven</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
