import { ImageResponse } from "next/og";

export const alt =
  "League of Ledgers bookkeeping for HVAC, plumbing, electrical, and home-service contractors";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "64px",
          background: "#f1f5f8",
          color: "#102b42",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 60px",
            border: "1px solid #d7e2eb",
            borderRadius: "28px",
            background: "#ffffff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              color: "#0b4265",
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "42px",
                borderRadius: "8px",
                background: "#ed7d20",
              }}
            />
            LEAGUE OF LEDGERS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <div
              style={{
                color: "#0b4265",
                fontSize: "68px",
                fontWeight: 700,
                letterSpacing: "-2px",
                lineHeight: 1.08,
              }}
            >
              Bookkeeping for the trades.
            </div>
            <div style={{ color: "#53657a", fontSize: "30px" }}>
              HVAC · Plumbing · Electrical · Home Services
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid #e3eaf0",
              paddingTop: "20px",
              color: "#53657a",
              fontSize: "22px",
            }}
          >
            <span>Clear books. Better decisions.</span>
            <span>leagueofledgers.com</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
