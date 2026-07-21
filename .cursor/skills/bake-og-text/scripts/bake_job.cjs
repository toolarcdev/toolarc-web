const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const JOB = process.env.JOB_DIR;
const FONT =
  process.env.FONT_PATH || "C:/Windows/Fonts/NotoSansJP-VF.ttf";
const FALLBACK = "C:/Windows/Fonts/YuGothM.ttc";
const fontPath = fs.existsSync(FONT) ? FONT : FALLBACK;

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function overlaySvg(width, height, mainText, subText) {
  const padX = Math.round(width * 0.055);
  const bandH = Math.round(height * 0.28);
  const bandY = height - bandH;
  const accentY = bandY + Math.round(bandH * 0.22);
  const mainSize = Math.max(28, Math.round(width * 0.042));
  const subSize = Math.max(18, Math.round(width * 0.024));
  const mainY = accentY + Math.round(bandH * 0.38);
  const subY = mainY + Math.round(mainSize * 1.35);
  const lineW = Math.max(3, Math.round(width * 0.003));
  const fontUri = `file:///${fontPath.replace(/\\/g, "/")}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="35%" stop-color="#ffffff" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.96"/>
    </linearGradient>
    <style type="text/css"><![CDATA[
      @font-face { font-family: 'BakeJP'; src: url('${fontUri}'); }
      .main { font-family: 'BakeJP', 'Yu Gothic UI', sans-serif; font-size: ${mainSize}px; font-weight: 700; fill: #0f172a; }
      .sub { font-family: 'BakeJP', 'Yu Gothic UI', sans-serif; font-size: ${subSize}px; font-weight: 500; fill: #475569; }
    ]]></style>
  </defs>
  <rect x="0" y="${bandY}" width="${width}" height="${bandH}" fill="url(#band)"/>
  <line x1="${padX}" y1="${accentY}" x2="${width - padX}" y2="${accentY}" stroke="#60a5fa" stroke-width="${lineW}" stroke-linecap="round"/>
  <text x="${padX}" y="${mainY}" class="main">${escapeXml(mainText)}</text>
  <text x="${padX}" y="${subY}" class="sub">${escapeXml(subText)}</text>
</svg>`;
}

(async () => {
  if (!JOB) throw new Error("JOB_DIR required");
  const copy = JSON.parse(
    fs.readFileSync(path.join(JOB, "copy.json"), "utf8"),
  );
  const rawDir = path.join(JOB, "raw");
  const bakedDir = path.join(JOB, "baked");
  fs.mkdirSync(bakedDir, { recursive: true });

  const files = fs
    .readdirSync(rawDir)
    .filter((f) => f.endsWith(".png") && !f.includes("-ja"));

  console.log("font", fontPath);
  for (const srcName of files) {
    const stem = path.basename(srcName, ".png");
    // skip pilot if already baked and user only asked for 7? bake all from copy.json files keys present in raw
    const overrides = (copy.files && copy.files[stem]) || {};
    const main = overrides.main || copy.main;
    const sub = overrides.sub != null ? overrides.sub : copy.sub || "";
    if (!main || main === "Series OG") {
      console.log("SKIP (no copy)", stem);
      continue;
    }
    const srcPath = path.join(rawDir, srcName);
    const dstPath = path.join(bakedDir, `${stem}-ja.png`);
    const meta = await sharp(srcPath).metadata();
    const svg = Buffer.from(
      overlaySvg(meta.width, meta.height, main, sub),
      "utf8",
    );
    await sharp(srcPath)
      .composite([{ input: svg, top: 0, left: 0 }])
      .png()
      .toFile(dstPath);
    console.log("OK", path.basename(dstPath), fs.statSync(dstPath).size);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
