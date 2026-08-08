import type { AffiliateProgram } from "../types";

const BASE_CLICK =
  "https://af.moshimo.com/af/c/click?a_id=5660294&p_id=2635&pc_id=5894";
const BASE_IMPRESSION =
  "https://i.moshimo.com/af/i/impression?a_id=5660294&p_id=2635&pc_id=5894";

export const techgymProgram: AffiliateProgram = {
  id: "techgym",
  displayName: "テックジム",
  asp: "moshimo",
  placement: "direct",
  creatives: {
    "text": {
      href: `${BASE_CLICK}&pl_id=33601`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=33601`,
    },
    "banner-588x151": {
      href: `${BASE_CLICK}&pl_id=71613`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=71613`,
      bannerImageUrl: "https://image.moshimo.com/af-img/2083/000000071613.png",
      width: 588,
      height: 151,
    },
    "banner-728x90": {
      href: `${BASE_CLICK}&pl_id=33625`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=33625`,
      bannerImageUrl: "https://image.moshimo.com/af-img/2083/000000033625.png",
      width: 728,
      height: 90,
    },
    "banner-300x250": {
      href: `${BASE_CLICK}&pl_id=33624`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=33624`,
      bannerImageUrl: "https://image.moshimo.com/af-img/2083/000000033624.png",
      width: 300,
      height: 250,
    },
    "banner-336x280": {
      href: `${BASE_CLICK}&pl_id=33623`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=33623`,
      bannerImageUrl: "https://image.moshimo.com/af-img/2083/000000033623.png",
      width: 336,
      height: 280,
    },
    "banner-250x250": {
      href: `${BASE_CLICK}&pl_id=33622`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=33622`,
      bannerImageUrl: "https://image.moshimo.com/af-img/2083/000000033622.png",
      width: 250,
      height: 250,
    },
    "banner-300x300": {
      href: `${BASE_CLICK}&pl_id=33621`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=33621`,
      bannerImageUrl: "https://image.moshimo.com/af-img/2083/000000033621.png",
      width: 300,
      height: 300,
    },
  },
};
