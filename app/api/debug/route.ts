import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Test environment variables
    const envCheck = {
      NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
      INTERNAL_BACKEND_URL: process.env.INTERNAL_BACKEND_URL
        ? "configured"
        : "missing",
      NODE_ENV: process.env.NODE_ENV,
    };

    // Test backend connectivity
    let backendStatus = "unknown";
    if (process.env.INTERNAL_BACKEND_URL) {
      try {
        const response = await fetch(
          `${process.env.INTERNAL_BACKEND_URL}/health`,
          {
            signal: AbortSignal.timeout(5000),
          }
        );
        backendStatus = response.ok ? "reachable" : `error: ${response.status}`;
      } catch (error) {
        backendStatus = `unreachable: ${
          error instanceof Error ? error.message : "unknown error"
        }`;
      }
    }

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: envCheck,
      backend: backendStatus,
      headers: Object.fromEntries(request.headers.entries()),
    });
  } catch (error) {
    console.error("Debug API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Test error handling
  throw new Error("Test server-side error");
}
