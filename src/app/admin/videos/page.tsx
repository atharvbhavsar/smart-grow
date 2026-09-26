"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Shield,
  Upload,
  Film,
  Eye,
  Trash2,
  Lock,
  Globe,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  UserCheck,
  RefreshCw,
  Folder,
  Layers,
} from "lucide-react";
import SecureVideoPlayer from "@/components/video/SecureVideoPlayer";

interface VideoItem {
  _id: string;
  title: string;
  description?: string;
  cloudinaryPublicId: string;
  format: string;
  duration: number;
  width: number;
  height: number;
  bytes: number;
  thumbnailUrl?: string;
  folder: string;
  isProtected: boolean;
  isPublished: boolean;
  allowedRoles: string[];
  activeSessions?: number;
  createdAt: string;
}

interface AuditItem {
  _id: string;
  videoTitle?: string;
  videoPublicId?: string;
  action: string;
  userEmail?: string;
  ipAddress?: string;
  timestamp: string;
  details?: Record<string, any>;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditItem[]>([]);
  const [activeSessionsCount, setActiveSessionsCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"library" | "upload" | "audit">("library");

  // Selected Video for Live Stream Testing
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Upload Form State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [folder, setFolder] = useState<string>("smartlygrow/videos/general");
  const [isProtected, setIsProtected] = useState<boolean>(true);
  const [isPublished, setIsPublished] = useState<boolean>(true);
  const [allowedRoles, setAllowedRoles] = useState<string>("admin,client,member");
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Fetch Videos & Audit
  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const [vRes, aRes] = await Promise.all([
        fetch("/api/admin/videos"),
        fetch("/api/admin/videos/audit?limit=30"),
      ]);

      const vJson = await vRes.json();
      const aJson = await aRes.json();

      if (vJson.success) setVideos(vJson.data);
      if (aJson.success) {
        setAuditLogs(aJson.data.logs || []);
        setActiveSessionsCount(aJson.data.activeCount || 0);
      }
    } catch (err) {
      console.error("Failed to load admin video data", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Handle Video Upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile || !title) {
      setUploadStatus({ success: false, message: "Please select a video file and provide a title." });
      return;
    }

    try {
      setUploading(true);
      setUploadStatus(null);

      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("folder", folder);
      formData.append("isProtected", isProtected.toString());
      formData.append("isPublished", isPublished.toString());
      formData.append("allowedRoles", allowedRoles);

      const res = await fetch("/api/admin/videos", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Upload failed");
      }

      setUploadStatus({
        success: true,
        message: "Video uploaded, HLS profile encoded, and registered in MongoDB!",
      });

      // Reset form
      setUploadFile(null);
      setTitle("");
      setDescription("");
      fetchVideos();
      setActiveTab("library");
    } catch (err: any) {
      setUploadStatus({
        success: false,
        message: err.message || "Failed to process video.",
      });
    } finally {
      setUploading(false);
    }
  };

