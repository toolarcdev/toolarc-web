import { readFile } from "fs/promises";
import path from "path";

export type BlogPostMetadata = {
  title?: string;
  slug?: string;
  description?: string;
  date?: string;
  tags?: string[];
  coverImage?: string;
};

export async function loadPostMetadata(
  contentId: string,
): Promise<BlogPostMetadata | null> {
  const filePath = path.join(
    process.cwd(),
    "content",
    "blog",
    contentId,
    "metadata.json",
  );
  try {
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as BlogPostMetadata;
  } catch {
    return null;
  }
}
