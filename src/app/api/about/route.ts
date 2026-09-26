import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { About } from "@/models/About";

export async function GET() {
  try {
    await connectToDatabase();
    let about = await About.findOne().lean();

    if (!about) {
      // Seed default initial about record if none exists
      about = await About.create({
        title: "About SmartlyGrow",
        tagline: "AI-Powered Growth Agency in Pune",
        description:
          "We are a lean technology studio building high-performance Next.js websites, workflow automations, and custom AI agents.",
        heroImage: {
          url: "https://res.cloudinary.com/dwyx4lcmw/image/upload/v1/smartlygrow/hero/logo-about",
          publicId: "smartlygrow/hero/logo-about",
          altText: "SmartlyGrow About",
        },
      });
    }

    return NextResponse.json({ success: true, data: about });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("[About GET API Error]:", err.message);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch about data" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToDatabase();

    let about = await About.findOne();
    if (!about) {
      about = await About.create(body);
    } else {
      about = await About.findByIdAndUpdate(
        about._id,
        { $set: body },
        { new: true, runValidators: true }
      );
    }

    return NextResponse.json({
      success: true,
      message: "About data updated successfully",
      data: about,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("[About PUT API Error]:", err.message);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update about data" },
      { status: 500 }
    );
  }
}
