# AI_USAGE_LOG.md

## Entry: Gemini PDF Analysis Reliability Fix

- Date: 2026-05-06
- Branch: fix/c-gemini-pdf-analysis
- Owner: Kisi C
- AI Role: Expert Developer Agent / QA Support

## AI Assisted Work

- `@google/genai` dependency installation was verified.
- Unreadable PDFs now produce Riskli / Manuel Kontrol instead of blocking the whole analysis.
- Recruitment analysis now shows missing fields, risks and a human-approved email draft.
- Document analysis now shows missing fields, risks and a human-approved email draft.
- Gemini quota/high-demand errors now return safer health messages while analysis can continue through fallback.

## Human Reviewed Work

- Kisi C teknik dogruluk ve testleri kontrol edecek.
- Kisi A guvenlik ve API key kullanimini kontrol edecek.
- Kisi B UI'da eksik/risk/taslak alanlarini kontrol edecek.

## Risk / Limitation

- Gemini API key valid olsa bile provider 429/503 donebilir.
- Bu durumda urun fallback analiz sonucu gosterir.
- Taranmis gorsel PDF'ler OCR olmadan metin cikarmaz; sistem bu belgeleri manuel kontrole alir.

## Entry: Branding and Logo Integration

- Date: 2026-05-06
- Branch: feature/b-brand-consistency-and-logo-integration
- Owner: Kişi B
- AI Role: Frontend / UX Agent; Brand Consistency Agent

## AI Assisted Work

- Logo entegrasyonu planlandı.
- Landing, start ve dashboard için ortak tasarım dili oluşturuldu.
- Tasarım sistemi tutarlılığı artırıldı.
- Ortak component yaklaşımı önerildi.
- Marka görünümü güçlendirildi.

## Human Reviewed Work

- Kişi B görsel tutarlılığı kontrol edecek.
- Kişi A ürün anlatımı ve problem-fikir uyumunu kontrol edecek.
- Kişi C veri akışı ve ekran uyumunu kontrol edecek.

## Affected Files

- public/queueless-ai-logo.svg
- src/components/BrandLogo.tsx
- src/components/TopNav.tsx
- src/components/PageSection.tsx
- src/components/SectionTitle.tsx
- src/components/InfoCard.tsx
- src/components/PrimaryButton.tsx
- src/components/FileUploadZone.tsx
- src/components/SiteHeader.tsx
- src/components/HeroSection.tsx
- src/components/FeatureSection.tsx
- src/components/UseCaseCards.tsx
- src/components/CtaSection.tsx
- src/components/PdfUploadPanel.tsx
- src/components/InboxDashboard.tsx
- src/components/RecruitmentFlow.tsx
- src/components/AcademicFlow.tsx
- src/components/JobPostingAnalyzerPanel.tsx
- src/app/start/page.tsx
- src/app/internship/page.tsx
- scripts/quality-check.mjs
- README.md
- TEST_PLAN.md
- REVIEW_LOG.md
- PROMPT_HISTORY.md
- TASK_BOARD.md

## Risk / Limitation

- Kullanıcı tarafından ayrı bir binary logo dosyası repo içinde bulunmadığı için marka tarifine uygun ölçeklenebilir SVG logo eklendi.
- Tasarım değişikliği frontend katmanındadır; gerçek mail, gerçek AI API veya gerçek kişisel veri eklenmedi.

## Entry: Landing Page and Multi-Flow UI

- Date: 2026-05-06
- Branch: feature/b-landing-and-multi-flow-ui
- Owner: Kişi B
- AI Role: Frontend / UX Agent

## AI Assisted Work

- Modern landing page tasarlandı.
- Multi-flow navigation yapısı oluşturuldu.
- Recruitment ve Academic akışları için UI planlandı.
- Job posting link input ve PDF upload alanları tasarlandı.
- Modern green/black design system uygulandı.

## Human Reviewed Work

- Kişi B UI ve kullanılabilirliği kontrol edecek.
- Kişi A problem-fikir uyumu ve anlatım gücünü kontrol edecek.
- Kişi C analyzer entegrasyonu ve veri uyumunu kontrol edecek.

## Files Affected

- src/app/page.tsx
- src/app/dashboard/page.tsx
- src/app/start/page.tsx
- src/app/recruitment/page.tsx
- src/app/academic/page.tsx
- src/components/HeroSection.tsx
- src/components/FeatureSection.tsx
- src/components/UseCaseCards.tsx
- src/components/CtaSection.tsx
- src/components/SiteHeader.tsx
- src/components/SiteFooter.tsx
- src/components/HumanApprovalNotice.tsx
- src/components/RecruitmentFlow.tsx
- src/components/JobPostingAnalyzerPanel.tsx
- src/components/PdfUploadPanel.tsx
- src/components/CandidateCategoryBoard.tsx
- src/components/AcademicFlow.tsx
- src/components/AcademicDocumentAnalyzerPanel.tsx
- src/components/DocumentQueueBoard.tsx
- scripts/quality-check.mjs
- README.md
- TEST_PLAN.md
- REVIEW_LOG.md
- PROMPT_HISTORY.md
- TASK_BOARD.md

