import type { AffiliateProgram } from "../types";

const BASE_CLICK =
  "https://af.moshimo.com/af/c/click?a_id=5660282&p_id=6298&pc_id=17753";
const BASE_IMPRESSION =
  "https://i.moshimo.com/af/i/impression?a_id=5660282&p_id=6298&pc_id=17753";

export const bytechProgram: AffiliateProgram = {
  id: "bytech",
  displayName: "バイテック生成AI",
  asp: "moshimo",
  placement: "direct",
  creatives: {
    text: {
      href: `${BASE_CLICK}&pl_id=81145`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=81145`,
    },
    "banner-120x60": {
      href: `${BASE_CLICK}&pl_id=81511`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=81511`,
      bannerImageUrl: "https://image.moshimo.com/af-img/5991/000000081511.png",
      width: 120,
      height: 60,
    },
    "banner-250x250": {
      href: `${BASE_CLICK}&pl_id=81512`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=81512`,
      bannerImageUrl: "https://image.moshimo.com/af-img/5991/000000081512.png",
      width: 250,
      height: 250,
    },
    "banner-300x300": {
      href: `${BASE_CLICK}&pl_id=81513`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=81513`,
      bannerImageUrl: "https://image.moshimo.com/af-img/5991/000000081513.png",
      width: 300,
      height: 300,
    },
    "banner-320x100": {
      href: `${BASE_CLICK}&pl_id=81514`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=81514`,
      bannerImageUrl: "https://image.moshimo.com/af-img/5991/000000081514.png",
      width: 320,
      height: 100,
    },
    "banner-336x280": {
      href: `${BASE_CLICK}&pl_id=81515`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=81515`,
      bannerImageUrl: "https://image.moshimo.com/af-img/5991/000000081515.png",
      width: 336,
      height: 280,
    },
    "banner-728x90": {
      href: `${BASE_CLICK}&pl_id=81516`,
      impressionUrl: `${BASE_IMPRESSION}&pl_id=81516`,
      bannerImageUrl: "https://image.moshimo.com/af-img/5991/000000081516.png",
      width: 728,
      height: 90,
    },
  },
};
