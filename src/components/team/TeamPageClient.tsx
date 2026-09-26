"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Code2, Megaphone, ShieldCheck } from "lucide-react";
import { teamProfiles, TeamMemberProfile } from "@/data/teamData";

interface DepartmentGroup {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  badgeColor: string;
  members: TeamMemberProfile[];
}

export default function TeamPageClient() {
  const leadershipSlugs = ["aashish-jhumle", "janhavi"];
  const marketingSlugs = ["aryan-deshmukh", "sudhir-swami"];
  const developmentSlugs = ["sajan-bhoyar", "atharv-bhavsar", "hemant-bhoyar"];

  const leadershipMembers: TeamMemberProfile[] = leadershipSlugs
    .map((s) => teamProfiles[s])
    .filter(Boolean);

  const marketingMembers: TeamMemberProfile[] = marketingSlugs
    .map((s) => teamProfiles[s])
    .filter(Boolean);

  const developmentMembers: TeamMemberProfile[] = developmentSlugs
    .map((s) => teamProfiles[s])
    .filter(Boolean);

  const departments: DepartmentGroup[] = [
    {
      id: "marketing",
      title: "Marketing Team",
      subtitle: "Strategy, Growth & Brand",
      icon: Megaphone,
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
      members: marketingMembers,
    },
    {
      id: "development",
      title: "Development Team",
      subtitle: "Technology, Engineering & Digital Products",
      icon: Code2,
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80",
      members: developmentMembers,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-600 selection:text-white pb-20 relative">
      <div className="relative z-10">

        {/* Top Breadcrumb / Return to Home Bar */}
        <div className="pt-24 sm:pt-28 pb-3 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-xs w-fit group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center pt-2 pb-10 sm:pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-blue-600 mb-3 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            OUR TEAM
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
            People Behind the Work
          </h1>
          
          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            Meet the people who bring strategy, creativity, technology, and innovation together to build meaningful digital experiences.
          </p>
        </section>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">

          {/* SECTION 1: LEADERSHIP TEAM */}
          <section>
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 mb-6 pb-2.5 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest mb-1 shadow-xs">
                  <ShieldCheck className="h-3 w-3 text-blue-400" />
                  Executive
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  Leadership Team
                </h2>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-400 sm:text-right">
                Setting vision, strategic roadmap, and client success architectures.
              </p>
            </div>

            {/* 2-Column Grid on Mobile */}
            <div className="grid grid-cols-2 max-w-xs sm:max-w-md md:max-w-lg mx-auto gap-3 sm:gap-6">
              {leadershipMembers.map((member) => (
                <Link
                  key={member.slug}
                  href={`/team/${member.slug}`}
                  className="group block w-full"
                >
                  <div className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 bg-white border border-slate-200/80 cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Role Badge */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                      <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                        {member.role}
                      </span>
                    </div>

                    {/* Bottom Floating Panel */}
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 bg-white/95 backdrop-blur-md px-2.5 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-md">
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-950 uppercase tracking-wide truncate group-hover:text-blue-600 transition-colors">
                        {member.name}
                      </h4>
                      <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* DEPARTMENT SECTIONS */}
          {departments.map((dept) => {
            const DeptIcon = dept.icon;
            return (
              <section key={dept.id}>
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 mb-6 pb-2.5 border-b border-slate-100">
                  <div>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest mb-1 ${dept.badgeColor}`}>
                      <DeptIcon className="h-3 w-3" />
                      Department
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                      {dept.title}
                    </h2>
                  </div>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-400 sm:text-right">
                    {dept.subtitle}
                  </p>
                </div>

                {/* 2-Column on Mobile, 3-Column on Tablet/Desktop for 3 members */}
                <div className={`grid grid-cols-2 ${dept.members.length >= 3 ? "sm:grid-cols-3 max-w-2xl" : "max-w-xs sm:max-w-md md:max-w-lg"} mx-auto gap-3 sm:gap-6`}>
                  {dept.members.map((member) => (
                    <Link
                      key={member.slug}
                      href={`/team/${member.slug}`}
                      className="group block w-full"
                    >
                      <div className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 bg-white border border-slate-200/80 cursor-pointer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={member.image}
                          alt={member.name}
                          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Role Badge */}
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                          <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-950 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-xs border border-white/60">
                            {member.role}
                          </span>
                        </div>

                        {/* Bottom Floating Panel */}
                        <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 bg-white/95 backdrop-blur-md px-2.5 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-md">
                          <h4 className="text-xs sm:text-sm font-extrabold text-slate-950 uppercase tracking-wide truncate group-hover:text-blue-600 transition-colors">
                            {member.name}
                          </h4>
                          <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mt-0.5">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          {/* BOTTOM COLLABORATION CTA */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-lg text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 blur-[70px] rounded-full pointer-events-none" />
            
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-extrabold uppercase tracking-widest text-blue-400 mb-2.5">
              Build With Our Team
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight max-w-lg mx-auto">
              Ready to Build Your Next Digital Growth Engine?
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Our engineers, designers, and growth strategists are ready to turn your operational bottlenecks into high-converting digital assets.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all"
              >
                Book Discovery Call
              </Link>
              <a
                href="https://wa.me/917020951401?text=Hello%20SmartlyGrow%20Team!%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/10 transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
