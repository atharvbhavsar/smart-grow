"use client";

import React, { useEffect, useRef, useState, useCallback, useId } from "react";
import Hls from "hls.js";
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, Loader2, RefreshCw, AlertCircle } from "lucide-react";

// Global in-memory session playback cache to eliminate duplicate API calls during session
const playbackCache = new Map<string, { data: any; cachedAt: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export interface SmartVideoProps {
  src?: string; // Direct video URL or Cloudinary URL
  videoId?: string; // Cloudinary Video ID for secure signed playback
  poster?: string;
  title?: string;
  aspectRatio?: string; // e.g. "16/9", "9/16", "4/3", "1/1"
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  customControls?: boolean;
  preload?: "none" | "metadata" | "auto";
  lazy?: boolean;
  className?: string;
  onEnded?: () => void;
  userEmail?: string;
}

export default function SmartVideo({
  src,
  videoId,
  poster,
  title = "SmartlyGrow Video",
  aspectRatio = "16/9",
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  customControls = false,
  preload = "metadata",
  lazy = true,
  className = "",
  onEnded,
  userEmail,
}: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const uniqueId = useId();

  const [isInViewport, setIsInViewport] = useState<boolean>(!lazy);
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(src || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMutedState, setIsMutedState] = useState<boolean>(muted || autoPlay);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. Intersection Observer: Prepare video only when near viewport
  useEffect(() => {
    if (!lazy) {
      setIsInViewport(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px 0px" } // Start preparing 250px before entering viewport
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [lazy]);

  // 2. Playback Authorization Fetcher with session cache
  const fetchPlaybackUrl = useCallback(async () => {
    if (!videoId) return src || null;

    // Check memory cache
    const cached = playbackCache.get(videoId);
    if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
      return cached.data.playbackUrl as string;
    }

    try {
      setLoading(true);
      setError(null);
      const headers: Record<string, string> = {};
      if (userEmail) headers["x-user-email"] = userEmail;

      const res = await fetch(`/api/videos/${encodeURIComponent(videoId)}/playback`, { headers });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to authorize video playback.");
      }

      playbackCache.set(videoId, { data: json.data, cachedAt: Date.now() });
      return json.data.playbackUrl as string;
    } catch (err: any) {
      setError(err.message || "Failed to load video stream.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [videoId, src, userEmail]);

  // 3. Initialize Video / HLS Stream
  useEffect(() => {
    if (!isInViewport) return;

    let isMounted = true;

    async function init() {
      let streamUrl: string | null | undefined = src;
      if (videoId) {
        streamUrl = await fetchPlaybackUrl();
      }

      if (!isMounted || !streamUrl || !videoRef.current) return;
      setResolvedSrc(streamUrl);

      const video = videoRef.current;
      const isHls = streamUrl.includes(".m3u8") || streamUrl.includes("/hls/");

      if (isHls && Hls.isSupported()) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }

        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 60,
          maxBufferLength: 30,
        });

        hls.loadSource(streamUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (!isMounted) return;
          if (autoPlay) {
            video.play().catch(() => setIsPlaying(false));
          }
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
              hls.startLoad();
            } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
              hls.recoverMediaError();
            } else {
              hls.destroy();
              setError("Stream error. Click to retry.");
            }
          }
        });

        hlsRef.current = hls;
      } else {
        video.src = streamUrl;
        if (autoPlay) {
          video.play().catch(() => setIsPlaying(false));
        }
      }
    }

    init();

    return () => {
      isMounted = false;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [isInViewport, src, videoId, fetchPlaybackUrl, autoPlay]);

  // Handlers
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMutedState(video.muted);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={customControls ? handleMouseMove : undefined}
      onMouseLeave={customControls ? () => isPlaying && setShowControls(false) : undefined}
      className={`relative overflow-hidden bg-slate-950 rounded-2xl group w-full ${className}`}
      style={{ aspectRatio }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        poster={poster}
        preload={preload}
        muted={isMutedState}
        loop={loop}
        playsInline
        controls={controls && !customControls}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={() => {
          if (videoRef.current) {
            setProgress(videoRef.current.currentTime);
            setDuration(videoRef.current.duration || 0);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          if (onEnded) onEnded();
        }}
        className="w-full h-full object-contain pointer-events-auto cursor-pointer"
      />

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 z-20 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
          <Loader2 className="w-7 h-7 animate-spin text-blue-500 mb-2" />
          <p className="text-xs font-medium text-slate-300">Loading stream...</p>
        </div>
      )}

      {/* Error Fallback */}
      {error && (
        <div className="absolute inset-0 z-20 bg-slate-950/90 flex flex-col items-center justify-center text-white p-4 text-center">
          <AlertCircle className="w-8 h-8 text-rose-500 mb-2" />
          <p className="text-xs sm:text-sm text-slate-300 mb-3">{error}</p>
          <button
            onClick={() => fetchPlaybackUrl()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}

      {/* Custom Sleek Controls (Optional) */}
      {customControls && !loading && !error && (
        <div
          className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 sm:p-4 transition-opacity duration-300 flex items-center justify-between text-white ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <button
              onClick={togglePlay}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              aria-label={isMutedState ? "Unmute" : "Mute"}
            >
              {isMutedState ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
            aria-label="Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      )}
    </div>
  );
}
