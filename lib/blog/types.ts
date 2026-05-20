export type BlogPostSlug = "01-site-launch";

export type BlogPostMeta = {
  slug: BlogPostSlug;
  /** Markdown ファイルへのパス（プロジェクトルートからの相対） */
  markdownPath: string;
  /** 記事内の画像パスを解決するときのベース（public 配下） */
  imageBasePath: string;
  publishedAt: string;
};

export type BlogPost = BlogPostMeta & {
  title: string;
  description: string;
  content: string;
};
