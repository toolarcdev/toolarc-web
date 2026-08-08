import type { AffiliateProgram } from "../types";

const BASE_CLICK =
  "https://af.moshimo.com/af/c/click?a_id=5660271&p_id=7462&pc_id=21548";
const BASE_IMPRESSION =
  "https://i.moshimo.com/af/i/impression?a_id=5660271&p_id=7462&pc_id=21548";

export const fjordBootCampProgram: AffiliateProgram = {
  id: "fjord-boot-camp",
  displayName: "FJORD BOOT CAMP",
  asp: "moshimo",
  placement: "direct",
  creatives: {
    "text": {
      href: `${BASE_CLICK}&pl_id=93643`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=93643`,
    },
    "banner-120x60": {
      href: `${BASE_CLICK}&pl_id=93734`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=93734`,
      bannerImageUrl: "https://image.moshimo.com/af-img/7239/000000093734.png",
      width: 120,
      height: 60,
    },
    "banner-250x250": {
      href: `${BASE_CLICK}&pl_id=93735`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=93735`,
      bannerImageUrl: "https://image.moshimo.com/af-img/7239/000000093735.png",
      width: 250,
      height: 250,
    },
    "banner-300x250": {
      href: `${BASE_CLICK}&pl_id=93736`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=93736`,
      bannerImageUrl: "https://image.moshimo.com/af-img/7239/000000093736.png",
      width: 300,
      height: 250,
    },
    "banner-300x300": {
      href: `${BASE_CLICK}&pl_id=93737`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=93737`,
      bannerImageUrl: "https://image.moshimo.com/af-img/7239/000000093737.png",
      width: 300,
      height: 300,
    },
    "banner-320x100": {
      href: `${BASE_CLICK}&pl_id=93738`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=93738`,
      bannerImageUrl: "https://image.moshimo.com/af-img/7239/000000093738.png",
      width: 320,
      height: 100,
    },
    "banner-336x280": {
      href: `${BASE_CLICK}&pl_id=93739`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=93739`,
      bannerImageUrl: "https://image.moshimo.com/af-img/7239/000000093739.png",
      width: 336,
      height: 280,
    },
    "banner-728x90": {
      href: `${BASE_CLICK}&pl_id=93740`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=93740`,
      bannerImageUrl: "https://image.moshimo.com/af-img/7239/000000093740.png",
      width: 728,
      height: 90,
    },
  },
};
