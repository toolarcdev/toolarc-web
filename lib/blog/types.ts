/** 記事レジストリの1件分（管理用 ID と公開設定） */
export type BlogPostConfig = {
  /** content/blog/ 配下の管理用フォルダ名（例: 01-site-launch） */
  contentId: string;
  /** contentId フォルダ内の Markdown ファイル名 */
  markdownFile: string;
  /** public/images/blog/ 配下の画像フォルダに対応する URL パス */
  imageBasePath: string;
  publishedAt: string;
  /** OGP 用の代表画像（imageBasePath からの相対ファイル名） */
  ogImage: string;
};

export type BlogPostMeta = BlogPostConfig & {
  /** 公開 URL の slug（/blog/[slug]） */
  slug: string;
  /** 読み込み用の Markdown フルパス（プロジェクトルートからの相対） */
  markdownPath: string;
};

export type BlogPost = BlogPostMeta & {
  title: string;
  description: string;
  content: string;
  tags: string[];
};
