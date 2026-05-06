import { fileURLToPath, pathToFileURL } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));

const testFiles = [
  "src/lib/analyzer.test.ts",
  "src/lib/queueEngine.test.ts",
  "src/lib/approvalFlow.test.ts",
  "src/lib/ai/aiIntegration.test.ts"
];

for (const testFile of testFiles) {
  console.log(`Running ${testFile}`);
  await import(pathToFileURL(join(root, testFile)).href);
}

console.log("All MVP validation tests passed.");
