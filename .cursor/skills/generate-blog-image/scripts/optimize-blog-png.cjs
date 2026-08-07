#!/usr/bin/env node
/**
 * ToolArc blog PNG lightener (Phase 1).
 * Usage:
 *   node .cursor/skills/generate-blog-image/scripts/optimize-blog-png.cjs <png|dir> [--max-kb 400] [--max-width 1600] [--dry-run]
 *
 * Procedure: .cursor/skills/generate-blog-image/references/optimize.md
 * Requires: repo node_modules/sharp
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

function parseArgs(argv) {
  const opts = { maxKb: 400, maxWidth: 1600, dryRun: false, targets: [] };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--max-kb") opts.maxKb = Number(argv[++i]);
    else if (a === "--max-width") opts.maxWidth = Number(argv[++i]);
    else if (a.startsWith("-")) {
      console.error(`Unknown flag: ${a}`);
      process.exit(1);
    } else opts.targets.push(a);
  }
  if (!opts.targets.length) {
    console.error(
      "Usage: optimize-blog-png.cjs <png|dir> [--max-kb 400] [--max-width 1600] [--dry-run]",
    );
    process.exit(1);
  }
  if (!Number.isFinite(opts.maxKb) || opts.maxKb <= 0) {
    console.error("--max-kb must be a positive number");
    process.exit(1);
  }
  if (!Number.isFinite(opts.maxWidth) || opts.maxWidth <= 0) {
    console.error("--max-width must be a positive number");
    process.exit(1);
  }
  return opts;
}

function collectPngs(target) {
  const abs = path.resolve(target);
  if (!fs.existsSync(abs)) {
    throw new Error(`Not found: ${abs}`);
  }
  const st = fs.statSync(abs);
  if (st.isFile()) {
    if (!abs.toLowerCase().endsWith(".png")) {
      throw new Error(`Not a PNG: ${abs}`);
    }
    return [abs];
  }
  return fs
    .readdirSync(abs)
    .filter((n) => n.toLowerCase().endsWith(".png") && !n.startsWith("."))
    .map((n) => path.join(abs, n))
    .sort();
}

function candidatesFor(width, maxWidth) {
  const w = Math.min(width, maxWidth);
  return [
    { width: w, palette: true, quality: 85, label: `${w}-palette85` },
    { width: w, palette: true, quality: 80, label: `${w}-palette80` },
    { width: w, palette: true, quality: 75, label: `${w}-palette75` },
    { width: w, palette: true, quality: 70, label: `${w}-palette70` },
    {
      width: Math.min(1400, w),
      palette: true,
      quality: 80,
      label: `${Math.min(1400, w)}-palette80`,
    },
    {
      width: Math.min(1200, w),
      palette: true,
      quality: 80,
      label: `${Math.min(1200, w)}-palette80`,
    },
    {
      width: Math.min(1200, w),
      palette: true,
      quality: 70,
      label: `${Math.min(1200, w)}-palette70`,
    },
    { width: w, palette: false, quality: null, label: `${w}-png` },
  ];
}

async function encode(inputPath, c) {
  let pipeline = sharp(inputPath).resize({
    width: c.width,
    withoutEnlargement: true,
  });
  if (c.palette) {
    pipeline = pipeline.png({
      compressionLevel: 9,
      palette: true,
      quality: c.quality,
      effort: 10,
    });
  } else {
    pipeline = pipeline.png({ compressionLevel: 9, effort: 10 });
  }
  return pipeline.toBuffer();
}

async function optimizeOne(filePath, { maxKb, maxWidth, dryRun }) {
  const maxBytes = maxKb * 1024;
  const meta = await sharp(filePath).metadata();
  const before = fs.statSync(filePath).size;
  const beforeKb = Math.round(before / 1024);
  console.log(
    `\n${path.basename(filePath)}  src ${meta.width}x${meta.height}  ${beforeKb}KB`,
  );

  if (before <= maxBytes) {
    console.log(`  skip (already <= ${maxKb}KB)`);
    return { filePath, skipped: true, beforeKb, afterKb: beforeKb };
  }

  let bestUnder = null;
  let bestAny = null;

  for (const c of candidatesFor(meta.width || maxWidth, maxWidth)) {
    const buf = await encode(filePath, c);
    const kb = Math.round(buf.length / 1024);
    console.log(`  ${c.label}  ${kb}KB`);
    if (!bestAny || buf.length < bestAny.buf.length) {
      bestAny = { buf, kb, label: c.label };
    }
    if (buf.length <= maxBytes && !bestUnder) {
      bestUnder = { buf, kb, label: c.label };
      break;
    }
  }

  const chosen = bestUnder || bestAny;
  if (!chosen) {
    throw new Error(`No encode result for ${filePath}`);
  }

  const ok = chosen.buf.length <= maxBytes;
  console.log(
    `  => ${chosen.label}  ${chosen.kb}KB  ${ok ? "OK" : "OVER (best effort)"}`,
  );

  if (!dryRun) {
    fs.writeFileSync(filePath, chosen.buf);
  } else {
    console.log("  (dry-run: not written)");
  }

  return {
    filePath,
    skipped: false,
    beforeKb,
    afterKb: chosen.kb,
    label: chosen.label,
    ok,
    dryRun,
  };
}

async function main() {
  const opts = parseArgs(process.argv);
  const files = opts.targets.flatMap(collectPngs);
  if (!files.length) {
    console.error("No PNG files found");
    process.exit(1);
  }

  const results = [];
  for (const f of files) {
    results.push(await optimizeOne(f, opts));
  }

  console.log("\n--- summary ---");
  for (const r of results) {
    if (r.skipped) {
      console.log(`${path.basename(r.filePath)}: skip ${r.beforeKb}KB`);
    } else {
      console.log(
        `${path.basename(r.filePath)}: ${r.beforeKb}KB -> ${r.afterKb}KB (${r.label})${r.ok ? "" : " OVER"}${r.dryRun ? " dry-run" : ""}`,
      );
    }
  }

  if (results.some((r) => !r.skipped && !r.ok)) {
    process.exitCode = 2;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