  // Handle Video Delete
  const handleDelete = async (videoId: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"? This will destroy the Cloudinary video asset and revoke all active playback sessions.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/videos/${videoId}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        if (selectedVideo?._id === videoId) setSelectedVideo(null);
        fetchVideos();
      } else {
        alert(json.error || "Delete failed");
      }
    } catch (err) {
      alert("Error deleting video asset.");
    }
  };

  // Toggle Video Protection
  const handleToggleProtection = async (video: VideoItem) => {
    try {
      const res = await fetch(`/api/admin/videos/${video._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isProtected: !video.isProtected }),
      });
      if (res.ok) fetchVideos();
    } catch (err) {
      console.error("Failed to toggle protection", err);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 bg-blue-950/60 border border-blue-800/40 px-3 py-1 rounded-full w-fit mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Cloudinary + MongoDB Video Security Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Secure Video Management & Playback
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Zero AWS architecture • Signed HLS adaptive streams • Dynamic forensic watermarking • Active session auditing
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-center">
              <div className="text-xs text-slate-400">Total Videos</div>
              <div className="text-lg font-bold text-white">{videos.length}</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-center">
              <div className="text-xs text-slate-400">Active Streams</div>
              <div className="text-lg font-bold text-emerald-400">{activeSessionsCount}</div>
            </div>
            <button
              onClick={fetchVideos}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 hover:text-white transition-all"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 my-6 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab("library")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "library"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Film className="w-4 h-4" />
            Video Library ({videos.length})
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "upload"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload Protected Video
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "audit"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Activity className="w-4 h-4" />
            Audit Logs ({auditLogs.length})
          </button>
        </div>

        {/* Live Stream Test Modal / Panel */}
        {selectedVideo && (
          <div className="mb-10 bg-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">
                  Live Protected Playback Test: {selectedVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg"
              >
                Close Preview
              </button>
            </div>

            <div className="max-w-4xl mx-auto">
              <SecureVideoPlayer
                videoId={selectedVideo._id}
                title={selectedVideo.title}
                userEmail="admin@smartlygrow.in"
                userRole="admin"
                autoPlay={false}
              />
            </div>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <div>
                <span className="font-semibold text-slate-300">Public ID:</span> {selectedVideo.cloudinaryPublicId}
              </div>
              <div>
                <span className="font-semibold text-slate-300">Format:</span> HLS (.m3u8) Adaptive HD
              </div>
              <div>
                <span className="font-semibold text-slate-300">Security:</span> Signed token + Dynamic Watermark + Heartbeat
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: Video Library */}
        {activeTab === "library" && (
          <div>
            {loading ? (
              <div className="py-20 text-center text-slate-400">Loading video library...</div>
            ) : videos.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
                <Film className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">No Videos Found</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">
                  Upload your first video to store it securely in Cloudinary and MongoDB.
                </p>
                <button
                  onClick={() => setActiveTab("upload")}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl"
                >
                  Upload Video
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((v) => (
                  <div
                    key={v._id}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col transition-all group"
                  >
                    {/* Thumbnail / Header */}
                    <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
                      {v.thumbnailUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={v.thumbnailUrl}
                          alt={v.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <Film className="w-12 h-12 text-slate-700" />
                      )}

                      {/* Protection Badge */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-semibold text-emerald-400 border border-white/10">
                        {v.isProtected ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                        <span>{v.isProtected ? "Protected (HLS)" : "Public"}</span>
                      </div>

                      {/* Play Preview Button */}
                      <button
                        onClick={() => setSelectedVideo(v)}
                        className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all cursor-pointer"
                        title="Test Secure Playback"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mb-1">
                          <Folder className="w-3 h-3 text-blue-400" />
                          <span className="truncate">{v.folder}</span>
                        </div>
                        <h3 className="font-bold text-white text-sm line-clamp-1">{v.title}</h3>
                        {v.description && (
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{v.description}</p>
                        )}
                      </div>

                      {/* Metadata row */}
                      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                        <div>
                          {v.duration ? `${Math.round(v.duration)}s` : "Video"} • {(v.bytes / (1024 * 1024)).toFixed(1)} MB
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleProtection(v)}
                            className={`p-1.5 rounded-lg border text-xs transition-colors ${
                              v.isProtected
                                ? "bg-emerald-950/50 border-emerald-800/40 text-emerald-400"
                                : "bg-slate-800 border-slate-700 text-slate-400"
                            }`}
                            title="Toggle Protected Mode"
                          >
                            <Lock className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(v._id, v.title)}
                            className="p-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/30 rounded-lg text-rose-400 transition-colors"
                            title="Delete Video"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Upload Video */}
        {activeTab === "upload" && (
          <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-2">Upload Protected Video</h2>
            <p className="text-xs text-slate-400 mb-6">
              Videos are uploaded directly to Cloudinary, encoded with multi-bitrate HLS streaming, and stored as metadata in MongoDB.
            </p>

            {uploadStatus && (
              <div
                className={`mb-6 p-4 rounded-xl text-xs flex items-center gap-3 border ${
                  uploadStatus.success
                    ? "bg-emerald-950/50 border-emerald-800 text-emerald-300"
                    : "bg-rose-950/50 border-rose-800 text-rose-300"
                }`}
              >
                {uploadStatus.success ? (
                  <CheckCircle className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{uploadStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-4">
              {/* File input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Video File (MP4, MOV, WEBM)
                </label>
                <input
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-slate-300 bg-slate-950 border border-slate-800 rounded-xl p-3 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Masterclass: AI Automation Pipeline"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of video content..."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Cloudinary Folder */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Cloudinary Folder
                </label>
                <select
                  value={folder}
                  onChange={(e) => setFolder(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="smartlygrow/videos/about">smartlygrow/videos/about</option>
                  <option value="smartlygrow/videos/services">smartlygrow/videos/services</option>
                  <option value="smartlygrow/videos/projects">smartlygrow/videos/projects</option>
                  <option value="smartlygrow/videos/testimonials">smartlygrow/videos/testimonials</option>
                  <option value="smartlygrow/videos/marketing">smartlygrow/videos/marketing</option>
                  <option value="smartlygrow/videos/training">smartlygrow/videos/training</option>
                  <option value="smartlygrow/videos/general">smartlygrow/videos/general</option>
                </select>
              </div>

              {/* Allowed Roles */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Allowed Roles (comma-separated)
                </label>
                <input
                  type="text"
                  value={allowedRoles}
                  onChange={(e) => setAllowedRoles(e.target.value)}
                  placeholder="admin,client,member,all"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Switches */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isProtected}
                    onChange={(e) => setIsProtected(e.target.checked)}
                    className="rounded text-blue-600 bg-slate-950 border-slate-800"
                  />
                  <span>Enable HLS Signed Protection</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="rounded text-blue-600 bg-slate-950 border-slate-800"
                  />
                  <span>Publish Immediately</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/25"
              >
                {uploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Uploading & Encoding HLS Stream...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload & Secure Video</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: Audit Logs */}
        {activeTab === "audit" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Security & Playback Audit Trail</h2>
              <button
                onClick={fetchVideos}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </button>
            </div>

            {auditLogs.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-500">No audit logs recorded yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Action</th>
                      <th className="p-3">User / Identity</th>
                      <th className="p-3">Video</th>
                      <th className="p-3">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                    {auditLogs.map((log) => (
                      <tr key={log._id} className="hover:bg-slate-800/30">
                        <td className="p-3 text-slate-400 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                              log.action === "playback_granted"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-800/50"
                                : log.action === "playback_denied"
                                ? "bg-rose-950 text-rose-400 border border-rose-800/50"
                                : "bg-blue-950 text-blue-400 border border-blue-800/50"
                            }`}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td className="p-3 text-slate-300">{log.userEmail || "anonymous"}</td>
                        <td className="p-3 text-slate-300">{log.videoTitle || log.videoPublicId || "-"}</td>
                        <td className="p-3 text-slate-500">{log.ipAddress || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
