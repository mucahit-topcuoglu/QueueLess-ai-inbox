# AI_USAGE_LOG.md

## Entry: Mock AI Analyzer and Application Data

- Date: 2026-05-06
- Branch: feature/c-ai-analyzer-and-mock-data
- Owner: Kisi C
- AI Role: Expert Developer Agent / AI Workflow Agent

## AI Assisted Work

- Veri modeli tasarlandi.
- Mock basvuru senaryolari olusturuldu.
- Analyzer karar kurallari yazildi.
- Checklist ve queue mantigi tasarlandi.
- Test senaryolari cikarildi.

## Human Reviewed Work

- Kisi C logic dogrulugunu kontrol edecek.
- Kisi B frontend entegrasyonu acisindan cikti formatini kontrol edecek.
- Kisi A guvenlik ve problem-fikir uyumu acisindan kontrol edecek.

## Files Affected

- src/types/application.ts
- src/data/mockApplications.ts
- src/lib/analyzer.ts
- src/lib/queueEngine.ts
- src/lib/emailDraft.ts
- src/lib/constants.ts
- src/lib/analyzer.test.ts
- TEST_PLAN.md
- SECURITY_NOTES.md
- AI_USAGE_LOG.md
- REVIEW_LOG.md
- PROMPT_HISTORY.md
- TASK_BOARD.md

## Risks and Limitations

- Analyzer deterministic mock davranis uretir; gercek AI API kullanilmaz.
- Mock data sahte demo verisidir; gercek kisisel veri icermez.
- Cevap uretimi yalnizca taslaktir; gercek mail gonderimi yapilmaz.
- Node 22 TypeScript type stripping kullanildigi icin ileride Next.js kurulumu gelince build scripti Next.js akisina tasinmalidir.

## Entry: Problem Fit and Hackathon Documentation

- Date: 2026-05-06
- Branch: docs/a-problem-fit-and-documentation
- Owner: Kişi A
- AI Role: Plan Agent / Documentation Agent

## AI Assisted Work

- Problem-fikir uyumu metni hazırlandı.
- Mimari plan oluşturuldu.
- Roadmap oluşturuldu.
- GitHub workflow belgelendi.
- Güvenlik ve insan onayı kuralları dokümante edildi.
- Demo anlatımı ve final audit taslağı hazırlandı.

## Human Reviewed Work

- Takım kaptanı kapsamı kontrol edecek.
- Ekip üyeleri görev dağılımını onaylayacak.
- Kişi C review sürecinde güvenlik, test edilebilirlik ve MVP kapsamını kontrol edecek.

## Files Affected

- README.md
- PROBLEM_FIT.md
- ARCHITECTURE.md
- ROADMAP.md
- TASK_BOARD.md
- AI_USAGE_LOG.md
- REVIEW_LOG.md
- PROMPT_HISTORY.md
- SECURITY_NOTES.md
- DEMO_SCRIPT.md
- FINAL_AI_AUDIT.md
- TEST_PLAN.md

## Risks and Limitations

- Bu adım yalnızca dokümantasyon üretir.
- Gerçek ürün davranışı henüz uygulanmamıştır.
- Gerçek AI API kullanılmamıştır.
- Gerçek mail entegrasyonu yapılmamıştır.
