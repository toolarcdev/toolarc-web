import type { AffiliateCreative, AffiliateProgram } from "../types";

const CLICK_BASE = "https://h.accesstrade.net/sp/cc?rk=";
const RR_BASE = "https://h.accesstrade.net/sp/rr?rk=";

function clickUrl(rk: string): string {
  return `${CLICK_BASE}${rk}`;
}

function rrUrl(rk: string): string {
  return `${RR_BASE}${rk}`;
}

function textCreative(rk: string): AffiliateCreative {
  return {
    href: clickUrl(rk),
    impressionUrl: rrUrl(rk),
  };
}

function bannerCreative({
  rk,
  width,
  height,
}: {
  rk: string;
  width: number;
  height: number;
}): AffiliateCreative {
  const imageUrl = rrUrl(rk);
  return {
    href: clickUrl(rk),
    impressionUrl: imageUrl,
    bannerImageUrl: imageUrl,
    width,
    height,
  };
}

export const aiSkillAcademyProgram: AffiliateProgram = {
  id: "ai-skill-academy",
  displayName: "AIスキルアカデミー",
  asp: "accesstrade",
  placement: "direct",
  creatives: {
    "text-main": textCreative("0100q2kh00ouwh"),
    "banner-250x250-main": bannerCreative({
      rk: "0100q2pb00ouwh",
      width: 250,
      height: 250,
    }),
    "banner-300x250-a": bannerCreative({
      rk: "0100q2pa00ouwh",
      width: 300,
      height: 250,
    }),
    "banner-300x250-b": bannerCreative({
      rk: "0100q2p800ouwh",
      width: 300,
      height: 250,
    }),
    "banner-120x60-main": bannerCreative({
      rk: "0100q2pl00ouwh",
      width: 120,
      height: 60,
    }),
  },
};
