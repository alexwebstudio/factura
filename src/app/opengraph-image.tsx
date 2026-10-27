import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const petale = await readFile(path.join(process.cwd(), "public/fonts/Petale-Thin.otf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#342A22",
          color: "#F2EEE8",
          padding: "64px 72px",
          fontFamily: "Petale",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, opacity: 0.8 }}>{site.descriptor}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 230, lineHeight: 0.85, letterSpacing: "0.02em" }}>{site.name}</div>
          <div style={{ display: "flex", fontSize: 52, marginTop: 36, opacity: 0.85 }}>{site.slogan}</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Petale", data: petale, weight: 200, style: "normal" }] },
  );
}
