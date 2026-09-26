import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { services as staticServices } from "@/data/siteData";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const serviceId = searchParams.get("serviceId") || searchParams.get("id");
    const category = searchParams.get("category");

    if (serviceId) {
      const service = await Service.findOne({ serviceId, isActive: true }).lean();
      if (service) {
        return NextResponse.json({ success: true, data: service });
      }
      const staticServ = staticServices.find((s) => s.id === serviceId);
      if (staticServ) {
        return NextResponse.json({ success: true, data: staticServ });
      }
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }

    const query: Record<string, unknown> = { isActive: true };
    if (category) {
      query.category = category;
    }

    const dbServices = await Service.find(query).sort({ order: 1, createdAt: 1 }).lean();
    const data = dbServices.length > 0 ? dbServices : staticServices;

    return NextResponse.json({ success: true, count: data.length, data });
  } catch (error: unknown) {
    const err = error as Error;
    console.warn("[Service API Warning]: DB fallback to static data:", err.message);
    return NextResponse.json({ success: true, data: staticServices });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (!body.title || !body.category || !body.shortDesc) {
      return NextResponse.json(
        { success: false, error: "Title, category, and shortDesc are required" },
        { status: 400 }
      );
    }

    const serviceId = body.serviceId || body.id || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const service = await Service.findOneAndUpdate(
      { serviceId },
      { ...body, serviceId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
