import type { AffiliateCreative, AffiliateProgram } from "../types";

const CLICK_BASE = "https://px.a8.net/svt/ejp?a8mat=4B67CH+AF33W2+5UU0";

function clickUrl(a8Code: string): string {
  return `${CLICK_BASE}+${a8Code}`;
}

function textCreative(
  a8Code: string,
  impressionUrl: string,
): AffiliateCreative {
  return {
    href: clickUrl(a8Code),
    impressionUrl,
  };
}

function bannerCreative({
  a8Code,
  impressionUrl,
  bannerImageUrl,
  width,
  height,
}: {
  a8Code: string;
  impressionUrl: string;
  bannerImageUrl: string;
  width: number;
  height: number;
}): AffiliateCreative {
  return {
    href: clickUrl(a8Code),
    impressionUrl,
    bannerImageUrl,
    width,
    height,
  };
}

export const doraverseProgram: AffiliateProgram = {
  id: "doraverse",
  displayName: "Doraverse",
  asp: "a8",
  placement: "direct",
  creatives: {
    "text-main": textCreative(
      "5YJRM",
      "https://www16.a8.net/0.gif?a8mat=4B67CH+AF33W2+5UU0+5YJRM",
    ),
    "text-short": textCreative(
      "5YRHE",
      "https://www15.a8.net/0.gif?a8mat=4B67CH+AF33W2+5UU0+5YRHE",
    ),
    "banner-300x250-main": bannerCreative({
      a8Code: "5Z6WX",
      impressionUrl:
        "https://www11.a8.net/0.gif?a8mat=4B67CH+AF33W2+5UU0+5Z6WX",
      bannerImageUrl:
        "https://www27.a8.net/svt/bgt?aid=260629937630&wid=001&eno=01&mid=s00000027324001004000&mc=1",
      width: 300,
      height: 250,
    }),
    "banner-120x60-main": bannerCreative({
      a8Code: "5YZ75",
      impressionUrl:
        "https://www13.a8.net/0.gif?a8mat=4B67CH+AF33W2+5UU0+5YZ75",
      bannerImageUrl:
        "https://www26.a8.net/svt/bgt?aid=260629937630&wid=001&eno=01&mid=s00000027324001003000&mc=1",
      width: 120,
      height: 60,
    }),
    "banner-125x125-main": bannerCreative({
      a8Code: "5ZEMP",
      impressionUrl:
        "https://www13.a8.net/0.gif?a8mat=4B67CH+AF33W2+5UU0+5ZEMP",
      bannerImageUrl:
        "https://www29.a8.net/svt/bgt?aid=260629937630&wid=001&eno=01&mid=s00000027324001005000&mc=1",
      width: 125,
      height: 125,
    }),
    "banner-100x60-main": bannerCreative({
      a8Code: "5ZMCH",
      impressionUrl:
        "https://www16.a8.net/0.gif?a8mat=4B67CH+AF33W2+5UU0+5ZMCH",
      bannerImageUrl:
        "https://www27.a8.net/svt/bgt?aid=260629937630&wid=001&eno=01&mid=s00000027324001006000&mc=1",
      width: 100,
      height: 60,
    }),
  },
};
