import type { AffiliateProgram } from "../types";

export const amazonPrimeVideoProgram: AffiliateProgram = {
  id: "amazon-prime-video",
  displayName: "Amazon Prime Video",
  asp: "valuecommerce",
  placement: "direct",
  creatives: {
    "text": {
      href: "https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3771139&pid=892675007",
      impressionUrl: "https://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3771139&pid=892675007",
    },
    "banner-300x250": {
      href: "https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3771139&pid=892675008",
      impressionUrl: "https://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3771139&pid=892675008",
      bannerImageUrl: "https://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3771139&pid=892675008",
      width: 300,
      height: 250,
    },
    "banner-200x200": {
      href: "https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3771139&pid=892675009",
      impressionUrl: "https://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3771139&pid=892675009",
      bannerImageUrl: "https://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3771139&pid=892675009",
      width: 200,
      height: 200,
    },
  },
};
