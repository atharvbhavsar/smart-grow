"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Hls from "hls.js";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Shield,
  Loader2,
  AlertCircle,
  Settings,
  RefreshCw,
} from "lucide-react";

export interface SecureVideoPlayerProps {
  videoId: string;
  autoPlay?: boolean;
  poster?: string;
  title?: string;
  className?: string;
  userEmail?: string;
  userRole?: string;
  onEnded?: () => void;
}

interface PlaybackData {
  videoId: string;
  title?: string;
  playbackUrl: string;
  thumbnailUrl?: string;
  expiresAt: string;
  expiresInSeconds: number;
  sessionToken: string;
  sessionId: string;
  watermark: {
    userEmail: string;
    sessionId: string;
    text: string;
  };
}

export default function SecureVideoPlayer({
  videoId,
  autoPlay = false,
  poster,
  title,
  className = "",
  userEmail,
  userRole,
  onEnded,
}: SecureVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  // States
  const [playbackData, setPlaybackData] = useState<PlaybackData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [qualities, setQualities] = useState<{ id: number; height: number; bitrate: number }[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1); // -1 = Auto
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Watermark Roaming Coordinates
  const [watermarkPos, setWatermarkPos] = useState<{ top: string; left: string }>({
    top: "15%",
    left: "15%",
  });

  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null);

  // Roaming watermark effect (moves every 14 seconds)
  useEffect(() => {
    const positions = [
      { top: "12%", left: "10%" },
      { top: "12%", left: "60%" },
      { top: "75%", left: "10%" },
      { top: "75%", left: "55%" },
      { top: "45%", left: "30%" },
    ];
    let posIndex = 0;

    const interval = setInterval(() => {
      posIndex = (posIndex + 1) % positions.length;
      setWatermarkPos(positions[posIndex]);
    }, 14000);

    return () => clearInterval(interval);
  }, []);

  // Fetch short-lived signed playback access
  const fetchPlaybackAccess = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const headers: Record<string, string> = {};
      if (userEmail) headers["x-user-email"] = userEmail;
      if (userRole) headers["x-user-role"] = userRole;

      const res = await fetch(`/api/videos/${encodeURIComponent(videoId)}/playback`, {
        headers,
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to authorize video playback.");
      }

      setPlaybackData(json.data);
      return json.data as PlaybackData;
    } catch (err: any) {
      setError(err.message || "Unable to load protected video stream.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [videoId, userEmail, userRole]);

  // Initialize playback and HLS stream
  useEffect(() => {
    let isMounted = true;

    async function initStream() {
      const data = await fetchPlaybackAccess();
      if (!data || !isMounted || !videoRef.current) return;

      const video = videoRef.current;
      const streamUrl = data.playbackUrl;

      // Clean up previous HLS instance
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90,
        });

        hls.loadSource(streamUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, (_, parsedData) => {
          if (!isMounted) return;
          const levels = parsedData.levels.map((lvl, index) => ({
            id: index,
            height: lvl.height,
            bitrate: lvl.bitrate,
          }));
          setQualities(levels);

          if (autoPlay) {
            video.play().catch(() => {
              // Browser autoplay policy prevented unmute play
              setIsPlaying(false);
            });
          }
        });

        hls.on(Hls.Events.ERROR, (_, errData) => {
          if (errData.fatal) {
            switch (errData.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.warn("[HLS Network Error] Attempting recovery...");
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.warn("[HLS Media Error] Attempting recovery...");
                hls.recoverMediaError();
                break;
              default:
                console.error("[HLS Fatal Error]", errData);
                hls.destroy();
                setError("Stream error. Please refresh the player.");
                break;
            }
          }
        });

        hlsRef.current = hls;
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native Safari/iOS HLS
        video.src = streamUrl;
        if (autoPlay) {
          video.play().catch(() => setIsPlaying(false));
        }
      } else {
        setError("Your browser does not support secure HLS video playback.");
      }
    }

    initStream();

    return () => {
      isMounted = false;
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [videoId, fetchPlaybackAccess, autoPlay]);

  // Periodic Heartbeat & Auto Token Refresh
  useEffect(() => {
    if (!playbackData) return;

    // Heartbeat every 45 seconds to keep MongoDB session alive
    const heartbeatInterval = setInterval(async () => {
      try {
        await fetch(`/api/videos/${encodeURIComponent(videoId)}/heartbeat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionToken: playbackData.sessionToken,
            sessionId: playbackData.sessionId,
          }),
        });
      } catch (e) {
        console.warn("[Heartbeat Ping Failed]", e);
      }
    }, 45000);

    // Refresh token at 80% of its lifetime
    const refreshDelayMs = Math.max(
      60000,
      (playbackData.expiresInSeconds || 600) * 0.8 * 1000
    );

    const refreshTimeout = setTimeout(() => {
      fetchPlaybackAccess();
    }, refreshDelayMs);

    return () => {
      clearInterval(heartbeatInterval);
      clearTimeout(refreshTimeout);
    };
  }, [playbackData, videoId, fetchPlaybackAccess]);

  // Video Event Handlers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuteState = !isMuted;
    videoRef.current.muted = newMuteState;
    setIsMuted(newMuteState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleQualityChange = (levelId: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = levelId;
      setCurrentQuality(levelId);
      setShowSettings(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className={`relative group bg-black rounded-2xl overflow-hidden shadow-2xl select-none flex items-center justify-center aspect-video w-full ${className}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        poster={poster || playbackData?.thumbnailUrl}
        playsInline
        controlsList="nodownload noremoteplayback"
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            setDuration(videoRef.current.duration || 0);
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          if (onEnded) onEnded();
        }}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Dynamic Roaming Forensic Watermark */}
      {playbackData && (
        <div
          style={{
            top: watermarkPos.top,
            left: watermarkPos.left,
            transition: "top 3s ease-in-out, left 3s ease-in-out",
          }}
          className="absolute z-20 pointer-events-none select-none text-[11px] sm:text-xs font-mono font-bold text-white/35 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] bg-black/20 px-2.5 py-1 rounded backdrop-blur-[1px] border border-white/10"
        >
          {playbackData.watermark.text}
        </div>
      )}

      {/* Protected Stream Badge */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium text-emerald-400">
        <Shield className="w-3.5 h-3.5" />
        <span>HLS Protected</span>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-30 bg-black/75 flex flex-col items-center justify-center text-white">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
          <p className="text-xs sm:text-sm font-medium text-slate-300">
            Authorizing Secure Stream...
          </p>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 z-30 bg-black/90 flex flex-col items-center justify-center text-white p-6 text-center">
          <AlertCircle className="w-10 h-10 text-rose-500 mb-3" />
          <h4 className="text-base font-bold text-white">Playback Access Denied</h4>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mt-1 mb-4">{error}</p>
          <button
            onClick={() => fetchPlaybackAccess()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Stream
          </button>
        </div>
      )}

      {/* Custom Sleek Controls */}
      {!loading && !error && (
        <div
          className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4 transition-opacity duration-300 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Seekbar */}
          <div className="relative mb-2.5 flex items-center group/seek">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/25 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:h-2 transition-all"
            />
          </div>

          {/* Buttons Row */}
          <div className="flex items-center justify-between text-white text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              {/* Volume */}
              <div className="flex items-center gap-1.5 group/vol">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-white/25 rounded-lg appearance-none cursor-pointer accent-white opacity-80 group-hover/vol:opacity-100"
                />
              </div>

              {/* Time Display */}
              <div className="font-mono text-slate-300 text-[11px] sm:text-xs">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Quality Settings */}
              {qualities.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-1 text-[11px] sm:text-xs font-medium text-slate-200"
                  >
                    <Settings className="w-4 h-4" />
                    <span>
                      {currentQuality === -1
                        ? "Auto"
                        : `${qualities[currentQuality]?.height}p`}
                    </span>
                  </button>

                  {showSettings && (
                    <div className="absolute right-0 bottom-full mb-2 bg-slate-900/95 border border-slate-700 rounded-xl py-1 shadow-2xl backdrop-blur-md min-w-[120px] z-40 text-xs">
                      <div className="px-3 py-1 font-semibold text-slate-400 border-b border-slate-800 text-[10px] uppercase tracking-wider">
                        Quality
                      </div>
                      <button
                        onClick={() => handleQualityChange(-1)}
                        className={`w-full text-left px-3 py-1.5 hover:bg-blue-600/30 flex items-center justify-between ${
                          currentQuality === -1 ? "text-blue-400 font-bold" : "text-slate-300"
                        }`}
                      >
                        <span>Auto</span>
                        {currentQuality === -1 && <span>✓</span>}
                      </button>
                      {qualities.map((q) => (
                        <button
                          key={q.id}
                          onClick={() => handleQualityChange(q.id)}
                          className={`w-full text-left px-3 py-1.5 hover:bg-blue-600/30 flex items-center justify-between ${
                            currentQuality === q.id ? "text-blue-400 font-bold" : "text-slate-300"
                          }`}
                        >
                          <span>{q.height}p</span>
                          {currentQuality === q.id && <span>✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                aria-label="Toggle Fullscreen"
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5" />
                ) : (
                  <Maximize2 className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
