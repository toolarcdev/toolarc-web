import { aiSkillAcademyProgram } from "./programs/ai-skill-academy";
import { amazonPrimeVideoProgram } from "./programs/amazon-prime-video";
import { audibleProgram } from "./programs/audible";
import { doraverseProgram } from "./programs/doraverse";
import { fjordBootCampProgram } from "./programs/fjord-boot-camp";
import { internetAcademyProgram } from "./programs/internet-academy";
import { kinokuniyaProgram } from "./programs/kinokuniya";
import { programmingHacksProgram } from "./programs/programming-hacks";
import { rakurinProgram } from "./programs/rakurin";
import { techgymProgram } from "./programs/techgym";
import { udemyProgram } from "./programs/udemy";
import { yahooShoppingProgram } from "./programs/yahoo-shopping";
import { zerosukuProgram } from "./programs/zerosuku";
import type {
  AffiliateCreative,
  AffiliateCreativeId,
  AffiliateProgram,
  AffiliateProgramId,
} from "./types";

const programs: Record<AffiliateProgramId, AffiliateProgram> = {
  rakurin: rakurinProgram,
  doraverse: doraverseProgram,
  "ai-skill-academy": aiSkillAcademyProgram,
  "programming-hacks": programmingHacksProgram,
  techgym: techgymProgram,
  "fjord-boot-camp": fjordBootCampProgram,
  zerosuku: zerosukuProgram,
  udemy: udemyProgram,
  audible: audibleProgram,
  kinokuniya: kinokuniyaProgram,
  "amazon-prime-video": amazonPrimeVideoProgram,
  "yahoo-shopping": yahooShoppingProgram,
  "internet-academy": internetAcademyProgram,
};

export function getProgram(programId: string): AffiliateProgram | undefined {
  return programs[programId as AffiliateProgramId];
}

export function getCreative(
  programId: string,
  creativeId: string,
): AffiliateCreative | undefined {
  const program = getProgram(programId);
  if (!program) return undefined;
  return program.creatives[creativeId as AffiliateCreativeId];
}

export function listProgramIds(): AffiliateProgramId[] {
  return Object.keys(programs) as AffiliateProgramId[];
}

export function isKnownAffiliateRef(
  programId: string,
  creativeId: string,
): boolean {
  return Boolean(getCreative(programId, creativeId));
}
