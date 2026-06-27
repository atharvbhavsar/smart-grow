import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addSubscriber } from "../../../lib/brevo";

// Input validation schema using Zod
const subscriberSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Server-side validation
    const validation = subscriberSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: validation.error.issues[0]?.message || "Invalid email address." 
        },
        { status: 400 }
      );
    }

    const { email } = validation.data;
    
    // Call Brevo API helper
    const result = await addSubscriber(email);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Something went wrong. Please try again later." 
      },
      { status: 500 }
    );
  }
}
