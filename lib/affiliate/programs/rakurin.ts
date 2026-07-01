import type { AffiliateProgram } from "../types";

const BASE_CLICK =
  "https://af.moshimo.com/af/c/click?a_id=5660286&p_id=5432&pc_id=14858";
const BASE_IMPRESSION =
  "https://i.moshimo.com/af/i/impression?a_id=5660286&p_id=5432&pc_id=14858";

export const rakurinProgram: AffiliateProgram = {
  id: "rakurin",
  displayName: "Rakurin（ラクリン）",
  asp: "moshimo",
  placement: "direct",
  creatives: {
    text: {
      href: `${BASE_CLICK}&pl_id=70483`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=70483`,
    },
    "banner-120x60": {
      href: `${BASE_CLICK}&pl_id=70496`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=70496`,
      bannerImageUrl: "https://image.moshimo.com/af-img/2131/000000070496.jpg",
      width: 120,
      height: 60,
    },
    "banner-300x250": {
      href: `${BASE_CLICK}&pl_id=70498`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=70498`,
      bannerImageUrl: "https://image.moshimo.com/af-img/2131/000000070498.jpg",
      width: 300,
      height: 250,
    },
    "banner-336x280": {
      href: `${BASE_CLICK}&pl_id=70497`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=70497`,
      bannerImageUrl: "https://image.moshimo.com/af-img/2131/000000070497.jpg",
      width: 336,
      height: 280,
    },
  },
};