## Risks and Limitations

- PDF upload alanları demo frontend state'i ile çalışır; gerçek dosya parsing yapılmaz.
- İş ilanı link analizi mock summary üretir; gerçek scraping veya AI API çağrısı yoktur.
- Gerçek mail gönderimi, gerçek kişisel veri ve API key kullanılmaz.

## Entry: AGENTS.md Project Instructions

- Date: 2026-05-06
- Branch: docs/a-agents-instructions
- Owner: Kişi A
- AI Role: Plan Agent

## AI Assisted Work

- Proje adı, hedefi, MVP kapsamı ve güvenlik kuralları kalıcı talimat dosyasına dönüştürüldü.
- Ekip rolleri ve GitHub workflow kuralları yapılandırıldı.

## Human Reviewed Work

- Kişi A proje kurallarını kontrol eder.
- Kişi C güvenlik ve teknik kapsam uyumunu review eder.

## Affected Files

- AGENTS.md

## Risk / Limitation

- Bu kayıt yalnızca talimat dosyası içindir; ürün davranışı uygulamaz.

## Entry: Problem Fit and Hackathon Documentation

- Date: 2026-05-06
- Branch: docs/a-problem-fit-and-documentation
- Owner: Kişi A
- AI Role: Documentation Agent

## AI Assisted Work

- Problem-fikir uyumu metni hazırlandı.
- Mimari plan oluşturuldu.
- Roadmap oluşturuldu.
- GitHub workflow belgelendi.
- Güvenlik ve insan onayı kuralları dokümante edildi.

## Human Reviewed Work

- Kişi A kapsamı ve jüri anlatımını kontrol eder.
- Kişi C teknik doğruluk ve güvenlik sınırlarını review eder.
- Kişi B demo akışı açısından opsiyonel review yapar.

## Affected Files

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

## Risk / Limitation

- Bu adım dokümantasyon odaklıdır; uygulama davranışı tek başına kanıtlamaz.

## Entry: Mock AI Analyzer and Application Data

- Date: 2026-05-06
- Branch: feature/c-ai-analyzer-and-mock-data
- Owner: Kişi C
- AI Role: Expert Developer Agent

## AI Assisted Work

- Veri modeli tasarlandı.
- Mock başvuru senaryoları oluşturuldu.
- Deterministic analyzer karar kuralları yazıldı.
- Checklist ve queue mantığı tasarlandı.
- Test senaryoları çıkarıldı.

## Human Reviewed Work

- Kişi C logic doğruluğunu kontrol eder.
- Kişi B frontend entegrasyonu açısından çıktı formatını kontrol eder.
- Kişi A güvenlik ve problem-fikir uyumu açısından kontrol eder.

## Affected Files

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

## Risk / Limitation

- Analyzer deterministic mock davranış üretir; gerçek AI API kullanılmaz.
- Mock data sahte demo verisidir; gerçek kişisel veri içermez.
- Cevap üretimi yalnızca taslaktır; gerçek mail gönderimi yapmaz.

## Entry: Dashboard and Demo UI

- Date: 2026-05-06
- Branch: feature/b-dashboard-and-demo-ui
- Owner: Kişi B
- AI Role: Frontend / UX Agent

## AI Assisted Work

- Dashboard component yapısı tasarlandı.
- Başvuru listesi ve detay ekranı planlandı.
- Checklist ve mail taslağı UI akışı oluşturuldu.
- Human-in-the-loop mail onay akışı UI'da gösterildi.

## Human Reviewed Work

- Kişi B UI kullanılabilirliğini kontrol eder.
- Kişi A problem-fikir uyumu ve demo anlatımı açısından kontrol eder.
- Kişi C veri modeli ve analyzer çıktısıyla uyumu kontrol eder.

## Affected Files

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

## Risk / Limitation

- UI mock local data ile çalışır; gerçek mail inbox entegrasyonu yoktur.
- Gerçek AI API çağrısı yapılmaz.
- Mail onayı yalnızca demo simülasyonu üretir.

## Entry: Queue Filters and Human Approval Flow

- Date: 2026-05-06
- Branch: feature/b-queue-and-approval-flow
- Owner: Kişi B
- AI Role: Frontend / UX Agent

## AI Assisted Work

- Kuyruk filtreleme akışı tasarlandı.
- Dashboard metrikleri mock data'ya bağlandı.
- Mail taslağı düzenleme ve onay simülasyonu oluşturuldu.
- Riskli başvurular için güvenli UI davranışı eklendi.

## Human Reviewed Work

- Kişi B UI davranışını kontrol eder.
- Kişi C analyzer ve queue data uyumunu kontrol eder.
- Kişi A insan onayı ve problem-fikir uyumu açısından kontrol eder.

## Affected Files

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

## Risk / Limitation

