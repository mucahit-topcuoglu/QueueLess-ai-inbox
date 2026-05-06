import assert from "node:assert/strict";

import { buildFallbackDocumentAnalysis, buildFallbackRecruitmentAnalysis } from "./fallbackAnalyzer.ts";
import { parseJsonSafely } from "./safeJson.ts";
import { normalizeDocumentAnalysis, normalizeRecruitmentAnalysis } from "./schemas.ts";
import { MAX_MODEL_TEXT_CHARS, truncateForModel, validatePdfFile } from "../pdf/extractPdfText.ts";

const tests: { name: string; run: () => void }[] = [];

function test(name: string, run: () => void): void {
  tests.push({ name, run });
}

test("Safe JSON parser markdown JSON blogunu okuyabilmeli", () => {
  const parsed = parseJsonSafely<{ ok: boolean }>("```json\n{\"ok\":true}\n```");

  assert.equal(parsed.ok, true);
});

test("Safe JSON parser metin icindeki JSON object'i cikarabilmeli", () => {
  const parsed = parseJsonSafely<{ status: string }>("yanit: {\"status\":\"ok\"} bitti");

  assert.equal(parsed.status, "ok");
});

test("Recruitment normalizer skor ve kategori degerlerini guvenli hale getirmeli", () => {
  const result = normalizeRecruitmentAnalysis({
    candidates: [{ fileName: "cv.pdf", matchScore: 155, category: "garip" }]
  });

  assert.equal(result.candidates[0]?.matchScore, 100);
  assert.equal(result.candidates[0]?.category, "Eksik Bilgi");
});

test("Document normalizer dusuk guvenli sonucu manuel kontrole cekmeli", () => {
  const result = normalizeDocumentAnalysis({
    documents: [{ fileName: "belge.pdf", confidenceScore: 20, recommendedQueue: "Incelemeye Alindi" }]
  });

  assert.equal(result.documents[0]?.recommendedQueue, "Riskli / Manuel Kontrol");
});

test("Fallback recruitment analiz sonucu aday listesi dondurmeli", () => {
  const result = buildFallbackRecruitmentAnalysis("React TypeScript developer", [{ fileName: "cv.pdf", text: "Ad Soyad: Demo Aday\nReact TypeScript" }]);

  assert.equal(result.candidates.length, 1);
  assert.equal(result.candidates[0]?.fileName, "cv.pdf");
});

test("Fallback recruitment okunamayan PDF'i eksik bilgi ve risk olarak dondurmeli", () => {
  const result = buildFallbackRecruitmentAnalysis("React TypeScript developer", [{ fileName: "scan.pdf", text: "", extractionError: "PDF metni okunamadi." }]);

  assert.equal(result.candidates[0]?.category, "Eksik Bilgi");
  assert.equal(result.candidates[0]?.risks.length, 1);
  assert.ok(result.candidates[0]?.generatedReplyDraft?.includes("otomatik gonderilmez"));
});

test("Fallback document analiz sonucu belge listesi dondurmeli", () => {
  const result = buildFallbackDocumentAnalysis("Staj Evraki", [{ fileName: "staj.pdf", text: "Ad Soyad: Demo\nImza: Var" }]);

  assert.equal(result.documents.length, 1);
});

test("Fallback document okunamayan PDF'i manuel kontrole yonlendirmeli", () => {
  const result = buildFallbackDocumentAnalysis("Staj Evraki", [{ fileName: "scan.pdf", text: "", extractionError: "PDF metni okunamadi." }]);

  assert.equal(result.documents[0]?.recommendedQueue, "Riskli / Manuel Kontrol");
  assert.equal(result.documents[0]?.missingFields[0], "Okunabilir PDF metni");
});

test("PDF olmayan dosya reddedilmeli", () => {
  const file = new File(["demo"], "demo.txt", { type: "text/plain" });

  assert.throws(() => validatePdfFile(file), /Sadece PDF/);
});

test("PDF uzantili ama MIME tipi bos olan dosya kabul edilmeli", () => {
  const file = new File(["demo"], "demo.pdf", { type: "" });

  assert.doesNotThrow(() => validatePdfFile(file));
});

test("Buyuk PDF dosyasi reddedilmeli", () => {
  const oversizedFile = new File(["x"], "large.pdf", { type: "application/pdf" });
  Object.defineProperty(oversizedFile, "size", { value: 11 * 1024 * 1024 });

  assert.throws(() => validatePdfFile(oversizedFile), /boyutu/);
});

test("PDF metni modele gonderilmeden once truncate edilmeli", () => {
  const text = "x".repeat(MAX_MODEL_TEXT_CHARS + 100);

  assert.equal(truncateForModel(text).length, MAX_MODEL_TEXT_CHARS);
});

let passed = 0;

for (const item of tests) {
  item.run();
  passed += 1;
  console.log(`ok ${passed} - ${item.name}`);
}

console.log(`${passed} AI integration tests passed.`);
