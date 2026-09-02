import type { AffiliateProgram } from "../types";

const SID = "3771139";
const CLICK = "https://ck.jp.ap.valuecommerce.com/servlet/referral";
const IMPRESSION = "https://ad.jp.ap.valuecommerce.com/servlet/gifbanner";

function vcCreative(pid: string, width?: number, height?: number) {
  return {
    href: `${CLICK}?sid=${SID}&pid=${pid}`,
    impressionUrl: `${IMPRESSION}?sid=${SID}&pid=${pid}`,
    ...(width && height
      ? {
          bannerImageUrl: `${IMPRESSION}?sid=${SID}&pid=${pid}`,
          width,
          height,
        }
      : {}),
  };
}

export const internetAcademyProgram: AffiliateProgram = {
  id: "internet-academy",
  displayName: "インターネット・アカデミー",
  asp: "valuecommerce",
  placement: "direct",
  creatives: {
    "text-ai-20s": vcCreative("892675010"),
    "text-business-ai": vcCreative("892690804"),
    "banner-300x250-mamaedu": vcCreative("892690813", 300, 250),
    "banner-300x250-business-ai": vcCreative("892690805", 300, 250),
    "banner-300x250-business-ai-b": vcCreative("892690806", 300, 250),
    "banner-300x250-ai-20s": vcCreative("892690808", 300, 250),
  },
};
