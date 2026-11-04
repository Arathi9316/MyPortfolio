import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import JourneyFlow from './components/JourneyFlow';
import Skills from './components/Skills';
import Projects from './components/Projects';
import EducationCertifications from './components/EducationCertifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { api, fallbackData } from './services/api';

export default function App() {
  const [profile, setProfile] = useState(fallbackData.profile);
  const [skills, setSkills] = useState(fallbackData.skills);
  const [projects, setProjects] = useState(fallbackData.projects);
  const [education, setEducation] = useState(fallbackData.education);
  const [certifications, setCertifications] = useState(fallbackData.certifications);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const [profRes, skillsRes, projRes, eduRes, certRes] = await Promise.allSettled([
          api.getProfile(),
          api.getSkills(),
          api.getProjects(),
          api.getEducation(),
          api.getCertifications()
        ]);

        if (profRes.status === 'fulfilled' && profRes.value.data) {
          setProfile(profRes.value.data);
        }
        if (skillsRes.status === 'fulfilled' && skillsRes.value.data?.length > 0) {
          setSkills(skillsRes.value.data);
        }
        if (projRes.status === 'fulfilled' && projRes.value.data?.length > 0) {
          setProjects(projRes.value.data);
        }
        if (eduRes.status === 'fulfilled' && eduRes.value.data?.length > 0) {
          setEducation(eduRes.value.data);
        }
        if (certRes.status === 'fulfilled' && certRes.value.data?.length > 0) {
          setCertifications(certRes.value.data);
        }
      } catch (err) {
        console.warn('Backend unavailable, using initial resume cache', err);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolioData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        <Hero profile={profile} />
        <About profile={profile} />
        <JourneyFlow />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <EducationCertifications education={education} certifications={certifications} />
        <Contact profile={profile} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
