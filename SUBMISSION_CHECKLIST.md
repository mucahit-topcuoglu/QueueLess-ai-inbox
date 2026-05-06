# SUBMISSION_CHECKLIST.md

## Final Technical Checklist

- [x] npm run lint çalıştı.
- [x] npm run build çalıştı.
- [x] npm run test çalıştı veya test script yoksa manuel testler tamamlandı.
- [x] npm run dev ile uygulama açıldı.
- [x] Dashboard görüldü.
- [x] Mock başvurular görüldü.
- [x] Eksik evrak senaryosu demo edildi.
- [x] Riskli başvuru senaryosu demo edildi.
- [x] Mail gönderimi sadece simüle edildi.
- [x] README tamamlandı.
- [x] PROBLEM_FIT tamamlandı.
- [x] FINAL_AI_AUDIT tamamlandı.
- [x] DEMO_SCRIPT tamamlandı.
- [x] GitHub branch / commit / PR süreci kontrol edildi.
- [x] Takım rolleri net.
- [x] Jüri anlatımı prova edildi.

## Demo Smoke Checklist

- [x] Uygulama açılıyor.
- [x] Dashboard görünüyor.
- [x] Mock başvurular listeleniyor.
- [x] Başvuru seçilebiliyor.
- [x] AI sınıflandırması görünüyor.
- [x] Checklist sonucu görünüyor.
- [x] Eksik alanlar görünüyor.
- [x] Mail taslağı görünüyor.
- [x] Mail onayı sadece simülasyon.
- [x] Riskli başvuruda manuel kontrol uyarısı var.
- [x] Ortalama zaman kazancı %66 görünüyor.

## GitHub Evidence Checklist

- [x] Branch yapısı gösterilebilir.
- [x] Commit mesajları conventional formatta.
- [x] PR süreci merge commit geçmişinde görünüyor.
- [x] REVIEW_LOG.md içinde owner/reviewer kayıtları var.
- [x] AI_USAGE_LOG.md içinde AI destekli işler var.
- [x] TASK_BOARD.md içinde görev takibi var.

## Team Demo Responsibilities

### Kişi A

- 15 saniyelik açılış
- Problem-fikir uyumu anlatımı
- Hakem sorularını karşılama
- GitHub ve dokümantasyon kanıtlarını gösterme

### Kişi B

- Dashboard ekranını kullanma
- Başvuru detayını gösterme
- Mail taslağı ve onay simülasyonunu gösterme
- UI demo akışını yönetme

### Kişi C

- AI analyzer mantığını açıklama
- Checklist ve queue kararlarını açıklama
- Test, güvenlik ve human-in-the-loop kararlarını açıklama

## 15 Saniyelik Pitch

QueueLess AI Inbox, kurumlara mail ile gelen başvuru belgelerini analiz eden, eksik evrakı checklist ile bulan, başvuruyu doğru kuyruğa ayıran ve insan onayına hazır cevap maili taslağı oluşturan AI destekli bir başvuru kuyruğu MVP'sidir.

## 60 Saniyelik Problem-Fikir Uyumu Konuşması

Kurumlarda başvuru mailleri ve ekli belgeler bugün çoğunlukla manuel kontrol ediliyor. Görevli kişi maili açıyor, eki indiriyor, belge türünü anlamaya çalışıyor, eksik alanları kontrol ediyor, başvuruyu sınıflandırıyor ve cevap maili yazıyor. Bu süreç yaklaşık 6 dakika sürüyor.

QueueLess AI Inbox bu akışı AI destekli başvuru kuyruğuna dönüştürüyor. Sistem gelen maili ve eki analiz ediyor, belge türünü tahmin ediyor, checklist ile eksikleri çıkarıyor, başvuruyu doğru kuyruğa atıyor ve insan onayına hazır mail taslağı oluşturuyor. Mail otomatik gönderilmiyor; insan onayı zorunlu.

Hedefimiz bu süreci yaklaşık 2 dakikaya indirmek. Bu da yaklaşık %66 zaman kazancı demek. Proje problemle birebir uyumlu çünkü manuel başvuru evrakı kontrol sürecindeki her adımı doğrudan karşılıyor.

## 2 Dakikalık Demo Konuşması

"Dashboard ile başlıyoruz. Burada bugün gelen başvuruları, Eksik Evrak, İncelemeye Alındı, Riskli / Manuel Kontrol ve Onay Bekleyen Yanıtlar kartlarını görüyoruz. Ortalama zaman kazancı %66 olarak gösteriliyor.

Şimdi eksik staj evrakı başvurusunu seçiyorum. Sistem belge türünü tahmin ediyor, güven skorunu gösteriyor ve checklist sonucunu çıkarıyor. Burada eksik alanları net görüyoruz. Bu nedenle sistem başvuruyu Eksik Evrak kuyruğuna öneriyor.

Alt bölümde AI tarafından oluşturulan cevap maili taslağı var. Bu mail otomatik gönderilmiyor. İnsan görevli taslağı düzenliyor ve onay verirse sistem yalnızca demo simülasyonu yapıyor.

Şimdi riskli başvuru örneğine geçiyoruz. Burada sistem otomatik aksiyon almıyor ve manuel kontrol gerektiğini söylüyor. Bu da güvenli kullanım kararımızı gösteriyor: AI süreci hızlandırıyor, ama son karar insanda kalıyor."

## Jüri Soru-Cevap Hazırlığı

- Neden bu problem önemli? Kurumlarda başvuru evrakı kontrolü tekrar eden, zaman alan ve hataya açık bir iş yükü oluşturuyor.
- AI burada neden gerekli? Belge türü tahmini, eksik alan çıkarımı, risk tespiti, kuyruk önerisi ve cevap taslağı üretimi için doğrudan değer sağlıyor.
- Neden gerçek mail entegrasyonu yapmadınız? MVP'de güvenlik ve demo kontrolü öncelikli; gerçek gönderim yerine insan onaylı simülasyon gösteriyoruz.
- Mock analyzer yeterli mi? 1. tur için problem-fikir uyumunu ve akışı tekrarlanabilir şekilde göstermek için yeterli; mimari gerçek AI API'ye genişleyebilir.
- Gerçek hayatta nasıl genişler? Mail provider entegrasyonu, gerçek AI adapter, PII masking, RBAC ve audit trail eklenir.
- Veri güvenliği nasıl sağlanır? Gerçek kişisel veri, API key ve gerçek mail gönderimi kullanılmaz; riskli başvurular manuel kontrole gider.
- İnsan onayı neden var? Kurumsal yanıtlar hassas olabilir; AI sadece taslak üretir, son karar insandadır.
- %66 zaman kazancı nasıl hesaplandı? Manuel süreç yaklaşık 6 dakika, AI destekli kontrol ve onay akışı yaklaşık 2 dakika olarak modellenmiştir.
- Bu proje hackathon problemine neden uyuyor? Manuel başvuru maili ve evrak kontrol sürecindeki her adımı doğrudan hedefliyor.
- 3 kişi nasıl çalıştınız? Kişi A dokümantasyon ve problem-fit, Kişi B frontend/demo UI, Kişi C analyzer/logic/test sorumluluğunu aldı.
- GitHub'ı nasıl kullandınız? Her ana iş için branch, commit, PR açıklaması, review kaydı, AI usage log ve task board güncellemesi tutuldu.
