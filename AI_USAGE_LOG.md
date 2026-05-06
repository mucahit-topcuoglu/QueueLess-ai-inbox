# AI_USAGE_LOG.md

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
