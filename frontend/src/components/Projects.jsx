import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Car, 
  Compass, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  X
} from 'lucide-react';

export default function Projects({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 mb-3">
          <FolderGit2 size={14} /> Featured Portfolio Projects
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Scale & Impact</span>
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg">
          Showcasing production-ready architectures, intelligent algorithms, and seamless full-stack user experiences.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project) => {
          const isEcoLift = project.title.toUpperCase().includes('ECOLIFT');
          const Icon = isEcoLift ? Car : Compass;
          const accentGradient = isEcoLift 
            ? 'from-emerald-500/20 via-teal-500/10 to-transparent' 
            : 'from-sky-500/20 via-indigo-500/10 to-transparent';
          const badgeColor = isEcoLift
            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/50'
            : 'bg-sky-950/80 text-sky-300 border-sky-800/50';

          return (
            <div
              key={project.id || project.title}
              className="relative rounded-3xl bg-slate-900/60 border border-slate-800/90 overflow-hidden hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 group flex flex-col justify-between"
            >
              {/* Image banner with overlay */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-950">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-95"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent`} />
                
                {/* Floating Category Pill */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${badgeColor} flex items-center gap-1.5`}>
                    <Icon size={14} />
                    {isEcoLift ? 'Smart Mobility Platform' : 'Travel & Hospitality'}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    {project.title}
                    <span className="text-xs font-normal text-slate-300 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
                      {project.status || 'Completed'}
                    </span>
                  </h3>
                  <p className="text-sm font-medium text-slate-300 mt-1">{project.subtitle}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.split(',').map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700/60"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Highlights</h4>
                    <ul className="space-y-1.5">
                      {project.keyFeatures.split(';').slice(0, 3).map((feat, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                          <span>{feat.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1 hover:underline"
                  >
                    View Architecture & Details →
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
                      title="View GitHub Repository"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-600/30 transition"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-brand-950 text-brand-300 border border-brand-800/40">
                Detailed Case Study
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {selectedProject.status}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white">{selectedProject.title}</h3>
            <p className="text-sm text-slate-300 font-medium mt-1">{selectedProject.subtitle}</p>

            <div className="mt-4 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Platform Overview</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedProject.description}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Technical Implementation</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedProject.techStack.split(',').map((tech, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 text-xs font-mono border border-slate-700">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Feature Specification</h4>
              <ul className="space-y-2">
                {selectedProject.keyFeatures.split(';').map((feat, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    <CheckCircle2 size={16} className="text-brand-400 mt-0.5 shrink-0" />
                    <span>{feat.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Close
              </button>
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-500 inline-flex items-center gap-1.5"
              >
                <Github size={14} />
                View Code
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
