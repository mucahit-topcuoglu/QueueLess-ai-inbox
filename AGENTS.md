# AGENTS.md

## Project Name

QueueLess AI Inbox

## Project Goal

QueueLess AI Inbox, kuruma mail yoluyla gelen başvuru belgelerini ve ek dosyaları analiz eden, belge türünü otomatik algılayan, eksik alanları checklist’e göre tespit eden ve başvuruları doğru kuyruğa ayıran AI destekli bir başvuru yönetim sistemi MVP’sidir.

Sistem cevap mailini otomatik göndermez. AI yalnızca insan onayına hazır cevap maili taslağı oluşturur. Gönderim demo sırasında sadece simüle edilir.

## Hackathon First Round Priority

1. turda jüri problem konusu ile fikrin uyumluluğunu 1-100 arasında puanlayacak.

Bu yüzden her geliştirme problem-fikir uyumunu güçlendirmeli.

Ana problem:
Kurumlara gelen başvuru mailleri ve ekli belgeler manuel kontrol ediliyor. Bu süreç yavaş, tekrar eden ve hataya açık bir iş yükü oluşturuyor.

Manuel süreç:
1. Mail açılır.
2. Ek indirilir.
3. Belge türü anlaşılır.
4. Eksik alanlar kontrol edilir.
5. Eksikler not edilir.
6. Başvuru sınıflandırılır.
7. Cevap maili yazılır.
8. Gönderilir.

Bizim çözüm:
1. Sistem gelen maili ve eki analiz eder.
2. Belge türünü tahmin eder.
3. Checklist’e göre eksik alanları çıkarır.
4. Başvuruyu doğru kuyruğa atar.
5. Cevap mailini taslak olarak oluşturur.
6. İnsan sadece kontrol edip onaylar.

Ölçülebilir fayda:
Manuel süreç yaklaşık 6 dakika.
QueueLess AI Inbox ile süreç yaklaşık 2 dakika.
Tahmini zaman kazancı: %66.

## Team Roles

### Kişi A — Team Lead / AI Architect / Documentation Owner

Responsibilities:
- Problem-fikir uyumu
- Mimari plan
- GitHub workflow düzeni
- README.md
- PROBLEM_FIT.md
- ARCHITECTURE.md
- ROADMAP.md
- TASK_BOARD.md
- AI_USAGE_LOG.md
- REVIEW_LOG.md
- PROMPT_HISTORY.md
- DEMO_SCRIPT.md
- FINAL_AI_AUDIT.md
- SECURITY_NOTES.md

### Kişi B — Frontend / UX / Dashboard Owner

Responsibilities:
- Dashboard
- Başvuru listesi
- Başvuru detay ekranı
- Kuyruk sekmeleri
- AI analiz sonucu alanı
- Checklist görünümü
- Mail taslağı ekranı
- İnsan onaylı gönderim simülasyonu
- Demo için temiz ve anlaşılır UI

### Kişi C — AI Workflow / Logic / QA Owner

Responsibilities:
- TypeScript veri modeli
- Mock Inbox verisi
- Deterministic mock AI analyzer
- Checklist analizi
- Eksik alan tespiti
- Risk flag mantığı
- Queue engine
- Test senaryoları
- Güvenlik ve kalite kontrol

## Required Repository Files

The repository must include:

- README.md
- PROBLEM_FIT.md
- ARCHITECTURE.md
- ROADMAP.md
- TASK_BOARD.md
- AI_USAGE_LOG.md
- REVIEW_LOG.md
- PROMPT_HISTORY.md
- TEST_PLAN.md
- SECURITY_NOTES.md
- FINAL_AI_AUDIT.md
- DEMO_SCRIPT.md

## Technical Stack

Use:

- Next.js
- TypeScript
- Tailwind CSS
- Mock local data
- Deterministic mock AI analyzer

Do not require real mail integration for MVP.

Do not require real AI API for MVP.

Architecture should allow future real AI API integration.

## Product Queues

The system must support:

- Gelen Başvurular
- Eksik Evrak
- İncelemeye Alındı
- Onay Bekleyen Yanıtlar
- Riskli / Manuel Kontrol
- Tamamlananlar

