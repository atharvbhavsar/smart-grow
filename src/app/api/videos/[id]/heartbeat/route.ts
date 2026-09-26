import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { PlaybackSession } from "@/models/PlaybackSession";
import { VideoAuditLog } from "@/models/VideoAuditLog";
import { verifySessionToken } from "@/lib/videoSecurity";

export const dynamic = "force-dynamic";

/**
 * POST /api/videos/[id]/heartbeat
 * Periodic client heartbeat to verify and refresh active playback session
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const { sessionToken, sessionId } = body;

    if (!sessionToken && !sessionId) {
      return NextResponse.json(
        { success: false, error: "Missing session credentials." },
        { status: 400 }
      );
    }

    if (sessionToken) {
      const tokenVerification = verifySessionToken(sessionToken);
      if (!tokenVerification.valid) {
        return NextResponse.json(
          { success: false, error: "Playback session expired or invalid token.", revoked: true },
          { status: 401 }
        );
      }
    }

    await connectToDatabase();

    const session = await PlaybackSession.findOne({
      sessionId: sessionId || verifySessionToken(sessionToken).sessionId,
      status: "active",
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Active playback session not found or revoked.", revoked: true },
        { status: 401 }
      );
    }

    // Update last heartbeat
    session.lastHeartbeat = new Date();
    // Extend expiry slightly based on ongoing active playback
    session.expiresAt = new Date(Date.now() + 600 * 1000); // +10 mins from heartbeat
    await session.save();

    return NextResponse.json({
      success: true,
      active: true,
      expiresAt: session.expiresAt.toISOString(),
    });
  } catch (error: any) {
    console.error("[Heartbeat API] Error processing heartbeat:", error);
    return NextResponse.json(
      { success: false, error: "Heartbeat check failed." },
      { status: 500 }
    );
  }
}
