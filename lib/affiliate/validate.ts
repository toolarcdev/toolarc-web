import { readdir, readFile } from "fs/promises";
import path from "path";
import { blogPosts } from "@/lib/blog/posts";
import {
  AFFILIATE_BANNER_MARKER_RE,
  AFFILIATE_LINK_RE,
} from "./resolve";
import { isKnownAffiliateRef } from "./registry";
import { DIRECT_AFFILIATE_BLOCKED_SLUGS } from "./policy";

const CONTENT_ROOT = path.join(process.cwd(), "content/blog");

const RAW_AFFILIATE_URL_PATTERNS = [
  /af\.moshimo\.com/i,
  /i\.moshimo\.com\/af\/i\/impression/i,
  /image\.moshimo\.com\/af-img/i,
  /px\.a8\.net/i,
  /www\d*\.a8\.net/i,
  /h\.accesstrade\.net/i,
  /rakurin\.net/i,
];

export type AffiliateValidationIssue = {
  file: string;
  slug?: string;
  message: string;
  severity: "error" | "warn";
};

async function collectMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectMarkdownFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function slugFromMarkdownPath(filePath: string): string | undefined {
  const relative = path.relative(CONTENT_ROOT, filePath).replace(/\\/g, "/");
  const fileName = relative.split("/").pop();
  if (!fileName) return undefined;

  const slugMatch = fileName.match(/^\d+-(.+)\.md$/);
  if (slugMatch) return slugMatch[1];

  for (const [slug, config] of Object.entries(blogPosts)) {
    if (relative === `${config.contentId}/${config.markdownFile}`) {
      return slug;
    }
  }

  return undefined;
}

function collectAffiliateRefs(content: string): Array<{ programId: string; creativeId: string }> {
  const refs: Array<{ programId: string; creativeId: string }> = [];
  const seen = new Set<string>();

  const add = (programId: string, creativeId: string) => {
    const key = `${programId}:${creativeId}`;
    if (seen.has(key)) return;
    seen.add(key);
    refs.push({ programId, creativeId });
  };

  for (const match of content.matchAll(AFFILIATE_LINK_RE)) {
    add(match[1], match[2]);
  }
  for (const match of content.matchAll(AFFILIATE_BANNER_MARKER_RE)) {
    add(match[1], match[2]);
  }

  return refs;
}

export async function validateAffiliateContent(): Promise<AffiliateValidationIssue[]> {
  const issues: AffiliateValidationIssue[] = [];
  const files = await collectMarkdownFiles(CONTENT_ROOT);

  for (const filePath of files) {
    const content = await readFile(filePath, "utf8");
    const relativeFile = path.relative(process.cwd(), filePath).replace(/\\/g, "/");
    const slug = slugFromMarkdownPath(filePath);

    for (const pattern of RAW_AFFILIATE_URL_PATTERNS) {
      if (pattern.test(content)) {
        issues.push({
          file: relativeFile,
          slug,
          severity: "error",
          message:
            "生の ASP / 公式 URL が含まれています。affiliate: キーまたはバナーマーカーを使ってください。",
        });
        break;
      }
    }

    const refs = collectAffiliateRefs(content);
    for (const ref of refs) {
      if (!isKnownAffiliateRef(ref.programId, ref.creativeId)) {
        issues.push({
          file: relativeFile,
          slug,
          severity: "error",
          message: `未知のアフィリエイト参照: ${ref.programId}:${ref.creativeId}`,
        });
      }
    }

    if (slug && DIRECT_AFFILIATE_BLOCKED_SLUGS.has(slug) && refs.length > 0) {
      issues.push({
        file: relativeFile,
        slug,
        severity: "error",
        message: `比較シリーズ slug (${slug}) では直アフィリエイトを配置できません。`,
      });
    }
  }

  return issues;
}