## MVP Rules

The MVP must demonstrate:

- Mock Inbox
- Incoming application list
- AI-like document classification
- Checklist-based missing field detection
- Queue recommendation
- Risk detection
- Human-approved email draft
- Simulated send action
- Dashboard metrics
- %66 time saving claim

## Security and Ethics Rules

Always follow:

- Do not use real personal data.
- Do not send real emails.
- Do not expose API keys.
- Do not hardcode secrets.
- Do not perform automatic outbound communication.
- Human approval is required before any response is sent or simulated.
- Low confidence or risky documents must go to Riskli / Manuel Kontrol.
- Use fake demo data only.
- Generated email drafts must always be editable by a human.

## GitHub Workflow Rules

Always suggest GitHub commands for each task.

Rules:
- Do not commit directly to main.
- Start every task from updated main.
- Create a separate branch for each task.
- Use clear branch names.
- Use conventional commit messages.
- Create a Pull Request description for every feature.
- Add REVIEW_LOG.md entry for each PR.
- Add AI_USAGE_LOG.md entry for each AI-assisted task.
- Update TASK_BOARD.md after every meaningful task.
- Every PR must have at least one reviewer.

Branch examples:
- docs/a-agents-instructions
- docs/a-problem-fit-and-documentation
- feature/b-dashboard-and-demo-ui
- feature/c-ai-analyzer-and-mock-data
- feature/b-application-detail
- feature/c-queue-engine
- feature/b-human-approved-email
- test/c-final-validation
- chore/a-final-submission

Commit examples:
- docs: add Codex project instructions
- docs: add problem fit and hackathon documentation
- feat: build dashboard and demo UI
- feat: implement mock AI analyzer and application data
- feat: add human approved email flow
- test: add MVP validation scenarios
- docs: complete final AI audit and demo script

## Required Response Format

For every future task, respond with:

1. Bu adımın amacı
2. Problem-fikir uyumuna katkısı
3. Hakem kriterlerine katkısı
4. Görev sahibi
5. Reviewer
6. Branch adı
7. Değişecek dosyalar
8. Yapılacak işler
9. Terminal / GitHub komutları
10. Test komutları
11. Commit mesajı
12. Pull Request başlığı
13. Pull Request açıklaması
14. REVIEW_LOG.md kaydı
15. AI_USAGE_LOG.md kaydı
16. TASK_BOARD.md güncellemesi
17. Sonraki adım

## Testing Rules

Before commit, suggest:

npm run lint
npm run build

If tests exist, also suggest:

npm run test

## Review Rules

Every PR must have a reviewer.

Review matrix:

- Kişi A work is reviewed by Kişi C, optionally Kişi B.
- Kişi B work is reviewed by Kişi A and optionally Kişi C.
- Kişi C work is reviewed by Kişi B and optionally Kişi A.

## Documentation Rules

Documentation must make the AI-assisted process visible.

README.md must explain:
- Project summary
- Problem
- Solution
- MVP scope
- Setup
- Run instructions
- Demo flow
- GitHub workflow
- AI-assisted development process

PROBLEM_FIT.md must explain:
- Why the idea fits the problem
- Why AI is needed
- Why human approval is required
- How the MVP demonstrates the solution
- Time saving estimate

AI_USAGE_LOG.md must explain:
- Which work was assisted by AI
- Which prompts were used
- Which files were affected
- What humans reviewed
- Risks and limitations

REVIEW_LOG.md must explain:
- Who implemented the change
- Who reviewed it
- What was checked
- Whether it was approved

## Final Submission Criteria

Before final submission, verify:

- MVP runs locally.
- Dashboard is demo-ready.
- Mock applications are visible.
- AI analyzer works.
- Queue statuses are correct.
- Mail send is only simulated.
- README explains setup and demo flow.
- PROBLEM_FIT.md explains why the idea fits the problem.
- ARCHITECTURE.md exists.
- ROADMAP.md exists.
- AI_USAGE_LOG.md is filled.
- REVIEW_LOG.md is filled.
- TEST_PLAN.md is filled.
- FINAL_AI_AUDIT.md is filled.
- Git history shows branch, commit, PR and review discipline.
