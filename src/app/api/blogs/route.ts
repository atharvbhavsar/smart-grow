import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { blogPosts as staticBlogPosts } from "@/data/siteData";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || searchParams.get("id");
    const category = searchParams.get("category");

    if (slug) {
      const post = await Blog.findOne({ slug, isPublished: true }).lean();
      if (post) {
        return NextResponse.json({ success: true, data: post });
      }
      const staticPost = staticBlogPosts.find((p) => p.id === slug);
      if (staticPost) {
        return NextResponse.json({ success: true, data: staticPost });
      }
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    const query: Record<string, unknown> = { isPublished: true };
    if (category) {
      query.category = category;
    }

    const blogs = await Blog.find(query).sort({ publishedAt: -1, createdAt: -1 }).lean();
    const data = blogs.length > 0 ? blogs : staticBlogPosts;

    return NextResponse.json({ success: true, count: data.length, data });
  } catch (error: unknown) {
    const err = error as Error;
    console.warn("[Blog API Warning]: DB fallback to static data:", err.message);
    return NextResponse.json({ success: true, data: staticBlogPosts });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (!body.title || !body.content || !body.featuredImage) {
      return NextResponse.json(
        { success: false, error: "Title, content, and featuredImage are required" },
        { status: 400 }
      );
    }

    const slug = body.slug || body.id || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const post = await Blog.findOneAndUpdate(
      { slug },
      { ...body, slug },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
