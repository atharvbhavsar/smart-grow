"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
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
import { teamProfiles } from "@/data/teamData";
import { projects } from "@/data/siteData";
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Simple Animated Counter for Achievements
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const duration = 1200; // 1.2 seconds total duration
    const stepTime = Math.max(Math.floor(duration / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 40); // Increment proportionally
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

export default function TeamMemberPage({ params }: PageProps) {
  const { slug } = use(params);
  const profile = teamProfiles[slug];

  if (!profile) {
    notFound();
  }

  // Retrieve featured projects contributed to by this member
  const memberProjects = projects.filter((p) => profile.projectIds.includes(p.id));

  return (
    <main className="flex-1 bg-white font-sans text-slate-900 pt-28 pb-20">
      
      {/* Header Navigation Back */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
        <Link 
          href="/about" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to About Us
        </Link>
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 sm:p-12 relative overflow-hidden">
          {/* Ambient background glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
            {/* Left text panel */}
            <div className="lg:col-span-7 text-left order-2 lg:order-1">
              {profile.availability && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/50 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {profile.availability}
                </span>
              )}
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-none mb-3">
                {profile.name}
              </h1>
              <p className="text-blue-600 text-sm sm:text-base font-extrabold uppercase tracking-widest mb-6">
                {profile.role}
              </p>
              <p className="text-slate-550 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-medium">
                {profile.introduce}
              </p>

              {/* Key Quick Stats */}
              <div className="grid grid-cols-2 gap-4 max-w-md pt-6 border-t border-slate-200/60">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Years of Experience
                  </span>
                  <span className="text-slate-800 text-sm font-extrabold uppercase tracking-wide">
                    {profile.experienceYears}+ Years
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Startup Capacity
                  </span>
                  <span className="text-slate-800 text-sm font-extrabold uppercase tracking-wide">
                    {profile.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Image/Avatar Panel */}
            <div className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2">
              <div className="relative group">
                {/* Glow wrap */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl opacity-15 blur-md group-hover:opacity-25 transition-opacity duration-300 pointer-events-none" />
                <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl overflow-hidden bg-slate-950 border border-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={profile.image} 
                    alt={profile.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
              </div>

              {/* Social links row */}
              <div className="flex items-center gap-3 mt-6">
                {profile.socials.linkedin && (
                  <a 
                    href={profile.socials.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 hover:border-blue-200/50 transition-all cursor-pointer"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {profile.socials.github && (
                  <a 
                    href={profile.socials.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-600 hover:text-slate-950 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {profile.socials.twitter && (
                  <a 
                    href={profile.socials.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-600 hover:text-blue-500 hover:bg-blue-50/50 hover:border-blue-200/50 transition-all cursor-pointer"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {profile.socials.behance && (
                  <a 
                    href={profile.socials.behance} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 hover:border-blue-200/50 transition-all cursor-pointer"
                  >
                    <Award className="h-5 w-5" />
                  </a>
                )}
                {profile.socials.dribbble && (
                  <a 
                    href={profile.socials.dribbble} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-600 hover:text-pink-500 hover:bg-pink-50/50 hover:border-pink-200/50 transition-all cursor-pointer"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Philosophy Segment */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-16 border-b border-slate-100 pb-16">
          <div className="md:col-span-7 text-left">
            <span className="text-blue-600 text-[10px] font-extrabold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full inline-block mb-4">
              Professional Story
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-4">
              Core Overview
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-4 font-medium">
              {profile.aboutText}
            </p>
          </div>
          <div className="md:col-span-5 text-left bg-slate-50/30 border border-slate-100 p-8 rounded-2xl">
            <span className="text-blue-600 text-[10px] font-extrabold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full inline-block mb-4">
              Mission Statement
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 mb-3 tracking-tight">
              Work Philosophy
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold italic">
              &quot;{profile.philosophy}&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Counters (No Counter packages needed, simple setInterval hook) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {profile.achievements.map((ach, idx) => (
            <div key={idx} className="bg-slate-50/40 border border-slate-100 rounded-2xl p-6 text-center shadow-2xs">
              <AnimatedCounter value={ach.value} suffix={ach.suffix} />
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-2">
                {ach.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Expertise Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="text-left mb-12">
          <span className="text-blue-600 text-[10px] font-extrabold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full inline-block mb-3">
            Core Competency
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Skills & Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profile.skills.map((skill, sidx) => (
            <div key={sidx} className="text-left bg-white border border-slate-150/60 p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide block mb-0.5">
                    {skill.category}
                  </span>
                  <span className="text-sm font-extrabold text-slate-800">
                    {skill.name}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                  {skill.level}%
                </span>
              </div>
              {/* Animated Progress Bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Primary Agency Responsibilities */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="text-left mb-10">
          <span className="text-blue-600 text-[10px] font-extrabold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full inline-block mb-3">
            Role at SmartlyGrow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Core Responsibilities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {profile.responsibilities.map((resp, idx) => {
            const Icon = iconMap[resp.icon] || Cpu;
            return (
              <div key={idx} className="bg-white border border-slate-150/70 p-6 rounded-2xl text-left flex gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl h-11 w-11 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-snug mb-1">
                    {resp.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold">
                    {resp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Combined Experience & Education Timeline */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          
          {/* Column 1: Experience */}
          <div className="text-left">
            <div className="flex items-center gap-3.5 mb-10">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Briefcase className="h-5 w-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                Work History
              </h2>
            </div>

            <div className="space-y-6 relative pl-6 border-l border-slate-100">
              {profile.experienceList.map((exp, eidx) => (
                <div key={eidx} className="relative group">
                  {/* Bullet */}
                  <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-[2.5px] border-blue-600 bg-white group-hover:bg-blue-600 transition-colors" />
                  
                  <div className="bg-white border border-slate-150/60 p-5 rounded-2xl shadow-2xs">
                    <span className="text-[10px] font-extrabold text-slate-400 block mb-1">
                      {exp.duration}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-950 tracking-tight">
                      {exp.position}
                    </h3>
                    <p className="text-blue-600 text-xs font-bold mt-0.5 mb-3">
                      {exp.organization}
                    </p>
                    
                    {exp.responsibilities && (
                      <ul className="space-y-2 mt-2 border-t border-slate-50 pt-3">
                        {exp.responsibilities.map((r, ri) => (
                          <li key={ri} className="flex gap-2 text-xs text-slate-500 font-medium leading-relaxed">
                            <ChevronRight className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Education */}
          <div className="text-left">
            <div className="flex items-center gap-3.5 mb-10">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                Education & Credentials
              </h2>
            </div>

            <div className="space-y-6 relative pl-6 border-l border-slate-100">
              {profile.education.map((edu, edIdx) => (
                <div key={edIdx} className="relative group">
                  {/* Bullet */}
                  <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-[2.5px] border-blue-600 bg-white group-hover:bg-blue-600 transition-colors" />

                  <div className="bg-white border border-slate-150/60 p-5 rounded-2xl shadow-2xs">
                    <span className="text-[10px] font-extrabold text-slate-400 block mb-1">
                      Class of {edu.year}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-950 tracking-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-blue-600 text-xs font-bold mt-0.5">
                      {edu.institution}
                    </p>
                    {edu.specialization && (
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mt-2">
                        Spec: {edu.specialization}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Featured Projects Contributed To */}
      {memberProjects.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
          <div className="text-left mb-10">
            <span className="text-blue-600 text-[10px] font-extrabold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full inline-block mb-3">
              Contribution History
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Featured Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {memberProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs flex flex-col justify-between group text-left"
              >
                {/* Visual Thumbnail */}
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-900 border-b border-slate-100 flex items-center justify-center">
                  {project.image.endsWith(".mp4") ? (
                    <video 
                      src={project.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain bg-black"
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm font-mono">
                    {project.beforeAfterMetrics?.growthPercentages?.revenue || "+380%"}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full inline-block mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                      {project.companyName}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-semibold mb-5 line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>

                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.servicesBuilt.slice(0, 3).map((tech) => (
                        <span key={tech} className="bg-slate-100/80 text-slate-600 text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md border border-slate-200/50">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      {project.liveUrl ? (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-extrabold text-slate-900 hover:text-blue-600 flex items-center gap-1 group/btn cursor-pointer"
                        >
                          <span>View Website</span>
                          <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:scale-115" />
                        </a>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Internal Specs
                        </span>
                      )}
                      
                      <Link 
                        href={`/portfolio/${project.id}`} 
                        className="text-xs font-extrabold text-blue-600 flex items-center gap-1.5 group/btn cursor-pointer"
                      >
                        <span>View Project Detail</span>
                        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technologies Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="text-left mb-10">
          <span className="text-blue-600 text-[10px] font-extrabold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full inline-block mb-3">
            Core Toolkit
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Mastered Technologies
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {profile.technologies.map((tech, idx) => (
            <div key={idx} className="bg-slate-50/40 border border-slate-100 p-4 rounded-xl text-center shadow-2xs">
              <span className="text-[9px] font-extrabold text-slate-400 block mb-0.5 uppercase tracking-wider">
                {tech.category}
              </span>
              <span className="text-sm font-extrabold text-slate-800">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Mapped */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="text-left mb-10">
          <span className="text-blue-600 text-[10px] font-extrabold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full inline-block mb-3">
            What I Deliver
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Services Provided
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {profile.services.map((ser, sIdx) => {
            const Icon = iconMap[ser.icon] || Sparkles;
            return (
              <div key={sIdx} className="bg-gradient-to-b from-white to-slate-50/30 border border-slate-200/80 p-6 rounded-2xl text-left group hover:border-blue-600/30 transition-all duration-300">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl h-11 w-11 flex items-center justify-center shrink-0 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">
                  {ser.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                  {ser.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Dynamic Profile CTA / Contact Block */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Connect Directly with {profile.name.split(" ")[0]}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 font-medium">
            Have a project in mind or need expert consulting? Schedule a direct discussion to align on specifications.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-slate-300 font-mono text-xs sm:text-sm">
              <Mail className="h-4 w-4 text-blue-500" />
              <span>{profile.contact.email}</span>
            </div>
            {profile.contact.phone && (
              <div className="flex items-center gap-2 text-slate-300 font-mono text-xs sm:text-sm">
                <Phone className="h-4 w-4 text-blue-500" />
                <span>{profile.contact.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-slate-300 font-mono text-xs sm:text-sm">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span>{profile.contact.location}</span>
            </div>
          </div>

          <div className="flex justify-center">
            {profile.contact.phone ? (
              <a 
                href={`https://wa.me/${profile.contact.phone.replace(/[^0-9]/g, "")}?text=Hello%20${profile.name.split(" ")[0]},%20I%20would%20like%20to%20consult%20on%20a%20project.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-full px-8 py-3.5 cursor-pointer shadow-lg hover:shadow-blue-500/25 transition-all">
                  Consult on WhatsApp
                </Button>
              </a>
            ) : (
              <Link href="/contact">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-full px-8 py-3.5 cursor-pointer shadow-lg hover:shadow-blue-500/25 transition-all">
                  Book a Consultation
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
