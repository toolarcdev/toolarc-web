import { rakurinProgram } from "./programs/rakurin";
import { tenbinAiProgram } from "./programs/tenbin-ai";
import type {
  AffiliateCreative,
  AffiliateCreativeId,
  AffiliateProgram,
  AffiliateProgramId,
} from "./types";

const programs: Record<AffiliateProgramId, AffiliateProgram> = {
  rakurin: rakurinProgram,
  "tenbin-ai": tenbinAiProgram,
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
