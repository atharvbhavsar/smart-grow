import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { TeamMember } from "@/models/TeamMember";
import { teamProfiles } from "@/data/teamData";

const staticTeamList = Object.values(teamProfiles);

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const member = await TeamMember.findOne({ slug, isActive: true }).lean();
      if (member) {
        return NextResponse.json({ success: true, data: member });
      }
      // Fallback to static data
      const staticMember = teamProfiles[slug];
      if (staticMember) {
        return NextResponse.json({ success: true, data: staticMember });
      }
      return NextResponse.json({ success: false, error: "Member not found" }, { status: 404 });
    }

    const members = await TeamMember.find({ isActive: true }).sort({ order: 1, createdAt: 1 }).lean();

    // If database has records, return them; otherwise fallback to static data
    const data = members.length > 0 ? members : staticTeamList;
    return NextResponse.json({ success: true, count: data.length, data });
  } catch (error: unknown) {
    const err = error as Error;
    console.warn("[Team API Warning]: DB fallback to static data:", err.message);
    return NextResponse.json({ success: true, data: staticTeamList });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (!body.name || !body.role || !body.imageUrl) {
      return NextResponse.json(
        { success: false, error: "Name, role, and imageUrl are required" },
        { status: 400 }
      );
    }

    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const member = await TeamMember.findOneAndUpdate(
      { slug },
      { ...body, slug },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
