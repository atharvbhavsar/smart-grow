"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Linkedin, 
  Github, 
  Twitter, 
  Globe, 
  Sparkles, 
  Check, 
  ExternalLink, 
  ChevronRight, 
  Award, 
  TrendingUp, 
  Palette, 
  Layout, 
  Cpu, 
  Target, 
  Briefcase, 
  GraduationCap 
} from "lucide-react";
import { TeamMemberProfile } from "@/data/teamData";
import { Project } from "@/data/siteData";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<any>> = {
  Target,
  Cpu,
  Palette,
  Layout,
  TrendingUp,
  Sparkles,
  Briefcase,
  GraduationCap
};

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight">
      {count}{suffix}
    </span>
  );
}

export default function TeamMemberClient({ 
  profile, 
  memberProjects 
}: { 
  profile: TeamMemberProfile; 
  memberProjects: Project[]; 
}) {
  return (
    <main className="flex-1 bg-white font-sans text-slate-900 pt-28 pb-20">
      
      {/* Header Navigation Back */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
        <Link 
          href="/about" 
          className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 px-4 py-2 rounded-full transition-all border border-slate-200/60"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Team Directory
        </Link>
      </div>

      {/* Hero Header Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-slate-950 rounded-[32px] p-6 sm:p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Avatar Image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-[28px] overflow-hidden border-4 border-white/10 shadow-2xl bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={profile.image} 
                    alt={`${profile.name} - ${profile.role} at SmartlyGrow Pune`} 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase shadow-lg flex items-center gap-1.5 border border-white/20">
                  <Sparkles className="h-3.5 w-3.5" /> {profile.experienceYears}+ Yrs Exp
                </div>
              </div>
            </div>

            {/* Profile Header Details */}
            <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-extrabold uppercase tracking-widest">
                <Check className="h-3.5 w-3.5" /> {profile.availability}
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight text-white">
                {profile.name}
              </h1>

              <p className="text-xl sm:text-2xl font-bold text-blue-400 tracking-tight">
                {profile.role} & System Specialist
              </p>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                &ldquo;{profile.introText}&rdquo;
              </p>

              {/* Social Links & Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href={`mailto:${profile.contact.email}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer">
                    <Mail className="h-4 w-4" /> Direct Email
                  </Button>
                </a>

                {profile.socials.linkedin && (
                  <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold px-4 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                      <Linkedin className="h-4 w-4 text-blue-400" /> LinkedIn
                    </Button>
                  </a>
                )}

                {profile.socials.github && (
                  <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold px-4 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                      <Github className="h-4 w-4" /> GitHub
                    </Button>
                  </a>
                )}

                {profile.socials.twitter && (
                  <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold px-4 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                      <Twitter className="h-4 w-4 text-blue-400" /> Twitter / X
                    </Button>
                  </a>
                )}
              </div>

              {/* Quick Info Grid */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800/80 mt-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Location Base
                  </span>
                  <span className="text-slate-200 text-sm font-semibold flex items-center justify-center lg:justify-start gap-1">
                    <MapPin className="h-3.5 w-3.5 text-blue-400" /> {profile.contact.location}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Startup Capacity
                  </span>
                  <span className="text-slate-200 text-sm font-extrabold uppercase tracking-wide">
                    {profile.role}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Work Email
                  </span>
                  <a href={`mailto:${profile.contact.email}`} className="text-blue-400 hover:underline text-sm font-semibold truncate block">
                    {profile.contact.email}
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Main Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* About & Philosophy */}
            <section className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Professional Bio
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                About {profile.name}
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {profile.aboutText}
              </p>

              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-blue-600" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-2">
                  Engineering Philosophy
                </span>
                <p className="text-slate-900 font-semibold italic text-base sm:text-lg leading-relaxed">
                  &ldquo;{profile.philosophy}&rdquo;
                </p>
              </div>
            </section>

            {/* Featured Projects Built */}
            {memberProjects.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      Case Studies
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-2">
                      Featured Work & Architecture
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {memberProjects.map((proj) => (
                    <div 
                      key={proj.id}
                      className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md inline-block">
                          {proj.category}
                        </span>
                        <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {proj.companyName}
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                          {proj.tagline}
                        </p>
                      </div>

                      <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                          {proj.beforeAfterMetrics.growthPercentages.revenue} Revenue Growth
                        </span>
                        <Link 
                          href={`/portfolio/${proj.id}`}
                          className="text-xs font-extrabold uppercase tracking-wider text-slate-900 hover:text-blue-600 inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                        >
                          View Impact <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Experience Timeline */}
            <section className="space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Track Record
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Work Experience & Contributions
              </h2>

              <div className="space-y-6">
                {profile.experienceList.map((exp, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-950">{exp.position}</h3>
                        <p className="text-sm font-semibold text-blue-600">{exp.organization}</p>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit">
                        {exp.duration}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2 leading-relaxed">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.technologiesUsed && (
                      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                        <span className="text-[11px] font-extrabold uppercase text-slate-400">Stack:</span>
                        {exp.technologiesUsed.map((tech, tIdx) => (
                          <span key={tIdx} className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Core Achievements Counter */}
            <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-3">
                Key Metrics Achieved
              </h3>

              <div className="space-y-5">
                {profile.achievements.map((ach, idx) => (
                  <div key={idx} className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
                    <div className="text-blue-400">
                      <AnimatedCounter value={ach.value} suffix={ach.suffix} />
                    </div>
                    <span className="text-xs font-bold text-slate-300 tracking-wide block mt-1 uppercase">
                      {ach.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills & Proficiency */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-3">
                Core Competencies
              </h3>

              <div className="space-y-4">
                {profile.skills.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-800">{skill.name}</span>
                      <span className="text-blue-600">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-3">
                Education & Background
              </h3>

              <div className="space-y-4">
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-950">{edu.degree}</h4>
                    <p className="text-xs font-semibold text-blue-600">{edu.institution}</p>
                    {edu.specialization && (
                      <p className="text-xs text-slate-500">{edu.specialization}</p>
                    )}
                    <span className="text-[10px] font-bold text-slate-400 block pt-1">Graduated {edu.year}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

    </main>
  );
}
