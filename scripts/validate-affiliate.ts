import { validateAffiliateContent } from "../lib/affiliate/validate";

async function main() {
  const issues = await validateAffiliateContent();
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warn");

  for (const issue of warnings) {
    console.warn(`[warn] ${issue.file}${issue.slug ? ` (${issue.slug})` : ""}: ${issue.message}`);
  }

  for (const issue of errors) {
    console.error(`[error] ${issue.file}${issue.slug ? ` (${issue.slug})` : ""}: ${issue.message}`);
  }

  if (errors.length > 0) {
    console.error(`\nvalidate:affiliate failed with ${errors.length} error(s).`);
    process.exit(1);
  }

  console.log("validate:affiliate passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
