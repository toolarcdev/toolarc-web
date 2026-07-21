#!/usr/bin/env python3
"""Bake Japanese title band onto OG PNGs for ToolArc.

Inputs (job mode):
  <job>/raw/*.png          — source (never overwritten)
  <job>/copy.json          — {"main": "...", "sub": "...", "accent": "#60a5fa"}
Outputs:
  <job>/baked/<stem>-ja.png

Example:
  python bake_og_text.py --job "D:/ObsidianVault/Vault/06_toolarc-business/blog-image-staging/jobs/2026-07-21__series-og__all8" --font "C:/Windows/Fonts/msgothic.ttc"
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


def parse_hex(color: str) -> tuple[int, int, int]:
    c = color.lstrip("#")
    if len(c) != 6:
        raise ValueError(f"invalid accent color: {color}")
    return int(c[0:2], 16), int(c[2:4], 16), int(c[4:6], 16)


def load_copy(path: Path) -> dict:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not data.get("main"):
        raise SystemExit("copy.json requires non-empty 'main'")
    data.setdefault("sub", "")
    data.setdefault("accent", "#60a5fa")
    return data


def bake_one(
    src: Path,
    dest: Path,
    main: str,
    sub: str,
    accent: str,
    font_path: str,
) -> None:
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError as e:
        raise SystemExit(
            "Pillow is required: pip install pillow\n" + str(e)
        ) from e

    img = Image.open(src).convert("RGBA")
    w, h = img.size
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    band_h = max(int(h * 0.28), 120)
    y0 = h - band_h
    r, g, b = parse_hex(accent)
    draw.rectangle([(0, y0), (w, h)], fill=(r, g, b, 230))

    # Prefer Noto / Yu Gothic / Meiryo / MS Gothic
    font_main = None
    font_sub = None
    size_main = max(int(h * 0.055), 28)
    size_sub = max(int(h * 0.032), 18)
    try:
        font_main = ImageFont.truetype(font_path, size_main)
        font_sub = ImageFont.truetype(font_path, size_sub)
    except OSError as e:
        raise SystemExit(f"Cannot load font: {font_path}\n{e}") from e

    margin_x = int(w * 0.05)
    text_y = y0 + int(band_h * 0.28)
    draw.text((margin_x, text_y), main, fill=(255, 255, 255, 255), font=font_main)
    if sub:
        draw.text(
            (margin_x, text_y + size_main + 8),
            sub,
            fill=(255, 255, 255, 230),
            font=font_sub,
        )

    out = Image.alpha_composite(img, overlay).convert("RGB")
    dest.parent.mkdir(parents=True, exist_ok=True)
    out.save(dest, format="PNG", optimize=True)


def run_job(job: Path, font: str, only: str | None) -> int:
    copy_path = job / "copy.json"
    if not copy_path.exists():
        raise SystemExit(f"missing {copy_path}")
    copy = load_copy(copy_path)
    raw_dir = job / "raw"
    baked_dir = job / "baked"
    if not raw_dir.is_dir():
        raise SystemExit(f"missing raw dir: {raw_dir}")

    files = sorted(raw_dir.glob("*.png"))
    if only:
        files = [p for p in files if p.name == only or p.stem == only]
    if not files:
        raise SystemExit("no raw png files found")

    # Optional per-file overrides: copy.json "files": { "stem": {"main":...} }
    per_file = copy.get("files") or {}

    for src in files:
        if src.stem.endswith("-ja"):
            continue
        overrides = per_file.get(src.stem) or per_file.get(src.name) or {}
        main = overrides.get("main", copy["main"])
        sub = overrides.get("sub", copy.get("sub", ""))
        accent = overrides.get("accent", copy.get("accent", "#60a5fa"))
        dest = baked_dir / f"{src.stem}-ja.png"
        bake_one(src, dest, main, sub, accent, font)
        print(f"wrote {dest}")
    return 0


def main(argv: list[str]) -> int:
    p = argparse.ArgumentParser(description="Bake Japanese OG text band")
    p.add_argument("--job", type=Path, help="Vault staging job folder")
    p.add_argument("--input", type=Path, help="Single input PNG")
    p.add_argument("--output", type=Path, help="Single output PNG")
    p.add_argument("--main", type=str, help="Main text (single mode)")
    p.add_argument("--sub", type=str, default="", help="Sub text (single mode)")
    p.add_argument("--accent", type=str, default="#60a5fa")
    p.add_argument("--font", type=str, required=True, help="Path to CJK font file")
    p.add_argument("--only", type=str, default=None, help="Only bake one raw filename/stem")
    args = p.parse_args(argv)

    if args.job:
        return run_job(args.job, args.font, args.only)

    if not (args.input and args.output and args.main):
        raise SystemExit("Use --job, or --input --output --main together")
    bake_one(args.input, args.output, args.main, args.sub, args.accent, args.font)
    print(f"wrote {args.output}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
