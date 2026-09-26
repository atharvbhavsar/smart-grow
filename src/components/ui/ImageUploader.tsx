"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  X,
  CheckCircle2,
  AlertCircle,
  FileImage,
  FileVideo,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { CloudinaryFolder, FOLDERS } from "@/lib/cloudinary";

export interface UploadResult {
  id: string;
  url: string;
  secureUrl: string;
  publicId: string;
  resourceType: "image" | "video";
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  duration?: number;
  thumbnailUrl?: string;
  folder?: string;
}

interface ImageUploaderProps {
  folder?: CloudinaryFolder | string;
  label?: string;
  currentUrl?: string;
  currentPublicId?: string;
  allowVideo?: boolean;
  maxSizeMB?: number;
  onUploadSuccess?: (result: UploadResult) => void;
  onRemove?: () => void;
  className?: string;
}

export function ImageUploader({
  folder = FOLDERS.GENERAL,
  label = "Upload Image",
  currentUrl,
  currentPublicId,
  allowVideo = false,
  maxSizeMB = 10,
  onUploadSuccess,
  onRemove,
  className = "",
}: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);
  const [uploadedResult, setUploadedResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [altText, setAltText] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedImageMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml"];
  const allowedVideoMimes = ["video/mp4", "video/webm", "video/quicktime"];

  const validateFile = (file: File): string | null => {
    const mime = file.type.toLowerCase();
    const isImage = allowedImageMimes.includes(mime);
    const isVideo = allowVideo && allowedVideoMimes.includes(mime);

    if (!isImage && !isVideo) {
      return `Invalid format (${mime}). Allowed: JPG, PNG, WEBP, SVG${allowVideo ? ", MP4, WEBM, MOV" : ""}`;
    }

    const limitBytes = (isVideo ? 100 : maxSizeMB) * 1024 * 1024;
    if (file.size > limitBytes) {
      return `File size exceeds ${isVideo ? 100 : maxSizeMB}MB limit.`;
    }

    return null;
  };

  const handleUpload = async (file: File) => {
    setError(null);
    const validationErr = validateFile(file);
    if (validationErr) {
      setError(validationErr);
      return;
    }

    // Set local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setUploading(true);
    setUploadProgress(20);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      if (altText) formData.append("altText", altText);

      setUploadProgress(60);

      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadProgress(100);
      setUploadedResult(data);
      setPreviewUrl(data.secureUrl);

      if (onUploadSuccess) {
        onUploadSuccess(data);
      }
    } catch (err: unknown) {
      const errorMsg = (err as Error).message || "Upload failed. Please try again.";
      setError(errorMsg);
      setPreviewUrl(currentUrl || null);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleCopyUrl = (urlToCopy: string) => {
    navigator.clipboard.writeText(urlToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setUploadedResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onRemove) onRemove();
  };

  const displayUrl = previewUrl || currentUrl;
  const isVideo = displayUrl?.endsWith(".mp4") || displayUrl?.endsWith(".webm") || displayUrl?.endsWith(".mov");

  return (
    <div className={`w-full font-sans space-y-3 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {label}
          </label>
          <span className="text-[11px] text-slate-400 font-mono">
            {folder}
          </span>
        </div>
      )}

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={allowVideo ? "image/*,video/*" : "image/*"}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Zone / Active Preview */}
      {displayUrl ? (
        <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4 overflow-hidden group">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            
            {/* Media Thumbnail Container */}
            <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-xl bg-white border border-slate-200/80 overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
              {isVideo ? (
                <video
                  src={displayUrl}
                  className="h-full w-full object-cover pointer-events-none select-none"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                  onContextMenu={(e) => e.preventDefault()}
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={displayUrl}
                  alt={altText || "Uploaded asset"}
                  className="h-full w-full object-contain p-1"
                />
              )}
            </div>

            {/* Asset Metadata & Actions */}
            <div className="flex-1 w-full space-y-2 min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                  <CheckCircle2 className="h-3 w-3" />
                  Stored on Cloudinary
                </span>
                {uploadedResult?.format && (
                  <span className="text-[10px] font-mono text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded">
                    {uploadedResult.format}
                  </span>
                )}
              </div>

              {/* URL Display */}
              <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 px-3 py-1.5 w-full">
                <span className="text-xs text-slate-600 font-mono truncate flex-1 select-all">
                  {displayUrl}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyUrl(displayUrl)}
                  className="text-slate-400 hover:text-slate-900 transition-colors p-1 cursor-pointer"
                  title="Copy Cloudinary URL"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
                <a
                  href={displayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="text-xs font-bold text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <RefreshCw className={`h-3 w-3 ${uploading ? "animate-spin" : ""}`} />
                  Replace Asset
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 border border-rose-200/60 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                  Remove
                </button>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* Empty Upload Dropzone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center ${
            dragActive
              ? "border-blue-500 bg-blue-50/50 scale-[1.01]"
              : "border-slate-200 hover:border-blue-400 bg-slate-50/60 hover:bg-slate-50"
          }`}
        >
          <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-blue-600 mb-3 group-hover:scale-105 transition-transform">
            {uploading ? (
              <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
            ) : allowVideo ? (
              <FileVideo className="h-6 w-6 text-slate-700" />
            ) : (
              <UploadCloud className="h-6 w-6 text-blue-600" />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900">
              {uploading ? "Uploading to Cloudinary..." : "Click or drag file to upload"}
            </p>
            <p className="text-xs text-slate-500">
              Direct buffer stream to Cloudinary • Max {maxSizeMB}MB (JPG, PNG, WEBP, SVG{allowVideo ? ", MP4" : ""})
            </p>
          </div>

          {/* Progress bar */}
          {uploading && (
            <div className="w-48 bg-slate-200 h-1.5 rounded-full overflow-hidden mt-4">
              <div
                className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
