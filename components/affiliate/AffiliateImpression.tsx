type AffiliateImpressionProps = {
  src: string;
};

export function AffiliateImpression({ src }: AffiliateImpressionProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      width={1}
      height={1}
      alt=""
      loading="lazy"
      className="sr-only"
      aria-hidden
    />
  );
}
