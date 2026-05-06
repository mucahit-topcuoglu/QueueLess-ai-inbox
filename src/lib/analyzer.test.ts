import assert from "node:assert/strict";

import { mockApplications } from "../data/mockApplications.ts";
import { analyzeApplication } from "./analyzer.ts";

const tests: { name: string; run: () => void }[] = [];

function test(name: string, run: () => void): void {
  tests.push({ name, run });
}

const byId = (id: string) => {
  const application = mockApplications.find((item) => item.id === id);
  assert.ok(application, `Mock application not found: ${id}`);
  return application;
};

test("Eksik staj evrakı Eksik Evrak kuyruğuna düşmeli", () => {
  const result = analyzeApplication(byId("app-001"));

  assert.equal(result.recommendedQueue, "Eksik Evrak");
  assert.deepEqual(result.missingFields, ["Öğrenci No", "Kurum Adı"]);
});

test("Eksiksiz staj evrakı İncelemeye Alındı kuyruğuna düşmeli", () => {
  const result = analyzeApplication(byId("app-002"));

  assert.equal(result.recommendedQueue, "İncelemeye Alındı");
  assert.deepEqual(result.missingFields, []);
});

test("Düşük güven skorlu belge Riskli / Manuel Kontrol kuyruğuna düşmeli", () => {
  const result = analyzeApplication(byId("app-005"));

  assert.equal(result.recommendedQueue, "Riskli / Manuel Kontrol");
  assert.ok(result.riskFlags.includes("Düşük güven skoru"));
});

test("İmza doğrulanamayan belge Riskli / Manuel Kontrol kuyruğuna düşmeli", () => {
  const result = analyzeApplication(byId("app-006"));

  assert.equal(result.recommendedQueue, "Riskli / Manuel Kontrol");
  assert.ok(result.riskFlags.includes("İmza doğrulanamıyor"));
});

test("Eksik evrak için mail taslağı eksikleri listelemeli", () => {
  const result = analyzeApplication(byId("app-001"));

  assert.match(result.generatedReplyDraft, /Öğrenci No/);
  assert.match(result.generatedReplyDraft, /Kurum Adı/);
  assert.match(result.generatedReplyDraft, /Lütfen eksikleri tamamlayarak/);
});

test("Eksiksiz evrak için mail taslağı incelemeye alındı metni üretmeli", () => {
  const result = analyzeApplication(byId("app-002"));

  assert.match(result.generatedReplyDraft, /eksik tespit edilmemiştir/);
  assert.match(result.generatedReplyDraft, /inceleme sürecine alınmıştır/);
});

test("Analyzer hiçbir şekilde gerçek mail göndermemeli", () => {
  const source = `${analyzeApplication.toString()}\n${JSON.stringify(mockApplications)}`;

  assert.doesNotMatch(source, /\bsendEmail\b/i);
  assert.doesNotMatch(source, /\bnodemailer\b/i);
  assert.doesNotMatch(source, /\bsmtp\b/i);
});

let passed = 0;

for (const item of tests) {
  item.run();
  passed += 1;
  console.log(`ok ${passed} - ${item.name}`);
}

console.log(`${passed} analyzer tests passed.`);
