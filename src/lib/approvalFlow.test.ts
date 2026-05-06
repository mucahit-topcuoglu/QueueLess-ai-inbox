import assert from "node:assert/strict";

import { analyzedMockApplications } from "../data/mockApplications.ts";
import { PRODUCT_QUEUES } from "./constants.ts";
import { canSimulateHumanApproval, simulateHumanApproval } from "./approvalFlow.ts";

const tests: { name: string; run: () => void }[] = [];

function test(name: string, run: () => void): void {
  tests.push({ name, run });
}

const editableApplication = analyzedMockApplications.find((application) => application.id === "app-002");
const riskyApplication = analyzedMockApplications.find((application) => application.id === "app-006");

assert.ok(editableApplication, "Editable demo application must exist.");
assert.ok(riskyApplication, "Risky demo application must exist.");

test("Mail taslagi duzenlenebilir ve onay simulasyonunda korunmali", () => {
  const editedDraft = `${editableApplication.generatedReplyDraft}\n\nEk not: QA duzenlemesi.`;
  const result = simulateHumanApproval(editableApplication, editedDraft);

  assert.equal(result.simulated, true);
  assert.equal(result.application.generatedReplyDraft, editedDraft);
});

test("Onay butonu gercek mail gondermez ve sadece simulasyon mesaji uretir", () => {
  const result = simulateHumanApproval(editableApplication, editableApplication.generatedReplyDraft);

  assert.equal(result.message, "Mail gonderildi olarak simule edildi.");
  assert.doesNotMatch(simulateHumanApproval.toString(), /\bsendEmail\b/i);
  assert.doesNotMatch(simulateHumanApproval.toString(), /\bnodemailer\b/i);
  assert.doesNotMatch(simulateHumanApproval.toString(), /\bsmtp\b/i);
});

test("Onay sonrasi basvuru Tamamlananlar durumuna gecmeli", () => {
  const result = simulateHumanApproval(editableApplication, editableApplication.generatedReplyDraft);

  assert.equal(result.application.status, PRODUCT_QUEUES[5]);
});

test("Riskli basvuruda gonderim simulasyonu engellenmeli", () => {
  const result = simulateHumanApproval(riskyApplication, riskyApplication.generatedReplyDraft);

  assert.equal(canSimulateHumanApproval(riskyApplication), false);
  assert.equal(result.simulated, false);
  assert.equal(result.application.status, PRODUCT_QUEUES[4]);
  assert.equal(result.blockedReason, "Manual control is required before approval simulation.");
});

let passed = 0;

for (const item of tests) {
  item.run();
  passed += 1;
  console.log(`ok ${passed} - ${item.name}`);
}

console.log(`${passed} human approval tests passed.`);
