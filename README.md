# QueueLess AI Inbox

## Project Summary

QueueLess AI Inbox, kuruma mail yoluyla gelen başvuru belgelerini ve ek dosyaları analiz eden, belge türünü otomatik algılayan, eksik alanları checklist'e göre tespit eden ve başvuruları doğru kuyruğa ayıran AI destekli bir başvuru yönetim sistemi MVP'sidir.

Sistem gerçek mail göndermez. AI yalnızca insan onayına hazır cevap maili taslağı oluşturur. Demo sırasında gönderim sadece simüle edilir.

## Problem

Kurumlara gelen başvuru mailleri ve ekli belgeler çoğu zaman manuel kontrol edilir. Görevli kişi maili açar, eki indirir, belge türünü anlamaya çalışır, eksik alanları kontrol eder, başvuruyu sınıflandırır ve cevap mailini yazar. Bu süreç tekrar eden, yavaş ve hataya açık bir operasyon yükü oluşturur.

## Solution

QueueLess AI Inbox bu manuel akışı tek ekranda yönetilebilir hale getirir:

1. Gelen mail ve ek dosya analiz edilir.
2. Belge türü tahmin edilir.
3. Checklist'e göre eksik alanlar çıkarılır.
4. Başvuru doğru kuyruğa yönlendirilir.
5. Cevap maili taslak olarak hazırlanır.
6. İnsan görevli taslağı kontrol edip simüle gönderimi onaylar.

## MVP Scope

- Mock Inbox
- Mock gelen başvurular
- Deterministic mock AI analyzer
- Checklist tabanlı eksik evrak analizi
- Queue sistemi
- İnsan onaylı mail taslağı
- Simüle edilmiş mail gönderimi
- Dashboard metrikleri
- Süreç şeffaflığı ve audit dosyaları

## Key Features

- Başvuruları kuyruklara ayıran operasyon ekranı
- AI benzeri belge sınıflandırma sonucu
- Eksik evrak ve eksik alan checklist'i
- Riskli başvuruları manuel kontrole yönlendirme
- İnsan onaylı cevap maili taslağı
- Gerçek gönderim yerine demo simülasyonu
- Yaklaşık %66 zaman kazancı iddiasını görünür kılan metrikler

## Demo Flow

1. Dashboard açılır.
2. Gelen Başvurular kuyruğundaki örnek başvuru seçilir.
3. AI analiz sonucu incelenir.
4. Checklist üzerinden eksik alanlar görülür.
5. Sistem önerilen kuyruğu gösterir.
6. Cevap maili taslağı insan tarafından kontrol edilir.
7. Gönderim demo olarak simüle edilir.
8. Başvuru tamamlanan veya ilgili kuyruğa taşınır.

## Dashboard Demo

Dashboard demo arayüzü Kişi C'nin `analyzedMockApplications` çıktısıyla çalışır ve gerçek mail ya da gerçek AI API entegrasyonu gerektirmez.

- Metrik kartları: Bugün Gelen, Eksik Evrak, İncelemeye Alındı, Onay Bekleyen Yanıtlar, Riskli / Manuel Kontrol ve Ortalama Zaman Kazancı %66.
- Başvuru listesi: gönderen, mail, konu, ek dosya, belge türü, AI güven skoru, kuyruk, öncelik ve kısa AI özeti gösterir.
- Detay paneli: mail içeriği, AI sınıflandırması, checklist sonucu, eksik alanlar, risk uyarıları, AI karar açıklaması ve mail taslağı gösterir.
- Mail akışı: `Maili Onayla ve Gönder` butonu gerçek mail göndermez; yalnızca "Mail gönderildi olarak simüle edildi." mesajını gösterir ve UI içinde başvuruyu Tamamlananlar kuyruğuna taşır.

## Human Approval Flow

- AI maili otomatik göndermez.
- Taslak insan tarafından düzenlenebilir.
- Onay sonrası gönderim sadece demo olarak simüle edilir.
- Riskli başvurularda gönderim simülasyonu engellenir.
- AI'ın önerdiği kuyruk detay panelinde korunur; UI'daki mevcut durum insan onayı akışına göre `Onay Bekleyen Yanıtlar` veya `Tamamlananlar` olarak güncellenebilir.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Mock local data
- Deterministic mock AI analyzer

## Setup

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

## GitHub Workflow

- Main branch'e doğrudan commit atılmaz.
- Her iş güncel main üzerinden ayrı branch ile başlar.
- Her iş için anlaşılır branch adı kullanılır.
- Commit mesajları conventional commit formatında yazılır.
- Her iş için Pull Request açılır.
- Her PR için reviewer atanır.
- AI destekli işler `AI_USAGE_LOG.md` içine kaydedilir.
- Review süreci `REVIEW_LOG.md` içine kaydedilir.
- Görev durumu `TASK_BOARD.md` içinde güncellenir.

## GitHub Workflow Evidence

- Her özellik için ayrı branch açıldı.
- Conventional commit mesajları kullanıldı.
- PR açıklamaları hazırlandı.
- REVIEW_LOG.md ile ekip içi review kaydı tutuldu.
- AI_USAGE_LOG.md ile AI destekli işlerin kaydı tutuldu.
- TASK_BOARD.md ile görevler takip edildi.

## Team Roles

- Kişi A: Team Lead, AI Architect, Documentation Owner, Problem-Fit Owner
- Kişi B: Frontend, UX, Dashboard Owner
- Kişi C: AI Workflow, Logic, QA Owner

## AI-Assisted Development

Bu proje AI destekli geliştirilecektir; ancak AI'ın yaptığı her katkı görünür ve denetlenebilir olmalıdır. Prompt özeti `PROMPT_HISTORY.md`, AI katkısı `AI_USAGE_LOG.md`, insan review sonucu `REVIEW_LOG.md` içinde tutulur.

## Security and Human Approval

- Gerçek kişisel veri kullanılmaz.
- Gerçek mail gönderilmez.
- API key veya gizli bilgi tutulmaz.
- AI otomatik dış iletişim yapmaz.
- Cevap maili her zaman insan tarafından düzenlenebilir ve onaylanabilir olmalıdır.
- Riskli veya düşük güvenli başvurular manuel kontrole gider.

## Hackathon Evaluation Fit

1. tur jüri odağı problem konusu ile fikrin uyumudur. QueueLess AI Inbox doğrudan manuel başvuru evrakı kontrol sürecini hedefler. MVP; mail analizi, belge türü tahmini, eksik evrak tespiti, kuyruk yönlendirmesi ve insan onaylı cevap taslağı ile problemi uçtan uca gösterir.

Manuel süreç yaklaşık 6 dakika sürerken, QueueLess AI Inbox ile hedef süreç yaklaşık 2 dakikadır. Tahmini zaman kazancı %66'dır.

Hakem için en net mesaj: Bu proje genel bir AI denemesi değil, manuel başvuru maili ve evrak kontrol sürecindeki her adımı karşılayan güvenli, ölçülebilir ve demo edilebilir bir MVP'dir.
