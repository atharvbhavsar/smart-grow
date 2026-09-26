"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  UploadCloud,
  Image as ImageIcon,
  Film,
  Trash2,
  Copy,
  Check,
  Search,
  RefreshCw,
  Folder,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Database,
  Cloud,
  Layers,
  Sparkles,
  AlertCircle,
  FileVideo,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MediaItem {
  _id: string;
  publicId: string;
  secureUrl: string;
  resourceType: "image" | "video";
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  duration?: number;
  thumbnailUrl?: string;
  folder?: string;
  altText?: string;
  tags?: string[];
  createdAt: string;
}

const FOLDERS = [
  { id: "all", label: "All Folders" },
  { id: "smartlygrow/team", label: "Team (smartlygrow/team)" },
  { id: "smartlygrow/portfolio", label: "Portfolio (smartlygrow/portfolio)" },
  { id: "smartlygrow/blogs", label: "Blogs (smartlygrow/blogs)" },
  { id: "smartlygrow/services", label: "Services (smartlygrow/services)" },
  { id: "smartlygrow/hero", label: "Hero & Brand (smartlygrow/hero)" },
  { id: "smartlygrow/clients", label: "Clients & Trust (smartlygrow/clients)" },
  { id: "smartlygrow/videos", label: "Videos & Reels (smartlygrow/videos)" },
];

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [selectedType, setSelectedType] = useState<"all" | "image" | "video">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploadFolder, setUploadFolder] = useState("smartlygrow/hero");
  const [altText, setAltText] = useState("");
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedFolder !== "all") params.set("folder", selectedFolder);
      if (selectedType !== "all") params.set("resourceType", selectedType);
      if (searchQuery) params.set("search", searchQuery);

      const res = await fetch(`/api/media?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setMediaList(json.data || []);
      }
    } catch (err) {
      console.error("Failed to load media:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [selectedFolder, selectedType]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMedia();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setStatusMessage(null);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", uploadFolder);
      if (altText) formData.append("altText", altText);

      try {
        const res = await fetch("/api/media/upload", {
          method: "POST",
          body: formData,
        });
        const json = await res.json();
        if (json.success) {
          successCount++;
        } else {
          failCount++;
          console.error("Upload error:", json.error);
        }
      } catch (err) {
        failCount++;
        console.error("Upload failed:", err);
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setAltText("");

    if (successCount > 0) {
      setStatusMessage({
        type: "success",
        text: `Successfully uploaded ${successCount} file(s) to Cloudinary and MongoDB!`,
      });
      fetchMedia();
    } else if (failCount > 0) {
      setStatusMessage({
        type: "error",
        text: `Failed to upload file(s). Please verify file size and format.`,
      });
    }
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Are you sure you want to permanently delete "${item.publicId}" from Cloudinary and MongoDB?`)) {
      return;
    }

    setDeleteId(item._id);
    try {
      const res = await fetch(`/api/media/${item._id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setMediaList((prev) => prev.filter((m) => m._id !== item._id));
        if (previewMedia?._id === item._id) setPreviewMedia(null);
        setStatusMessage({
          type: "success",
          text: `Deleted asset from Cloudinary and MongoDB.`,
        });
      } else {
        alert(json.error || "Failed to delete");
      }
    } catch (err) {
      alert("Error deleting asset");
    } finally {
      setDeleteId(null);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatBytes = (bytes?: number) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/seo"
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Admin
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Cloud className="w-8 h-8 text-blue-500" />
              Cloudinary & MongoDB Media Hub
            </h1>
            <p className="text-sm text-slate-400">
              Manage all high-performance optimized images, videos, and media metadata.
            </p>
          </div>

          {/* Infrastructure Health Badges */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Database className="w-3.5 h-3.5" />
              MongoDB Atlas: Connected
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold">
              <Cloud className="w-3.5 h-3.5" />
              Cloudinary CDN: Active
            </div>
          </div>
        </div>

        {/* Status Message Notification */}
        {statusMessage && (
          <div
            className={`p-4 rounded-xl flex items-center gap-3 text-sm ${
              statusMessage.type === "success"
                ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-300"
                : "bg-rose-950/80 border border-rose-500/40 text-rose-300"
            }`}
          >
            {statusMessage.type === "success" ? (
              <Check className="w-5 h-5 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Upload Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-blue-400" />
            Upload New Media Asset
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Cloudinary Folder Target
              </label>
              <select
                value={uploadFolder}
                onChange={(e) => setUploadFolder(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="smartlygrow/hero">Hero & Brand (smartlygrow/hero)</option>
                <option value="smartlygrow/team">Team Profiles (smartlygrow/team)</option>
                <option value="smartlygrow/portfolio">Portfolio Projects (smartlygrow/portfolio)</option>
                <option value="smartlygrow/blogs">Blog Featured Images (smartlygrow/blogs)</option>
                <option value="smartlygrow/services">Services (smartlygrow/services)</option>
                <option value="smartlygrow/clients">Client Network (smartlygrow/clients)</option>
                <option value="smartlygrow/videos">Videos & UGC Reels (smartlygrow/videos)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Alt Text / Media Description
              </label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Descriptive alt text for SEO and accessibility..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 placeholder-slate-600"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              accept="image/jpeg,image/png,image/webp,image/svg+xml,video/mp4,video/webm,video/quicktime"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className={`flex-1 w-full border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-950/60 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                uploading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <UploadCloud className="w-8 h-8 text-blue-400 animate-bounce" />
              <p className="text-sm font-semibold text-slate-200">
                {uploading ? "Uploading to Cloudinary & saving in MongoDB..." : "Click to select or drag & drop files"}
              </p>
              <p className="text-xs text-slate-500">
                Supports JPG, PNG, WEBP, SVG, MP4, WEBM, MOV (Images up to 10MB, Videos up to 100MB)
              </p>
            </label>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-slate-300 focus:outline-none focus:border-blue-500"
            >
              {FOLDERS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as "all" | "image" | "video")}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-slate-300 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Media Types</option>
              <option value="image">Images Only</option>
              <option value="video">Videos Only</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchMedia}
              className="border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publicId, alt text..."
                className="bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 placeholder-slate-600 w-full sm:w-64"
              />
            </div>
            <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
              Search
            </Button>
          </form>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="text-center py-20">
            <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-400">Loading media from MongoDB & Cloudinary...</p>
          </div>
        ) : mediaList.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <ImageIcon className="w-12 h-12 text-slate-700 mx-auto mb-3" />
            <p className="text-base font-semibold text-slate-300">No media assets found</p>
            <p className="text-xs text-slate-500 mt-1">Upload your first image or run the migration script.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaList.map((item) => (
              <div
                key={item._id}
                className="group bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                {/* Media Preview Box */}
                <div
                  className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() => setPreviewMedia(item)}
                >
                  {item.resourceType === "video" ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                      <video
                        src={item.secureUrl}
                        className="w-full h-full object-cover opacity-80"
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <FileVideo className="w-8 h-8 text-white drop-shadow-md" />
                      </div>
                      <span className="absolute top-2 left-2 bg-purple-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        VIDEO
                      </span>
                    </div>
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.secureUrl}
                        alt={item.altText || item.publicId}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {item.format?.toUpperCase() || "IMG"}
                      </span>
                    </>
                  )}

                  {/* Dimensions / Size Badge */}
                  <span className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-xs text-slate-300 text-[10px] font-mono px-1.5 py-0.5 rounded">
                    {item.width && item.height ? `${item.width}x${item.height} • ` : ""}
                    {formatBytes(item.bytes)}
                  </span>
                </div>

                {/* Details */}
                <div className="p-3.5 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-white truncate" title={item.publicId}>
                      {item.publicId.split("/").pop()}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.folder || "root"}
                    </p>
                    {item.altText && (
                      <p className="text-[11px] text-slate-400 italic truncate mt-1">
                        &quot;{item.altText}&quot;
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800/80">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(item.secureUrl, `url-${item._id}`)}
                      className="flex-1 text-[11px] h-8 text-slate-300 hover:text-white hover:bg-slate-800 p-0"
                      title="Copy Cloudinary URL"
                    >
                      {copiedId === `url-${item._id}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 mr-1" />
                      )}
                      Copy URL
                    </Button>

                    <a
                      href={item.secureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={deleteId === item._id}
                      onClick={() => handleDelete(item)}
                      className="h-8 w-8 text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 p-0"
                      title="Delete asset from Cloudinary & MongoDB"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Media Preview */}
        {previewMedia && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setPreviewMedia(null)}
          >
            <div
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-base truncate max-w-lg">
                  {previewMedia.publicId}
                </h3>
                <button
                  onClick={() => setPreviewMedia(null)}
                  className="text-slate-400 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
                {previewMedia.resourceType === "video" ? (
                  <video
                    src={previewMedia.secureUrl}
                    controls
                    autoPlay
                    playsInline
                    controlsList="nodownload noremoteplayback"
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewMedia.secureUrl}
                    alt={previewMedia.altText || previewMedia.publicId}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl text-xs font-mono">
                <div>
                  <span className="text-slate-500 block">Format:</span>
                  <span className="text-white uppercase">{previewMedia.format}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Dimensions:</span>
                  <span className="text-white">
                    {previewMedia.width}x{previewMedia.height}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Size:</span>
                  <span className="text-white">{formatBytes(previewMedia.bytes)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Folder:</span>
                  <span className="text-white truncate block">{previewMedia.folder}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => copyToClipboard(previewMedia.secureUrl, "modal-url")}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {copiedId === "modal-url" ? "URL Copied!" : "Copy Full Cloudinary URL"}
                </Button>
                <Button
                  onClick={() => copyToClipboard(previewMedia.publicId, "modal-id")}
                  variant="outline"
                  className="flex-1 border-slate-700 bg-slate-800 text-slate-200"
                >
                  {copiedId === "modal-id" ? "Public ID Copied!" : "Copy Public ID"}
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
