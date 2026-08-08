import type { AffiliateProgram } from "../types";

const BASE_CLICK =
  "https://af.moshimo.com/af/c/click?a_id=5722017&p_id=2402&pc_id=5229";
const BASE_IMPRESSION =
  "https://i.moshimo.com/af/i/impression?a_id=5722017&p_id=2402&pc_id=5229";

export const programmingHacksProgram: AffiliateProgram = {
  id: "programming-hacks",
  displayName: "ProgrammingHacks（スキルハックス）",
  asp: "moshimo",
  placement: "direct",
  creatives: {
    "text-short": {
      href: `${BASE_CLICK}&pl_id=31556`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=31556`,
    },
    "text": {
      href: `${BASE_CLICK}&pl_id=31555`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=31555`,
    },
    "text-main": {
      href: `${BASE_CLICK}&pl_id=31484`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=31484`,
    },
    "text-writing-hacks": {
      href: `${BASE_CLICK}&pl_id=39877`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=39877`,
    },
    "banner-120x60": {
      href: `${BASE_CLICK}&pl_id=31546`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=31546`,
      bannerImageUrl: "https://image.moshimo.com/af-img/1888/000000031546.png",
      width: 120,
      height: 60,
    },
    "banner-250x250": {
      href: `${BASE_CLICK}&pl_id=31547`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=31547`,
      bannerImageUrl: "https://image.moshimo.com/af-img/1888/000000031547.png",
      width: 250,
      height: 250,
    },
    "banner-300x250": {
      href: `${BASE_CLICK}&pl_id=31548`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=31548`,
      bannerImageUrl: "https://image.moshimo.com/af-img/1888/000000031548.png",
      width: 300,
      height: 250,
    },
    "banner-300x300": {
      href: `${BASE_CLICK}&pl_id=31549`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=31549`,
      bannerImageUrl: "https://image.moshimo.com/af-img/1888/000000031549.png",
      width: 300,
      height: 300,
    },
    "banner-320x100": {
      href: `${BASE_CLICK}&pl_id=31550`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=31550`,
      bannerImageUrl: "https://image.moshimo.com/af-img/1888/000000031550.png",
      width: 320,
      height: 100,
    },
    "banner-336x280": {
      href: `${BASE_CLICK}&pl_id=31551`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=31551`,
      bannerImageUrl: "https://image.moshimo.com/af-img/1888/000000031551.png",
      width: 336,
      height: 280,
    },
    "banner-728x90": {
      href: `${BASE_CLICK}&pl_id=31552`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=31552`,
      bannerImageUrl: "https://image.moshimo.com/af-img/1888/000000031552.png",
      width: 728,
      height: 90,
    },
  },
};
