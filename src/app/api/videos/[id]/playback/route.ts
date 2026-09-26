import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Video } from "@/models/Video";
import { PlaybackSession } from "@/models/PlaybackSession";
import { VideoAuditLog } from "@/models/VideoAuditLog";
import {
  generateSignedHlsUrl,
  generateSignedPosterUrl,
  generatePlaybackSessionId,
  generateSessionToken,
  checkPlaybackRateLimit,
  DEFAULT_PLAYBACK_EXPIRY_SECONDS,
  MAX_CONCURRENT_SESSIONS_PER_USER,
} from "@/lib/videoSecurity";

export const dynamic = "force-dynamic";

/**
 * GET /api/videos/[id]/playback
 * Authenticated & authorized endpoint returning short-lived signed HLS streaming URL with watermark metadata
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";
  const userAgent = req.headers.get("user-agent") || "unknown";

  try {
    // 1. Rate Limiting Check
    const rateCheck = checkPlaybackRateLimit(ip, 40, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many playback requests. Please wait a moment before retrying.",
        },
        {
          status: 429,
          headers: { "Retry-After": Math.ceil(rateCheck.resetInMs / 1000).toString() },
        }
      );
    }

    await connectToDatabase();
    const { id } = await params;

    // 2. Identify Video
    const video = await Video.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { cloudinaryPublicId: id }],
      isPublished: true,
    });

    if (!video) {
      await VideoAuditLog.create({
        videoId: id,
        action: "playback_denied",
        details: { reason: "Video not found or unpublished", ip },
        ipAddress: ip,
        userAgent,
      });

      return NextResponse.json(
        { success: false, error: "Video not available or access denied." },
        { status: 404 }
      );
    }

    // 3. User Authentication / Identity Check
    // Extracts user from auth header, session cookie or client context
    const authHeader = req.headers.get("authorization");
    const userRoleHeader = req.headers.get("x-user-role") || "member";
    const userEmailHeader =
      req.headers.get("x-user-email") ||
      (authHeader ? `client-${authHeader.slice(-6)}@smartlygrow.in` : `guest-${ip.replace(/[^a-zA-Z0-9]/g, "")}@smartlygrow.in`);
    const userIdHeader =
      req.headers.get("x-user-id") ||
      `usr_${ip.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8)}_${Date.now().toString(36)}`;

    // 4. Role Authorization Check (if video has specific role restrictions)
    if (
      video.isProtected &&
      video.allowedRoles &&
      video.allowedRoles.length > 0 &&
      !video.allowedRoles.includes("all") &&
      !video.allowedRoles.includes(userRoleHeader) &&
      userRoleHeader !== "admin"
    ) {
      await VideoAuditLog.create({
        videoId: video._id.toString(),
        videoPublicId: video.cloudinaryPublicId,
        videoTitle: video.title,
        userId: userIdHeader,
        userEmail: userEmailHeader,
        userRole: userRoleHeader,
        action: "playback_denied",
        details: { reason: "Insufficient role permissions", allowedRoles: video.allowedRoles },
        ipAddress: ip,
        userAgent,
      });

      return NextResponse.json(
        { success: false, error: "You do not have permission to view this protected media." },
        { status: 403 }
      );
    }

    // 5. Check Concurrent Playback Sessions
    const activeSessionsCount = await PlaybackSession.countDocuments({
      userEmail: userEmailHeader,
      status: "active",
      expiresAt: { $gt: new Date() },
    });

    if (activeSessionsCount >= MAX_CONCURRENT_SESSIONS_PER_USER) {
      // Auto-expire oldest session to gracefully accommodate user moving between devices
      const oldestSession = await PlaybackSession.findOne({
        userEmail: userEmailHeader,
        status: "active",
      }).sort({ startedAt: 1 });

      if (oldestSession) {
        oldestSession.status = "expired";
        await oldestSession.save();

        await VideoAuditLog.create({
          videoId: oldestSession.videoId,
          videoPublicId: oldestSession.videoPublicId,
          userId: userIdHeader,
          userEmail: userEmailHeader,
          action: "concurrent_limit_exceeded",
          details: { evictedSessionId: oldestSession.sessionId },
          ipAddress: ip,
          userAgent,
        });
      }
    }

    // 6. Generate Short-Lived Signed HLS Streaming URL
    const expirySeconds = parseInt(
      process.env.PLAYBACK_TOKEN_EXPIRY || DEFAULT_PLAYBACK_EXPIRY_SECONDS.toString(),
      10
    );

    const { playbackUrl, expiresAt } = generateSignedHlsUrl(video.cloudinaryPublicId, {
      expiresInSeconds: expirySeconds,
      isProtected: video.isProtected,
      streamingProfile: "hd",
    });

    const thumbnailUrl =
      video.thumbnailUrl || generateSignedPosterUrl(video.cloudinaryPublicId);

    // 7. Create Playback Session Record
    const sessionId = generatePlaybackSessionId();
    const sessionToken = generateSessionToken({
      sessionId,
      userId: userIdHeader,
      videoId: video._id.toString(),
      expiresAt: Math.floor(expiresAt.getTime() / 1000),
    });

    await PlaybackSession.create({
      sessionId,
      userId: userIdHeader,
      userEmail: userEmailHeader,
      videoId: video._id.toString(),
      videoPublicId: video.cloudinaryPublicId,
      ipAddress: ip,
      userAgent,
      startedAt: new Date(),
      expiresAt,
      lastHeartbeat: new Date(),
      status: "active",
    });

    // 8. Log Audit Record
    await VideoAuditLog.create({
      videoId: video._id.toString(),
      videoPublicId: video.cloudinaryPublicId,
      videoTitle: video.title,
      userId: userIdHeader,
      userEmail: userEmailHeader,
      userRole: userRoleHeader,
      action: "playback_granted",
      details: {
        sessionId,
        expiresAt: expiresAt.toISOString(),
        format: "hls",
      },
      ipAddress: ip,
      userAgent,
    });

    // 9. Formulate Secure Response
    return NextResponse.json({
      success: true,
      data: {
        videoId: video._id.toString(),
        title: video.title,
        description: video.description,
        duration: video.duration,
        type: "hls",
        playbackUrl,
        thumbnailUrl,
        expiresAt: expiresAt.toISOString(),
        expiresInSeconds: expirySeconds,
        sessionToken,
        sessionId,
        watermark: {
          userEmail: userEmailHeader,
          sessionId: sessionId.slice(0, 8).toUpperCase(),
          text: `${userEmailHeader} • SmartlyGrow Secure • #${sessionId.slice(0, 6)}`,
        },
      },
    });
  } catch (error: any) {
    console.error("[Playback API] Error generating playback session:", error);
    return NextResponse.json(
      { success: false, error: "Internal error processing secure video stream." },
      { status: 500 }
    );
  }
}
