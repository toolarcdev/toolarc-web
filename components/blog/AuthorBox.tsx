import Image from "next/image";
import {
  AUTHOR_BOX_BIO,
  BRAND_DISPLAY_NAME,
  BRAND_MARK_ALT,
  BRAND_MARK_PATH,
} from "@/lib/brand";

/**
 * Article-end Who label only.
 * No About / GitHub / X links or CTAs (site design D0 / C6 / C12).
 */
export function AuthorBox() {
  return (
    <aside
      aria-label="著者"
      className="mt-12 rounded-xl border border-[#dbeafe] bg-[#f8fbff] px-5 py-5 sm:px-6"
    >
      <div className="flex gap-4">
        <Image
          src={BRAND_MARK_PATH}
          alt={BRAND_MARK_ALT}
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-xl"
          unoptimized
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">
            {BRAND_DISPLAY_NAME}
          </p>
          <p className="mt-1.5 text-sm leading-7 text-slate-600">
            {AUTHOR_BOX_BIO}
          </p>
        </div>
      </div>
    </aside>
  );
}
