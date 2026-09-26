import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Portfolio } from "@/models/Portfolio";
import { projects as staticProjects } from "@/data/siteData";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || searchParams.get("id");
    const category = searchParams.get("category");

    if (slug) {
      const project = await Portfolio.findOne({ slug }).lean();
      if (project) {
        return NextResponse.json({ success: true, data: project });
      }
      const staticProj = staticProjects.find((p) => p.id === slug);
      if (staticProj) {
        return NextResponse.json({ success: true, data: staticProj });
      }
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    const query: Record<string, unknown> = {};
    if (category) {
      query.categorySlug = category;
    }

    const projects = await Portfolio.find(query).sort({ order: 1, createdAt: -1 }).lean();
    const data = projects.length > 0 ? projects : staticProjects;

    return NextResponse.json({ success: true, count: data.length, data });
  } catch (error: unknown) {
    const err = error as Error;
    console.warn("[Portfolio API Warning]: DB fallback to static data:", err.message);
    return NextResponse.json({ success: true, data: staticProjects });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (!body.title || !body.companyName || !body.imageUrl) {
      return NextResponse.json(
        { success: false, error: "Title, companyName, and imageUrl are required" },
        { status: 400 }
      );
    }

    const slug = body.slug || body.id || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const project = await Portfolio.findOneAndUpdate(
      { slug },
      { ...body, slug },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
