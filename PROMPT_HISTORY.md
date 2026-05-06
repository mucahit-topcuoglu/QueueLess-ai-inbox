# PROMPT_HISTORY.md

## Prompt Summary: Ortak Eğitim Promptu

- Date: 2026-05-06
- Requested by: Kişi A

## Summary

Kişi A, QueueLess AI Inbox projesinin genel kurallarını, ekip rollerini, MVP kapsamını, güvenlik sınırlarını, GitHub workflow beklentilerini ve her yanıtta kullanılacak görev formatını tanımladı.

## Key Instructions Captured

- 1. tur jüri odağı problem-fikir uyumu.
- Gerçek mail gönderimi yok.
- Gerçek AI API zorunlu değil.
- Gerçek kişisel veri yok.
- AI yalnızca insan onayına hazır taslak üretir.
- GitHub branch, commit, PR ve review süreci görünür olmalı.

## Prompt Summary: AGENTS.md Promptu

- Date: 2026-05-06
- Requested by: Kişi A
- Branch: docs/a-agents-instructions

## Summary

Repo kök dizinine Codex'in proje boyunca takip edeceği kalıcı talimat dosyası olan AGENTS.md oluşturulması istendi.

## Key Instructions Captured

- Sadece AGENTS.md oluşturulmalı.
- Uygulama kodu, UI veya analyzer yazılmamalı.
- Proje kuralları, ekip rolleri, GitHub workflow ve hakem hedefleri belgelenmeli.

## Prompt Summary: Documentation Promptu

- Date: 2026-05-06
- Requested by: Kişi A
- Branch: docs/a-problem-fit-and-documentation

## Summary

Kişi A, QueueLess AI Inbox projesinin 1. tur jüri değerlendirmesinde problem konusu ile fikrin uyumluluğunu güçlü göstermek için dokümantasyon temeli hazırlanmasını istedi.

## Key Instructions Captured

- PROBLEM_FIT.md güçlü ve jüri odaklı olmalı.
- README.md, ARCHITECTURE.md, ROADMAP.md ve audit dosyaları oluşturulmalı.
- Manuel süreç 6 dakika, sistemle hedef süreç 2 dakika olarak anlatılmalı.
- Tahmini zaman kazancı %66 olarak konumlandırılmalı.

## Prompt Summary: AI Analyzer Promptu

- Date: 2026-05-06
- Requested by: Kişi C
- Branch: feature/c-ai-analyzer-and-mock-data

## Summary

Kişi C, mock inbox verisi, TypeScript veri modeli, deterministic mock AI analyzer, checklist analizi, queue engine, risk flag mantığı, insan onayına hazır mail taslağı ve test senaryolarının hazırlanmasını istedi.

## Key Instructions Captured

- Gerçek mail entegrasyonu yok.
- Gerçek AI API entegrasyonu yok.
- Mock data sahte demo verisi olmalı.
- Eksik evrak Eksik Evrak kuyruğuna gitmeli.
- Riskli veya düşük güvenli belgeler Riskli / Manuel Kontrol kuyruğuna gitmeli.

## Prompt Summary: Dashboard Promptu

- Date: 2026-05-06
- Requested by: Kişi B
- Branch: feature/b-dashboard-and-demo-ui

## Summary

Kişi B, jüriye gösterilecek demo arayüzünün hazırlanmasını istedi. Dashboard metrikleri, başvuru listesi, kuyruk filtreleri, detay paneli, checklist görünümü, risk uyarıları, AI karar açıklaması ve insan onaylı mail taslağı simülasyonu kapsama alındı.

## Key Instructions Captured

- Dashboard ilk bakışta problem ve çözümü anlatmalı.
- %66 zaman kazancı görünür olmalı.
- Mail taslağı düzenlenebilir olmalı.
- Gönderim gerçek mail değil, demo simülasyonu olmalı.

## Prompt Summary: Queue Approval Promptu

- Date: 2026-05-06
- Requested by: Kişi B
- Branch: feature/b-queue-and-approval-flow

## Summary

Kişi B, mock data ve analyzer çıktılarıyla dashboard arayüzünün bağlanmasını; çalışan kuyruk filtreleri, seçime göre güncellenen detay paneli, düzenlenebilir mail taslağı, insan onaylı simüle gönderim ve riskli başvurularda simülasyon engelinin eklenmesini istedi.

## Key Instructions Captured

- Kuyruk filtreleri status'a göre listeyi değiştirmeli.
- Mail taslağı textarea içinde düzenlenebilir olmalı.
- Onay sonrası başvuru Tamamlananlar filtresinde görünmeli.
- Riskli başvuruda gönderim simülasyonu engellenmeli.

## Prompt Summary: QA Promptu

- Date: 2026-05-06
- Requested by: Kişi C
- Branch: test/c-final-validation

## Summary

Kişi C, MVP için test, kalite kontrol, güvenlik ve final doğrulama adımının hazırlanmasını istedi. Analyzer doğruluğu, queue engine sayımları, eksik evrak tespiti, riskli başvuruların manuel kontrole gitmesi, mail gönderiminin sadece simülasyon olması, dashboard build kontrolü ve final audit dosyalarının güncellenmesi istendi.

## Key Instructions Captured

- `npm run lint`, `npm run build` ve `npm run test` çalışmalı.
- Human approval flow gerçek mail göndermeden simüle edilmeli.
- Riskli başvuruda gönderim simülasyonu engellenmeli.
- TEST_PLAN.md, SECURITY_NOTES.md ve FINAL_AI_AUDIT.md güncellenmeli.

## Prompt Summary: Final Audit Promptu

- Date: 2026-05-06
- Requested by: Kişi A
- Branch: docs/a-final-presentation-and-audit

## Summary

Kişi A, QueueLess AI Inbox projesini 1. tur jüri değerlendirmesine ve final teslim sürecine hazır hale getirmek için final sunum, problem-fikir uyumu, demo script, AI audit, hakem kriteri kontrol listesi ve teslim öncesi dokümantasyonun tamamlanmasını istedi.

## Key Instructions Captured

- Büyük kod değişikliği yapılmamalı.
- Frontend veya analyzer mantığı bozulmamalı.
- Final jüri anlatımı hazırlanmalı.
- Demo ekran sırası netleşmeli.
- AI_USAGE_LOG.md ve REVIEW_LOG.md final formatta görünür olmalı.
- TASK_BOARD.md içinde #10 Final submission güncellenmeli.
- Gerçek mail, gerçek AI API veya gerçek kişisel veri eklenmemeli.
