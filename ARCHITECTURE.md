# ARCHITECTURE.md

## System Overview

QueueLess AI Inbox, mock gelen başvuruları AI benzeri deterministic analizden geçirip checklist sonuçları, risk sinyalleri, kuyruk önerisi ve cevap maili taslağı üreten bir MVP mimarisine sahiptir.

MVP gerçek mail sistemi veya gerçek AI API kullanmaz. Bunun yerine local mock data ve deterministic mock analyzer kullanılır. Böylece demo tekrarlanabilir, güvenli ve hızlı olur.

## Components

- Mock Inbox: Gelen başvuru maillerini ve ek dosya metadata bilgisini temsil eder.
- AI Analyzer: Belge türü, özet, eksik alan ve risk sinyali üretir.
- Checklist Engine: Belge türüne göre zorunlu alanları kontrol eder.
- Queue Engine: Analiz sonucuna göre başvuruyu doğru kuyruğa önerir.
- Human Approval Layer: Cevap maili taslağını insan onayına sunar.
- Dashboard UI: Kuyruklar, metrikler, başvuru listesi ve detay akışını gösterir.
- Audit Docs: AI kullanımı, review süreci, test planı ve final audit kayıtlarını görünür kılar.

## Mock Inbox

Mock Inbox, gerçek mail entegrasyonu yerine demo verisi kullanır. Her başvuru şu bilgileri taşıyacak şekilde planlanır:

- Başvuru ID
- Gönderen demo adı
- Konu
- Mail gövdesi
- Ek dosya adı
- Ek belge türü ipucu
- Başvuru tarihi
- Mevcut kuyruk

## AI Analyzer

AI Analyzer MVP'de deterministic çalışır. Aynı input her zaman aynı sonucu üretir. Bu sayede demo sırasında beklenmeyen API davranışı veya maliyet oluşmaz.

Planlanan analiz çıktıları:

- Belge türü tahmini
- Güven skoru
- Kısa mail özeti
- Eksik alanlar
- Risk flag
- Kuyruk önerisi
- Cevap maili taslağı

## Checklist Engine

Checklist Engine, belge türüne göre zorunlu alanları kontrol eder. Örneğin bir staj başvurusu için ad soyad, iletişim bilgisi, okul, bölüm, tarih ve ek belge alanları beklenebilir.

Eksik alanlar başvuru detay ekranında açıkça gösterilir ve Eksik Evrak kuyruğuna yönlendirme için temel oluşturur.

## Queue Engine

Queue Engine, analiz sonucunu ürün kuyruklarına çevirir:

- Gelen Başvurular
- Eksik Evrak
- İncelemeye Alındı
- Onay Bekleyen Yanıtlar
- Riskli / Manuel Kontrol
- Tamamlananlar

Örnek kurallar:

- Eksik zorunlu alan varsa Eksik Evrak
- Risk flag varsa Riskli / Manuel Kontrol
- Cevap taslağı hazırsa Onay Bekleyen Yanıtlar
- İnsan onayı sonrası Tamamlananlar

## Human Approval Layer

AI cevap maili göndermez. Sadece görevlinin düzenleyebileceği bir taslak oluşturur. Görevli taslağı kontrol eder ve demo sırasında gönderimi simüle eder.

Bu katman güvenlik, sorumluluk ve kurumsal kontrol için zorunludur.

## Audit and Logging

Proje süreci aşağıdaki dosyalarla izlenebilir hale getirilir:

- `AI_USAGE_LOG.md`: AI destekli işlerin kaydı
- `REVIEW_LOG.md`: PR ve review kayıtları
- `PROMPT_HISTORY.md`: önemli prompt özetleri
- `FINAL_AI_AUDIT.md`: final öncesi AI ve güvenlik kontrol listesi
- `TEST_PLAN.md`: doğrulama senaryoları

## Security Design

- Gerçek kişisel veri kullanılmaz.
- Gerçek mail gönderilmez.
- API key veya secret tutulmaz.
- Dış sistemlere otomatik iletişim yapılmaz.
- Riskli ve düşük güvenli belgeler manuel kontrole yönlendirilir.
- Mail taslakları insan tarafından düzenlenebilir olmalıdır.

## Future Real AI API Integration

MVP deterministic mock analyzer ile çalışır; fakat analiz katmanı ileride gerçek AI API'ye bağlanabilecek şekilde ayrı düşünülür.

Gelecek entegrasyonda beklenen yaklaşım:

- Analyzer interface korunur.
- Mock analyzer yerine gerçek provider adapter eklenir.
- Prompt, model çıktısı ve güven skoru loglanır.
- PII maskeleme ve kurum güvenlik politikaları uygulanır.
- İnsan onayı kuralı değişmeden kalır.
