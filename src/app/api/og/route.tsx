import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") ?? "Ponte al dIA";
  const category = searchParams.get("category") ?? "";
  const emoji = searchParams.get("emoji") ?? "🤖";
  const votes = searchParams.get("votes") ?? "0";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
          justifyContent: "space-between",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#6366f1",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            🧠 Ponte al dIA
          </div>
          {category && (
            <div
              style={{
                fontSize: "14px",
                color: "#6366f1",
                backgroundColor: "#ede9fe",
                padding: "4px 12px",
                borderRadius: "20px",
                fontWeight: 600,
              }}
            >
              {emoji} {category}
            </div>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 80 ? "36px" : "48px",
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#6366f1",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            ▲ {votes} votos
          </div>
          <div style={{ color: "#94a3b8", fontSize: "16px" }}>
            pontealdia.com · Comunidad de IA en español
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
