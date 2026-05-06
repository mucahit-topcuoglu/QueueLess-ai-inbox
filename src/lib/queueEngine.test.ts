import assert from "node:assert/strict";

import { analyzedMockApplications } from "../data/mockApplications.ts";
import { PRODUCT_QUEUES } from "./constants.ts";
import { simulateHumanApproval } from "./approvalFlow.ts";
import { calculateQueueCounts, filterApplicationsByQueue, isAwaitingHumanApproval } from "./queueEngine.ts";

const tests: { name: string; run: () => void }[] = [];

function test(name: string, run: () => void): void {
  tests.push({ name, run });
}

const dashboardApplications = analyzedMockApplications.map((application) => ({
  ...application,
  recommendedQueue: application.status
}));

test("Queue sayilari dogru hesaplanmali", () => {
  const counts = calculateQueueCounts(dashboardApplications);

  assert.equal(counts.all, 7);
  assert.equal(counts[PRODUCT_QUEUES[1]], 1);
  assert.equal(counts[PRODUCT_QUEUES[2]], 3);
  assert.equal(counts[PRODUCT_QUEUES[4]], 3);
});

test("Status filtreleri dogru calismali", () => {
  const missingApplications = filterApplicationsByQueue(dashboardApplications, PRODUCT_QUEUES[1]);

  assert.equal(missingApplications.length, 1);
  assert.equal(missingApplications[0]?.id, "app-001");
});

test("Tamamlananlar ayri sayilmali", () => {
  const approvedResult = simulateHumanApproval(dashboardApplications[1], "Edited approval draft");
  const nextApplications = dashboardApplications.map((application) =>
    application.id === approvedResult.application.id ? approvedResult.application : application
  );
  const counts = calculateQueueCounts(nextApplications);

  assert.equal(approvedResult.simulated, true);
  assert.equal(counts[PRODUCT_QUEUES[5]], 1);
  assert.equal(filterApplicationsByQueue(nextApplications, PRODUCT_QUEUES[5]).length, 1);
});

test("Riskli belgeler riskli kuyrugunda gorunmeli", () => {
  const riskyApplications = filterApplicationsByQueue(dashboardApplications, PRODUCT_QUEUES[4]);

  assert.deepEqual(riskyApplications.map((application) => application.id).sort(), ["app-005", "app-006", "app-007"]);
});

test("Onay bekleyen yanitlar dogru sayilmali", () => {
  const awaitingApplications = dashboardApplications.filter(isAwaitingHumanApproval);
  const counts = calculateQueueCounts(dashboardApplications);

  assert.equal(awaitingApplications.length, 4);
  assert.equal(counts[PRODUCT_QUEUES[3]], 4);
});

let passed = 0;

for (const item of tests) {
  item.run();
  passed += 1;
  console.log(`ok ${passed} - ${item.name}`);
}

console.log(`${passed} queue engine tests passed.`);
