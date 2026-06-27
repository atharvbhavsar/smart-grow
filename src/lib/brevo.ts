interface AddSubscriberResponse {
  success: boolean;
  message: string;
  alreadySubscribed?: boolean;
}

/**
 * Adds an email to the Brevo newsletter subscription list using direct HTTP fetch.
 * If the contact already exists, it updates their list membership.
 */
export async function addSubscriber(email: string): Promise<AddSubscriberResponse> {
  const apiKey = process.env.BREVO_API_KEY;
  const listIdStr = process.env.BREVO_LIST_ID;

  if (!apiKey || !listIdStr) {
    console.error("Missing Brevo environment variables. Please set BREVO_API_KEY and BREVO_LIST_ID.");
    return {
      success: false,
      message: "Server configuration error. Subscription system is currently offline.",
    };
  }

  const listId = parseInt(listIdStr, 10);
  if (isNaN(listId) || listId <= 0) {
    console.error("Invalid BREVO_LIST_ID configured:", listIdStr);
    return {
      success: false,
      message: "Server configuration error. Subscription system is currently offline.",
    };
  }

  try {
    const formattedEmail = email.trim().toLowerCase();

    // 1. Call Brevo API to create/update contact
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: formattedEmail,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Check for duplicate contact error
      if (
        responseData.code === "duplicate_parameter" || 
        (responseData.message && responseData.message.toLowerCase().includes("duplicate"))
      ) {
        return {
          success: true, // Treat as success to keep UX simple and secure
          message: "Thank you for subscribing!",
          alreadySubscribed: true,
        };
      }
      
      console.error("Brevo API error. Status:", response.status, "Response:", JSON.stringify(responseData));
      return {
        success: false,
        message: responseData.message || "Something went wrong. Please try again later.",
      };
    }

    // 2. Send Welcome Email if successfully created/updated
    try {
      await sendWelcomeEmail(formattedEmail);
    } catch (emailErr) {
      // Don't fail the subscriber onboarding if the welcome email fails, just log it.
      console.error("Failed to send welcome email:", emailErr);
    }

    return {
      success: true,
      message: "Thank you for subscribing!",
    };
  } catch (error) {
    console.error("Error connecting to Brevo API:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

/**
 * Sends a welcome transactional email to the newly subscribed user.
 */
export async function sendWelcomeEmail(email: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return;

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      subject: "Welcome to SmartlyGrow! 🚀",
      sender: { 
        name: "SmartlyGrow Partnerships", 
        email: "partnerships@smartygrow.com" 
      },
      to: [{ email: email }],
      htmlContent: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to SmartlyGrow</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f8fafc;
                color: #0f172a;
              }
              .wrapper {
                width: 100%;
                table-layout: fixed;
                background-color: #f8fafc;
                padding: 40px 0;
              }
              .content {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 24px;
                border: 1px solid #e2e8f0;
                overflow: hidden;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
              }
              .header {
                background-color: #ffffff;
                padding: 40px;
                text-align: center;
                border-bottom: 1px solid #f1f5f9;
              }
              .logo {
                font-size: 26px;
                font-weight: 800;
                color: #0f172a;
                letter-spacing: -0.025em;
                text-decoration: none;
              }
              .logo-highlight {
                color: #2563eb;
              }
              .body {
                padding: 40px;
              }
              h1 {
                font-size: 24px;
                font-weight: 800;
                color: #0f172a;
                margin-top: 0;
                margin-bottom: 16px;
                letter-spacing: -0.025em;
                line-height: 1.25;
              }
              p {
                font-size: 15px;
                line-height: 1.6;
                color: #475569;
                margin-top: 0;
                margin-bottom: 24px;
              }
              .cta-container {
                text-align: center;
                margin: 32px 0;
              }
              .cta-button {
                display: inline-block;
                background-color: #0f172a;
                color: #ffffff !important;
                text-decoration: none;
                padding: 14px 28px;
                font-size: 13px;
                font-weight: 700;
                border-radius: 9999px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                transition: background-color 0.2s;
              }
              .footer {
                background-color: #f8fafc;
                padding: 24px 40px;
                text-align: center;
                border-top: 1px solid #f1f5f9;
                font-size: 12px;
                color: #94a3b8;
              }
              .footer a {
                color: #2563eb;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="content">
                <div class="header">
                  <span class="logo">Smarty<span class="logo-highlight">Grow</span></span>
                </div>
                <div class="body">
                  <h1>Welcome to the Growth Circle! 🚀</h1>
                  <p>Hello,</p>
                  <p>Thank you for subscribing to the SmartlyGrow newsletter. We are thrilled to have you join our community of forward-thinking startup founders, tech leaders, and entrepreneurs.</p>
                  <p>Moving forward, we will send you bi-weekly AI workflows, Next.js conversion insights, and business automation templates designed specifically to help you build, optimize, and scale your business.</p>
                  <p>No spam. Only high-signal, actionable tactics direct to your inbox.</p>
                  <div class="cta-container">
                    <a href="https://smart-grow-omega.vercel.app" class="cta-button">Explore SmartlyGrow</a>
                  </div>
                  <p>Cheers,</p>
                  <p><strong>The SmartlyGrow Team</strong></p>
                </div>
                <div class="footer">
                  <p>&copy; ${new Date().getFullYear()} SmartlyGrow. All rights reserved.</p>
                  <p>You received this email because you subscribed to our newsletter. If you'd like to unsubscribe, you can do so by clicking the unsubscribe link in any of our emails.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to send welcome email");
  }
}
