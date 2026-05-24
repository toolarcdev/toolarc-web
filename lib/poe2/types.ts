export type SearchMode = "or" | "and";

export type ModSearchResult = {
  id: number;
  text: { ja: string };
};

export type SelectedMod = ModSearchResult;

export type RegexBuildResponse = {
  regex: string;
  length: number;
  overLimit: boolean;
};
