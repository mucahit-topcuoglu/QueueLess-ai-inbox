import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const requiredFiles = [
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/globals.css",
  "src/components/InboxDashboard.tsx",
  "src/components/DashboardCards.tsx",
  "src/components/ApplicationList.tsx",
  "src/components/ApplicationDetail.tsx",
  "src/components/QueueTabs.tsx",
  "src/components/ChecklistView.tsx",
  "src/components/EmailDraftPanel.tsx",
  "src/components/AiDecisionPanel.tsx",
  "src/components/StatusBadge.tsx",
  "src/types/dashboard.ts",
  "src/types/application.ts",
  "src/data/mockApplications.ts",
  "src/lib/analyzer.ts",
  "src/lib/queueEngine.ts",
  "src/lib/approvalFlow.ts",
  "src/lib/emailDraft.ts",
  "src/lib/constants.ts",
  "src/lib/analyzer.test.ts",
  "src/lib/queueEngine.test.ts",
  "src/lib/approvalFlow.test.ts",
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

  return /\.(ts|tsx|mjs)$/.test(item)
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
