"use client";

import React from "react";

export default function LogoAnimationVideo() {
  return (
    <div className="relative group max-w-[400px] w-full aspect-square flex items-center justify-center select-none">
      {/* Ambient glow wrap */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl opacity-10 blur-xl group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" />
      
      {/* Video Container Card */}
      <div 
        className="relative w-full h-full rounded-3xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center p-4 hover:shadow-md hover:border-slate-200 transition-all duration-300 select-none"
        onContextMenu={(e) => e.preventDefault()}
      >
        <video 
          src="/smartlygrow-logo-animation.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="metadata"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="w-full h-full object-contain pointer-events-none select-none rounded-2xl"
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* Transparent top overlay to completely block interaction, downloading, or right-clicks */}
        <div 
          className="absolute inset-0 z-20 cursor-default" 
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}
