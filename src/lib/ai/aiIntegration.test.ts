import assert from "node:assert/strict";

import { buildFallbackDocumentAnalysis, buildFallbackRecruitmentAnalysis } from "./fallbackAnalyzer.ts";
import { parseJsonSafely } from "./safeJson.ts";
import { normalizeDocumentAnalysis, normalizeRecruitmentAnalysis } from "./schemas.ts";
import { MAX_MODEL_TEXT_CHARS, truncateForModel, validatePdfFile } from "../pdf/extractPdfText.ts";

const tests: { name: string; run: () => void }[] = [];

function test(name: string, run: () => void): void {
  tests.push({ name, run });
}

test("Safe JSON parser markdown JSON bloğunu okuyabilmeli", () => {
  const parsed = parseJsonSafely<{ ok: boolean }>("```json\n{\"ok\":true}\n```");

  assert.equal(parsed.ok, true);
});

test("Safe JSON parser metin içindeki JSON object'i çıkarabilmeli", () => {
  const parsed = parseJsonSafely<{ status: string }>("yanıt: {\"status\":\"ok\"} bitti");

  assert.equal(parsed.status, "ok");
});

test("Recruitment normalizer skor ve kategori değerlerini güvenli hale getirmeli", () => {
  const result = normalizeRecruitmentAnalysis({
    candidates: [{ fileName: "cv.pdf", matchScore: 155, category: "garip" }]
  });

  assert.equal(result.candidates[0]?.matchScore, 100);
  assert.equal(result.candidates[0]?.category, "Eksik Bilgi");
});

test("Document normalizer düşük güvenli sonucu manuel kontrole çekmeli", () => {
  const result = normalizeDocumentAnalysis({
    documents: [{ fileName: "belge.pdf", confidenceScore: 20, recommendedQueue: "İncelemeye Alındı" }]
  });

  assert.equal(result.documents[0]?.recommendedQueue, "Riskli / Manuel Kontrol");
});

test("Fallback recruitment analiz sonucu aday listesi döndürmeli", () => {
  const result = buildFallbackRecruitmentAnalysis("React TypeScript developer", [{ fileName: "cv.pdf", text: "Ad Soyad: Demo Aday\nReact TypeScript" }]);

  assert.equal(result.candidates.length, 1);
  assert.equal(result.candidates[0]?.fileName, "cv.pdf");
});

test("Fallback document analiz sonucu belge listesi döndürmeli", () => {
  const result = buildFallbackDocumentAnalysis("Staj Evrakı", [{ fileName: "staj.pdf", text: "Ad Soyad: Demo\nİmza: Var" }]);

  assert.equal(result.documents.length, 1);
});

test("PDF olmayan dosya reddedilmeli", () => {
  const file = new File(["demo"], "demo.txt", { type: "text/plain" });

  assert.throws(() => validatePdfFile(file), /Sadece PDF/);
});

test("Büyük PDF dosyası reddedilmeli", () => {
  const oversizedFile = new File(["x"], "large.pdf", { type: "application/pdf" });
  Object.defineProperty(oversizedFile, "size", { value: 11 * 1024 * 1024 });

  assert.throws(() => validatePdfFile(oversizedFile), /boyutu/);
});

test("PDF metni modele gönderilmeden önce truncate edilmeli", () => {
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
