import { fileURLToPath, pathToFileURL } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));

const modules = [
  "src/lib/constants.ts",
  "src/lib/emailDraft.ts",
  "src/lib/approvalFlow.ts",
  "src/lib/queueEngine.ts",
  "src/data/mockApplications.ts",
  "src/lib/analyzer.ts",
  "src/lib/ai/geminiClient.ts",
  "src/lib/ai/analyzeRecruitment.ts",
  "src/lib/ai/analyzeDocument.ts"
];

for (const modulePath of modules) {
  await import(pathToFileURL(join(root, modulePath)).href);
}

const { mockApplications } = await import(pathToFileURL(join(root, "src/data/mockApplications.ts")).href);
const { analyzeApplication } = await import(pathToFileURL(join(root, "src/lib/analyzer.ts")).href);

if (mockApplications.length < 6) {
  throw new Error("At least 6 mock applications are required.");
}

for (const application of mockApplications) {
  const result = analyzeApplication(application);

  if (!result.generatedReplyDraft) {
    throw new Error(`Missing generated reply draft for ${application.id}.`);
  }

  if (result.generatedReplyDraft.toLowerCase().includes("sent")) {
    throw new Error(`Reply draft must not claim a real send happened for ${application.id}.`);
  }
}

console.log("Build checks passed: TypeScript modules import and analyzer returns demo-safe output.");
