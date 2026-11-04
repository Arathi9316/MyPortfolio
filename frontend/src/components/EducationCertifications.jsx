import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  CheckCircle2,
  BookOpen,
  BadgeCheck
} from 'lucide-react';

export default function EducationCertifications({ education, certifications }) {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Education Timeline */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-purple-400 mb-3">
              <GraduationCap size={14} /> Academic Journey
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Credentials</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base">
              Strong theoretical foundation combined with elite practical training at C-DAC Pune.
            </p>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-indigo-500 before:to-slate-800">
            {education.map((edu, idx) => (
              <div key={idx} className="relative pl-8 sm:pl-10 group">
                {/* Node icon dot */}
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-purple-500 flex items-center justify-center group-hover:scale-125 transition-transform shadow-lg shadow-purple-500/30">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/50 transition-all duration-300 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800/40">
                      {edu.gradeOrStatus || 'Degree'}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Calendar size={13} className="text-purple-400" />
                      <span>{edu.duration} (Completion: {edu.completionDate})</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {edu.institution}
                  </h3>
                  <p className="text-sm font-semibold text-purple-300/90 mt-0.5">
                    {edu.degree}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <MapPin size={12} className="text-slate-500" />
                    {edu.location}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed border-t border-slate-800/80 pt-3">
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Certifications */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-400 mb-3">
              <Award size={14} /> Professional Certifications
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Verified Badges
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              Continuous learning and industry skill validation.
            </p>
          </div>

          <div className="space-y-4">
            {certifications.map((cert, idx) => {
              const getBadgeStyles = (color) => {
                switch (color) {
                  case 'emerald':
                    return {
                      border: 'hover:border-emerald-500/50',
                      text: 'text-emerald-400',
                      badge: 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300'
                    };
                  case 'blue':
                    return {
                      border: 'hover:border-blue-500/50',
                      text: 'text-blue-400',
                      badge: 'bg-blue-950/40 border-blue-800/40 text-blue-300'
                    };
                  case 'purple':
                    return {
                      border: 'hover:border-purple-500/50',
                      text: 'text-purple-400',
                      badge: 'bg-purple-950/40 border-purple-800/40 text-purple-300'
                    };
                  default:
                    return {
                      border: 'hover:border-amber-500/50',
                      text: 'text-amber-400',
                      badge: 'bg-amber-950/40 border-amber-800/40 text-amber-300'
                    };
                }
              };

              const style = getBadgeStyles(cert.badgeColor);

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 ${style.border} transition-all duration-300 shadow-xl group`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-800 text-white mt-0.5 group-hover:scale-105 transition-transform">
                        <BadgeCheck size={20} className={style.text} />
                      </div>
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${style.badge}`}>
                          {cert.issuer}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1 group-hover:text-slate-100">
                          {cert.title}
                        </h4>
                        <span className="text-xs text-slate-400 block mt-0.5">
                          Issued {cert.issueDate}
                        </span>
                      </div>
                    </div>

                    <a
                      href={cert.credentialUrl && cert.credentialUrl !== '#' ? cert.credentialUrl : '#education'}
                      target={cert.credentialUrl && cert.credentialUrl !== '#' ? '_blank' : '_self'}
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                      title="View Credential"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick CDAC Highlight Callout */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 via-indigo-950/20 to-slate-900 border border-purple-800/40 shadow-xl">
            <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
              <BookOpen size={16} />
              C-DAC Pune Advanced Computing Edge
            </h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Trained in production-level Spring Boot microservices, Spring Security JWT pipelines, enterprise database tuning, and full-stack software architecture principles.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
