# AI_USAGE_LOG.md

## Entry: MVP Validation and Security Checks

- Date: 2026-05-06
- Branch: test/c-final-validation
- Owner: Kisi C
- AI Role: QA Agent / Security Review Agent

## AI Assisted Work

- Test senaryolari cikarildi.
- Analyzer ve queue edge-case'leri kontrol edildi.
- Guvenlik riskleri incelendi.
- Final AI audit icerigi hazirlandi.

## Human Reviewed Work

- Kisi C test sonuclarini kontrol edecek.
- Kisi A final audit ve hakem uyumunu kontrol edecek.
- Kisi B UI demo akisini kontrol edecek.

## Files Affected

- src/lib/approvalFlow.ts
- src/lib/queueEngine.ts
- src/lib/analyzer.test.ts
- src/lib/queueEngine.test.ts
- src/lib/approvalFlow.test.ts
- scripts/run-tests.mjs
- scripts/build-check.mjs
- scripts/quality-check.mjs
- src/components/InboxDashboard.tsx
- TEST_PLAN.md
- SECURITY_NOTES.md
- FINAL_AI_AUDIT.md
- AI_USAGE_LOG.md
- REVIEW_LOG.md
- PROMPT_HISTORY.md
- TASK_BOARD.md

## Risks and Limitations

- QA tests deterministic mock data ile calisir.
- Gercek mail servisi, gercek AI API veya gercek kisisel veri kullanilmaz.
- Browser tabanli E2E test eklenmedi; Next.js build, logic tests ve manual QA checklist ile dogrulama yapildi.
- Riskli basvuruda simulasyon guard'i test edildi.

## Entry: Queue Filters and Human Approval Flow

- Date: 2026-05-06
- Branch: feature/b-queue-and-approval-flow
- Owner: Kişi B
- AI Role: Frontend Integration Agent / Human Approval Flow Agent

## AI Assisted Work

- Kuyruk filtreleme akışı tasarlandı.
- Dashboard metrikleri mock data'ya bağlandı.
- Mail taslağı düzenleme ve onay simülasyonu oluşturuldu.
- Riskli başvurular için güvenli UI davranışı eklendi.

## Human Reviewed Work

- Kişi B UI davranışını kontrol edecek.
- Kişi C analyzer ve queue data uyumunu kontrol edecek.
- Kişi A insan onayı ve problem-fikir uyumu açısından kontrol edecek.

## Files Affected

- src/types/dashboard.ts
- src/components/InboxDashboard.tsx
- src/components/DashboardCards.tsx
- src/components/ApplicationList.tsx
- src/components/ApplicationDetail.tsx
- src/components/EmailDraftPanel.tsx
- src/components/AiDecisionPanel.tsx
- scripts/quality-check.mjs
- README.md
- TEST_PLAN.md
- SECURITY_NOTES.md
- REVIEW_LOG.md
- PROMPT_HISTORY.md
- TASK_BOARD.md

## Risks and Limitations

- Entegrasyon mock data ve deterministic analyzer çıktısıyla çalışır.
- Gerçek AI API çağrısı veya gerçek mail servisi kullanılmaz.
- Riskli başvurular taslak gösterse bile onay simülasyonuna kapalıdır.

## Entry: Dashboard and Demo UI

- Date: 2026-05-06
- Branch: feature/b-dashboard-and-demo-ui
- Owner: Kişi B
- AI Role: Frontend Assistant / UX Agent

## AI Assisted Work

- Dashboard component yapısı tasarlandı.
- Başvuru listesi ve detay ekranı planlandı.
- Checklist ve mail taslağı UI akışı oluşturuldu.
- Human-in-the-loop mail onay akışı UI'da gösterildi.

## Human Reviewed Work

- Kişi B UI kullanılabilirliğini kontrol edecek.
- Kişi A problem-fikir uyumu ve demo anlatımı açısından kontrol edecek.
- Kişi C veri modeli ve analyzer çıktısıyla uyumu kontrol edecek.

## Files Affected

- package.json
- next.config.mjs
- postcss.config.mjs
- tailwind.config.ts
- tsconfig.json
- src/app/layout.tsx
- src/app/page.tsx
- src/app/globals.css
- src/components/InboxDashboard.tsx
- src/components/DashboardCards.tsx
- src/components/ApplicationList.tsx
- src/components/ApplicationDetail.tsx
- src/components/QueueTabs.tsx
- src/components/ChecklistView.tsx
- src/components/EmailDraftPanel.tsx
- src/components/AiDecisionPanel.tsx
- src/components/StatusBadge.tsx
- src/components/EmptyState.tsx
- src/components/LoadingState.tsx
- src/components/ErrorState.tsx
- src/lib/uiLabels.ts
- scripts/quality-check.mjs
- README.md
- TEST_PLAN.md
- SECURITY_NOTES.md
- REVIEW_LOG.md
- PROMPT_HISTORY.md
- TASK_BOARD.md

## Risks and Limitations

- UI mock local data ile çalışır; gerçek mail inbox entegrasyonu yoktur.
- Gerçek AI API çağrısı yapılmaz; Kişi C deterministic analyzer çıktısı kullanılır.
- Mail onayı yalnızca demo simülasyonu üretir ve outbound iletişim başlatmaz.

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
