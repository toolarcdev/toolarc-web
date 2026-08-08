import type { AffiliateProgram } from "../types";

const BASE_CLICK =
  "https://af.moshimo.com/af/c/click?a_id=5660326&p_id=1439&pc_id=2520";
const BASE_IMPRESSION =
  "https://i.moshimo.com/af/i/impression?a_id=5660326&p_id=1439&pc_id=2520";

export const zerosukuProgram: AffiliateProgram = {
  id: "zerosuku",
  displayName: "0円スクール（ゼロスク）",
  asp: "moshimo",
  placement: "direct",
  creatives: {
    "text": {
      href: `${BASE_CLICK}&pl_id=21536`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=21536`,
    },
    "banner-300x110": {
      href: `${BASE_CLICK}&pl_id=53578`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=53578`,
      bannerImageUrl: "https://image.moshimo.com/af-img/0713/000000053578.png",
      width: 300,
      height: 110,
    },
    "banner-300x300": {
      href: `${BASE_CLICK}&pl_id=21748`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=21748`,
      bannerImageUrl: "https://image.moshimo.com/af-img/0713/000000021748.png",
      width: 300,
      height: 300,
    },
    "banner-300x300-b": {
      href: `${BASE_CLICK}&pl_id=21749`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=21749`,
      bannerImageUrl: "https://image.moshimo.com/af-img/0713/000000021749.png",
      width: 300,
      height: 300,
    },
    "banner-300x300-c": {
      href: `${BASE_CLICK}&pl_id=21750`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=21750`,
      bannerImageUrl: "https://image.moshimo.com/af-img/0713/000000021750.png",
      width: 300,
      height: 300,
    },
    "banner-728x90": {
      href: `${BASE_CLICK}&pl_id=21751`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=21751`,
      bannerImageUrl: "https://image.moshimo.com/af-img/0713/000000021751.png",
      width: 728,
      height: 90,
    },
    "banner-300x600": {
      href: `${BASE_CLICK}&pl_id=21752`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=21752`,
      bannerImageUrl: "https://image.moshimo.com/af-img/0713/000000021752.png",
      width: 300,
      height: 600,
    },
  },
};
