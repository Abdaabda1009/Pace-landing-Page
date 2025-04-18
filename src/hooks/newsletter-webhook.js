// File: /pages/api/newsletter-webhook.js

// Import the CORS middleware if using Next.js
import Cors from "cors";

// Initialize the CORS middleware
const cors = Cors({
  methods: ["POST", "HEAD", "OPTIONS"],
  origin: "*", // Be more restrictive in production
});

// Helper function to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  // Handle OPTIONS request for CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    console.log("API route received request:", req.body);
    const { email, subscriptionDate, source } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Send data to n8n webhook
    const n8nWebhookUrl =
      "https://abdaabda1009.app.n8n.cloud/webhook/NewsLetter";

    if (!n8nWebhookUrl) {
      console.error("N8N webhook URL not configured");
      return res
        .status(500)
        .json({ message: "Server configuration error - webhook URL not set" });
    }

    console.log("Sending to n8n webhook:", n8nWebhookUrl);

    try {
      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          subscriptionDate,
          source,
        }),
      });

      console.log("n8n response status:", n8nResponse.status);

      if (!n8nResponse.ok) {
        const errorText = await n8nResponse.text();
        console.error("n8n webhook error:", errorText);
        return res.status(n8nResponse.status).json({
          message: "Error triggering welcome email workflow",
          details: errorText,
        });
      }

      const responseData = await n8nResponse.json().catch(() => ({}));
      return res.status(200).json({
        message: "Welcome email triggered successfully",
        data: responseData,
      });
    } catch (fetchError) {
      console.error("Error fetching n8n webhook:", fetchError);
      return res.status(500).json({
        message: "Error connecting to n8n webhook",
        error: fetchError.message,
      });
    }
  } catch (error) {
    console.error("Newsletter webhook handler error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
