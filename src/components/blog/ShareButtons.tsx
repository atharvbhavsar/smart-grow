"use client";

import React from "react";
import { Share2, MessageSquare } from "lucide-react";

interface ShareButtonsProps {
  postTitle: string;
}

export default function ShareButtons({ postTitle }: ShareButtonsProps) {
  const handleXShare = () => {
    if (typeof window !== "undefined") {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          window.location.href
        )}&text=${encodeURIComponent(postTitle)}`,
        "_blank"
      );
    }
  };

  const handleLinkedInShare = () => {
    if (typeof window !== "undefined") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          window.location.href
        )}`,
        "_blank"
      );
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleXShare}
        className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-600 hover:text-slate-900 transition-all cursor-pointer flex items-center justify-center"
        aria-label="Share on X"
      >
        <Share2 className="h-4 w-4" />
      </button>
      <button
        onClick={handleLinkedInShare}
        className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-600 hover:text-slate-900 transition-all cursor-pointer flex items-center justify-center"
        aria-label="Share on LinkedIn"
      >
        <MessageSquare className="h-4 w-4" />
      </button>
      <button
        onClick={handleCopyLink}
        className="text-xs font-extrabold uppercase tracking-wider px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
      >
        Copy Link
      </button>
    </div>
  );
}