- Entegrasyon mock data ve deterministic analyzer çıktısıyla çalışır.
- Gerçek AI API çağrısı veya gerçek mail servisi kullanılmaz.
- Riskli başvurular taslak gösterse bile onay simülasyonuna kapalıdır.

## Entry: MVP Validation and Security Checks

- Date: 2026-05-06
- Branch: test/c-final-validation
- Owner: Kişi C
- AI Role: QA / Security Agent

## AI Assisted Work

- Test senaryoları çıkarıldı.
- Analyzer ve queue edge-case'leri kontrol edildi.
- Güvenlik riskleri incelendi.
- Final AI audit içeriği hazırlandı.

## Human Reviewed Work

- Kişi C test sonuçlarını kontrol eder.
- Kişi A final audit ve hakem uyumunu kontrol eder.
- Kişi B UI demo akışını kontrol eder.

## Affected Files

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

## Risk / Limitation

- QA tests deterministic mock data ile çalışır.
- Gerçek mail servisi, gerçek AI API veya gerçek kişisel veri kullanılmaz.
- Browser tabanlı E2E test eklenmedi; Next.js build, logic tests ve manual QA checklist ile doğrulama yapıldı.

## Entry: Final Presentation and AI Audit

- Date: 2026-05-06
- Branch: docs/a-final-presentation-and-audit
- Owner: Kişi A
- AI Role: Final Audit Agent / Presentation Coach

## AI Assisted Work

- Final jüri anlatımı hazırlandı.
- Hakem kriteri uyum tablosu oluşturuldu.
- Demo script final hale getirildi.
- Final AI audit tamamlandı.

## Human Reviewed Work

- Kişi A problem-fikir uyumunu kontrol edecek.
- Kişi B demo ekran sırasını kontrol edecek.
- Kişi C teknik doğruluk ve test sonuçlarını kontrol edecek.

## Affected Files

- README.md
- PROBLEM_FIT.md
- DEMO_SCRIPT.md
- FINAL_AI_AUDIT.md
- HAKEM_CHECKLIST.md
- AI_USAGE_LOG.md
- REVIEW_LOG.md
- PROMPT_HISTORY.md
- TASK_BOARD.md
- TEST_PLAN.md
- SECURITY_NOTES.md

## Risk / Limitation

- Bu adım final dokümantasyon ve sunum hazırlığıdır.
- Gerçek mail entegrasyonu, gerçek AI API entegrasyonu veya gerçek kişisel veri eklemez.
- Final doğrulama için lint, build ve test komutları ayrıca çalıştırılmalıdır.

## Entry: Final Submission and Demo Rehearsal

- Date: 2026-05-06
- Branch: chore/a-final-submission
- Owner: Kişi A
- AI Role: Final Submission Agent / Demo Rehearsal Coach

## AI Assisted Work

- Final teknik teslim checklist'i hazırlandı.
- Demo provası planlandı.
- Jüri soru-cevap hazırlığı yapıldı.
- Hakem kriteri final kontrolü oluşturuldu.

## Human Reviewed Work

- Kişi A problem-fikir uyumunu kontrol edecek.
- Kişi B demo ekranlarını kontrol edecek.
- Kişi C teknik doğruluk ve testleri kontrol edecek.

## Affected Files

- DEMO_SCRIPT.md
- FINAL_AI_AUDIT.md
- HAKEM_CHECKLIST.md
- SUBMISSION_CHECKLIST.md
- AI_USAGE_LOG.md
- REVIEW_LOG.md
- TASK_BOARD.md
- PROMPT_HISTORY.md

## Risk / Limitation

- Bu adım final teslim hazırlığıdır; büyük özellik geliştirme içermez.
- Gerçek mail entegrasyonu, gerçek AI API veya gerçek kişisel veri eklenmez.
- Demo provası insan kontrolüyle tamamlanmalıdır.

## Entry: Switch AI Provider from Gemma to Gemini

- Date: 2026-05-06
- Branch: feature/c-switch-from-gemma-to-gemini
- Owner: Kişi C
- AI Role: Expert Developer Agent / AI Integration Agent / Security Review Agent

## AI Assisted Work

- Gemini server-side client tasarlandı.
- Recruitment/CV analiz endpointi Gemini API formatına taşındı.
- Staj/belge analiz endpointi Gemini API formatına taşındı.
- Safe JSON parse, PDF validation ve fallback analyzer akışı eklendi.
- API key güvenlik kuralları ve test senaryoları dokümante edildi.

## Human Reviewed Work

- Kişi C AI entegrasyonunu ve testleri kontrol edecek.
- Kişi B frontend response formatını kontrol edecek.
- Kişi A güvenlik ve problem-fikir uyumunu kontrol edecek.

## Risk / Limitation

- Gemini çıktıları insan tarafından kontrol edilmelidir.
- PDF text extraction her PDF'de kusursuz olmayabilir.
- API key eksik veya hatalıysa health endpoint hata döner ve analiz fallback'e düşer.
