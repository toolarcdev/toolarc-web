import type { AffiliateCreative, AffiliateProgram } from "../types";

const CLICK_BASE = "https://px.a8.net/svt/ejp?a8mat=4B67CH+ALMVJM+5UDM";

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

export const tenbinAiProgram: AffiliateProgram = {
  id: "tenbin-ai",
  displayName: "天秤AI Biz byGMO",
  asp: "a8",
  placement: "peripheral-only",
  creatives: {
    "text-main": textCreative(
      "BWVTE",
      "https://www13.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+BWVTE",
    ),
    "text-short": textCreative(
      "BX3J6",
      "https://www19.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+BX3J6",
    ),
    "banner-333x35-main": bannerCreative({
      a8Code: "BYT9D",
      impressionUrl:
        "https://www12.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+BYT9D",
      bannerImageUrl:
        "https://www29.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002010000&mc=1",
      width: 333,
      height: 35,
    }),
    "banner-100x60-main": bannerCreative({
      a8Code: "BXB8X",
      impressionUrl:
        "https://www18.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+BXB8X",
      bannerImageUrl:
        "https://www23.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002003000&mc=1",
      width: 100,
      height: 60,
    }),
    "banner-120x60-main": bannerCreative({
      a8Code: "BXIYP",
      impressionUrl:
        "https://www10.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+BXIYP",
      bannerImageUrl:
        "https://www22.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002004000&mc=1",
      width: 120,
      height: 60,
    }),
    "banner-234x60-main": bannerCreative({
      a8Code: "BXQOH",
      impressionUrl:
        "https://www10.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+BXQOH",
      bannerImageUrl:
        "https://www27.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002005000&mc=1",
      width: 234,
      height: 60,
    }),
    "banner-300x250-main": bannerCreative({
      a8Code: "BXYE9",
      impressionUrl:
        "https://www15.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+BXYE9",
      bannerImageUrl:
        "https://www26.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002006000&mc=1",
      width: 300,
      height: 250,
    }),
    "banner-320x50-main": bannerCreative({
      a8Code: "BY641",
      impressionUrl:
        "https://www17.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+BY641",
      bannerImageUrl:
        "https://www26.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002007000&mc=1",
      width: 320,
      height: 50,
    }),
    "banner-468x60-main": bannerCreative({
      a8Code: "BYDTT",
      impressionUrl:
        "https://www10.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+BYDTT",
      bannerImageUrl:
        "https://www21.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002008000&mc=1",
      width: 468,
      height: 60,
    }),
    "banner-100x100-main": bannerCreative({
      a8Code: "BYLJL",
      impressionUrl:
        "https://www10.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+BYLJL",
      bannerImageUrl:
        "https://www23.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002009000&mc=1",
      width: 100,
      height: 100,
    }),
    "banner-342x86-main": bannerCreative({
      a8Code: "BZ0Z5",
      impressionUrl:
        "https://www13.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+BZ0Z5",
      bannerImageUrl:
        "https://www21.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002011000&mc=1",
      width: 342,
      height: 86,
    }),
    "banner-328x62-main": bannerCreative({
      a8Code: "BZ8OX",
      impressionUrl:
        "https://www15.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+BZ8OX",
      bannerImageUrl:
        "https://www24.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002012000&mc=1",
      width: 328,
      height: 62,
    }),
    "banner-665x69-main": bannerCreative({
      a8Code: "BZGEP",
      impressionUrl:
        "https://www19.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+BZGEP",
      bannerImageUrl:
        "https://www22.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002013000&mc=1",
      width: 665,
      height: 69,
    }),
    "banner-684x172-main": bannerCreative({
      a8Code: "BZO4H",
      impressionUrl:
        "https://www11.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+BZO4H",
      bannerImageUrl:
        "https://www28.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002014000&mc=1",
      width: 684,
      height: 172,
    }),
    "banner-656x124-main": bannerCreative({
      a8Code: "BZVU9",
      impressionUrl:
        "https://www12.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+BZVU9",
      bannerImageUrl:
        "https://www20.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002015000&mc=1",
      width: 656,
      height: 124,
    }),
    "banner-997x103-main": bannerCreative({
      a8Code: "C03K1",
      impressionUrl:
        "https://www15.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+C03K1",
      bannerImageUrl:
        "https://www27.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002016000&mc=1",
      width: 997,
      height: 103,
    }),
    "banner-1026x258-main": bannerCreative({
      a8Code: "C0B9T",
      impressionUrl:
        "https://www13.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+C0B9T",
      bannerImageUrl:
        "https://www29.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002017000&mc=1",
      width: 1026,
      height: 258,
    }),
    "banner-983x186-main": bannerCreative({
      a8Code: "C0IZL",
      impressionUrl:
        "https://www12.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+C0IZL",
      bannerImageUrl:
        "https://www27.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002018000&mc=1",
      width: 983,
      height: 186,
    }),
    "banner-1329x137-main": bannerCreative({
      a8Code: "C0QPD",
      impressionUrl:
        "https://www15.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+C0QPD",
      bannerImageUrl:
        "https://www27.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002019000&mc=1",
      width: 1329,
      height: 137,
    }),
    "banner-1367x344-main": bannerCreative({
      a8Code: "C0YF5",
      impressionUrl:
        "https://www12.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+C0YF5",
      bannerImageUrl:
        "https://www23.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002020000&mc=1",
      width: 1367,
      height: 344,
    }),
    "banner-1311x248-main": bannerCreative({
      a8Code: "C164X",
      impressionUrl:
        "https://www17.a8.net/0.gif?a8mat=4B67CH+ALMVJM+5UDM+C164X",
      bannerImageUrl:
        "https://www29.a8.net/svt/bgt?aid=260629937641&wid=001&eno=01&mid=s00000027265002021000&mc=1",
      width: 1311,
      height: 248,
    }),
  },
};
