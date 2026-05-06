import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const requiredFiles = [
  "src/types/application.ts",
  "src/data/mockApplications.ts",
  "src/lib/analyzer.ts",
  "src/lib/queueEngine.ts",
  "src/lib/emailDraft.ts",
  "src/lib/constants.ts",
  "src/lib/analyzer.test.ts",
  "TEST_PLAN.md",
  "SECURITY_NOTES.md",
  "AI_USAGE_LOG.md",
  "REVIEW_LOG.md",
  "PROMPT_HISTORY.md",
  "TASK_BOARD.md"
];

const bannedPatterns = [
  /\bsendEmail\b/i,
  /\bnodemailer\b/i,
  /\bsmtp\b/i,
  /\bmailgun\b/i,
  /\bsendgrid\b/i
];

async function listFiles(dir) {
  const entries = await readdir(dir);
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const entryStat = await stat(fullPath);

    if (entryStat.isDirectory()) {
      if ([".git", "node_modules", "dist", ".next"].includes(entry)) {
        continue;
      }
      files.push(...await listFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

const allFiles = await listFiles(root);
const relativeFiles = new Set(allFiles.map((file) => relative(root, file).replaceAll("\\", "/")));

for (const file of requiredFiles) {
  if (!relativeFiles.has(file)) {
    throw new Error(`Required file is missing: ${file}`);
  }
}

const filesToScanForOutboundMail = allFiles.filter((item) => {
  const normalizedPath = relative(root, item).replaceAll("\\", "/");

  return /\.(ts|mjs)$/.test(item)
    && !normalizedPath.endsWith(".test.ts")
    && normalizedPath !== "scripts/quality-check.mjs";
});

for (const file of filesToScanForOutboundMail) {
  const text = await readFile(file, "utf8");

  for (const pattern of bannedPatterns) {
    if (pattern.test(text)) {
      throw new Error(`Unsafe outbound mail pattern found in ${relative(root, file)}: ${pattern}`);
    }
  }
}

console.log("Quality checks passed: required files exist and no real mail sending code was found.");
