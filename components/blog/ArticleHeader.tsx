import styles from "@/components/blog/ArticlePage.module.css";

type ArticleHeaderProps = {
  title: string;
  publishedAt: string;
  updatedAt?: string;
  showToc: boolean;
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(`${iso}T12:00:00+09:00`));
}

export function ArticleHeader({
  title,
  publishedAt,
  updatedAt,
  showToc,
}: ArticleHeaderProps) {
  return (
    <header className={styles.hero}>
      <div
        className={`${styles.container} ${showToc ? styles.titleGrid : styles.narrow}`}
      >
        <div className={styles.titleCopy}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.dates}>
            <time dateTime={publishedAt}>公開 {formatDate(publishedAt)}</time>
            {updatedAt && (
              <>
                <span aria-hidden="true"> ／ </span>
                <time dateTime={updatedAt}>更新 {formatDate(updatedAt)}</time>
              </>
            )}
          </p>
        </div>
      </div>
    </header>
  );
}
