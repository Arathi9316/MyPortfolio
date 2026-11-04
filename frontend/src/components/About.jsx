import React from "react";
import {
  User,
  Code2,
  Server,
  Database,
  ShieldCheck,
  Cpu,
  Award,
} from "lucide-react";

export default function About({ profile }) {
  const highlights = [
    {
      icon: Server,
      title: "Backend Engineering",
      desc: "Expertise in modern Java 17+, Spring Boot 3.x, Spring Data JPA, RESTful API design, and Spring Security with role-based access control.",
      color: "from-amber-500/20 to-orange-500/20 text-amber-400",
    },
    {
      icon: Code2,
      title: "Frontend Excellence",
      desc: "Building responsive, reactive single-page applications using React 19, Vite, Tailwind CSS, and interactive graph visualizations with React Flow.",
      color: "from-cyan-500/20 to-blue-500/20 text-cyan-400",
    },
    {
      icon: Database,
      title: "Database Architecture",
      desc: "Proficient in relational schema design, query optimization, indexing, and ACID transaction integrity with PostgreSQL and MySQL.",
      color: "from-indigo-500/20 to-purple-500/20 text-indigo-400",
    },
    {
      icon: Cpu,
      title: "DevOps & Tooling",
      desc: "Containerization with Docker, multi-stage builds, dependency management with Maven, and Git-driven version control workflows.",
      color: "from-pink-500/20 to-rose-500/20 text-pink-400",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Bio & Story */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-brand-400">
            <User size={14} /> About Me
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Crafting Robust Backends &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-300">
              Intuitive User Interfaces
            </span>
          </h2>

          <div className="space-y-4 text-slate-300 text-base leading-relaxed">
            <p>
              I am a passionate{" "}
              <strong className="text-white">Java Full-Stack Developer</strong>{" "}
              recently completed the{" "}
              <strong className="text-purple-300">
                Post Graduate Certificate Programme in Advanced Computing
                (PGCP-AC)
              </strong>{" "}
              at <strong className="text-white">C-DAC Pune</strong> , and hold a{" "}
              <strong className="text-blue-300">
                B.Tech in Computer Science and Engineering
              </strong>{" "}
              from the{" "}
              <strong className="text-white">
                College of Engineering Roorkee (COER)
              </strong>
              .
            </p>
            <p>
              My expertise spans the entire software engineering lifecycle: from
              designing RESTful microservice contracts and database schemas
              (MySQL & PostgreSQL) to crafting fluid, accessible user interfaces
              with <strong className="text-cyan-300">React 19</strong>, modern
              Tailwind CSS, and interactive graph modeling tools.
            </p>
            <p>
              Whether engineering an algorithmic ride-matching engine for{" "}
              <strong className="text-emerald-400">ECOLIFT</strong> or building
              full-stack travel booking workflows for{" "}
              <strong className="text-sky-400">Wanderlust</strong>, I focus on
              delivering scalable, maintainable, and production-ready solutions.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="block text-2xl font-bold text-brand-400 font-mono">
                C-DAC
              </span>
              <span className="text-xs text-slate-400 mt-1 block">
                Adv. Computing
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="block text-2xl font-bold text-emerald-400 font-mono">
                B.Tech
              </span>
              <span className="text-xs text-slate-400 mt-1 block">
                CSE Graduate
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="block text-2xl font-bold text-purple-400 font-mono">
                Full-Stack
              </span>
              <span className="text-xs text-slate-400 mt-1 block">
                Java + React 19
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Key Competencies Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition hover:shadow-xl hover:shadow-black/40 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 border border-white/10 group-hover:scale-105 transition-transform`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
