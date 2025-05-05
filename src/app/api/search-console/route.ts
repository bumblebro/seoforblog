import { NextResponse } from "next/server";
import { google } from "googleapis";

// Initialize the Google Search Console API client
const searchconsole = google.searchconsole("v1");

// Your service account credentials
const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

// Create JWT client
const jwt = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ["https://www.googleapis.com/auth/webmasters.readonly"]
);

export async function GET(request: Request) {
  try {
    // Get the site URL from the query parameters
    const { searchParams } = new URL(request.url);
    const siteUrl = searchParams.get("siteUrl");

    if (!siteUrl) {
      return NextResponse.json(
        { error: "Site URL is required" },
        { status: 400 }
      );
    }

    // Authorize the client
    await jwt.authorize();

    // Query Search Console API
    const response = await searchconsole.searchanalytics.query({
      siteUrl,
      auth: jwt,
      requestBody: {
        startDate: "2024-01-01", // Last 3 months
        endDate: new Date().toISOString().split("T")[0],
        dimensions: ["query", "page"],
        rowLimit: 100,
        startRow: 0,
      },
    });

    // Process and format the data
    const keywordData = response.data.rows?.map((row) => ({
      keyword: row.keys[0],
      page: row.keys[1],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    }));

    return NextResponse.json({
      keywords: keywordData || [],
      totalRows: response.data.rows?.length || 0,
    });
  } catch (error) {
    console.error("Search Console API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch Search Console data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
