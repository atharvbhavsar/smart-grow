import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { VideoAuditLog } from "@/models/VideoAuditLog";
import { PlaybackSession } from "@/models/PlaybackSession";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/videos/audit
 * Returns recent audit records and active playback sessions
 */
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const action = searchParams.get("action");

    const query: Record<string, any> = {};
    if (action) query.action = action;

    const [logs, activeSessions] = await Promise.all([
      VideoAuditLog.find(query)
        .sort({ timestamp: -1 })
        .limit(limit)
        .lean(),
      PlaybackSession.find({
        status: "active",
        expiresAt: { $gt: new Date() },
      })
        .sort({ startedAt: -1 })
        .limit(50)
        .lean(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        logs,
        activeSessions,
        activeCount: activeSessions.length,
      },
    });
  } catch (error: any) {
    console.error("[Admin Video Audit API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve audit trail." },
      { status: 500 }
    );
  }
}
