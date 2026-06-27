import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "h-8", showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* SVG Icon matching the logo style in the PRD image */}
      <svg
        className={`${className} transition-transform duration-300 group-hover:scale-105`}
        viewBox="0 0 250 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "2.2rem", width: "auto" }}
      >
        {/* Dynamic Growth Bars inside the arrow swoop */}
        <rect x="25" y="85" width="22" height="42" rx="4" fill="#0052e0" />
        <rect x="57" y="65" width="22" height="62" rx="4" fill="#0052e0" />
        <rect x="89" y="42" width="22" height="85" rx="4" fill="#0052e0" />

        {/* Thick upward swooshing growth arrow */}
        <path
          d="M15 80C15 125 50 148 100 148C145 148 168 115 174 85"
          stroke="#0066ff"
          strokeWidth="18"
          strokeLinecap="round"
        />
        {/* Arrow head */}
        <path
          d="M135 90L178 70L198 110"
          stroke="#0066ff"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showText && (
        <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-sans">
          Smarty<span className="text-blue-600">Grow</span>
        </span>
      )}
    </div>
  );
}
