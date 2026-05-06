# DEMO_SCRIPT.md

## 15 Saniyelik Kısa Tanıtım

QueueLess AI Inbox, kurumlara mail ile gelen başvuru belgelerini analiz eden, eksik evrakı checklist ile bulan, başvuruyu doğru kuyruğa ayıran ve insan onayına hazır cevap maili taslağı oluşturan AI destekli bir başvuru yönetimi MVP'sidir.

## 60 Saniyelik Problem-Fikir Anlatımı

QueueLess AI Inbox, kurumlara mail yoluyla gelen başvuruların manuel evrak kontrolü problemini hedefleyen AI destekli bir başvuru kuyruğu MVP'sidir. Bugün görevli kişi başvuru mailini açıyor, eki indiriyor, belge türünü anlamaya çalışıyor, eksik alanları kontrol ediyor, başvuruyu sınıflandırıyor ve cevap mailini elle yazıyor. Bu süreç yaklaşık 6 dakika sürüyor ve her başvuruda tekrar ediyor.

Biz bu akışı tek ekrana topluyoruz. Sistem gelen maili ve eki analiz ediyor, belge türünü tahmin ediyor, checklist'e göre eksik alanları çıkarıyor, başvuruyu doğru kuyruğa öneriyor ve insan onayına hazır cevap maili taslağı oluşturuyor. AI gerçek mail göndermiyor; insan son kontrolü yapıyor ve demo sırasında gönderim yalnızca simüle ediliyor.

Bu MVP ile 6 dakikalık manuel süreci yaklaşık 2 dakikaya indirmeyi hedefliyoruz. Yani yaklaşık %66 zaman kazancı gösteriyoruz. Fikir problemle birebir uyumlu çünkü manuel başvuru evrakı kontrol sürecindeki her adımı daha hızlı, izlenebilir ve güvenli hale getiriyor.

## 2 Dakikalık Demo Akışı

1. Dashboard açılır.
2. Bugün gelen başvuru sayısı gösterilir.
3. Eksik Evrak, İncelemeye Alındı, Riskli ve Onay Bekleyen Yanıtlar kartları gösterilir.
4. Eksik staj evrakı başvurusu seçilir.
5. AI sınıflandırması ve güven skoru gösterilir.
6. Checklist sonucu gösterilir.
7. Eksik alanlar gösterilir.
8. AI mail taslağı gösterilir.
9. Mailin otomatik gönderilmediği, insan onayı gerektiği vurgulanır.
10. Onay butonuyla sadece simülasyon yapılır.
11. Riskli başvuru açılır.
12. Riskli başvuruda manuel kontrol gerektiği gösterilir.
13. AI Transparency / güvenlik mesajı gösterilir.
14. %66 zaman kazancı vurgulanır.

## 2 Dakikalık Teknik Demo Konuşması

"Şimdi dashboard ile başlıyoruz. Burada bugün gelen başvuruları, Eksik Evrak, İncelemeye Alındı, Riskli / Manuel Kontrol ve Onay Bekleyen Yanıtlar kuyruklarını tek bakışta görüyoruz. Ayrıca manuel süreçten hedeflediğimiz %66 zaman kazancı dashboard üzerinde özellikle görünür.

Şimdi eksik staj evrakı başvurusunu açıyorum. Sağ tarafta sistemin AI sınıflandırmasını, belge türü tahminini ve güven skorunu görüyoruz. Alt bölümde checklist sonucu var: tamamlanan alanlar ayrı, eksik alanlar ayrı gösteriliyor. Bu eksikler nedeniyle sistem başvuruyu Eksik Evrak kuyruğuna öneriyor.

Burada cevap maili taslağı otomatik hazırlanıyor ama önemli güvenlik noktası şu: mail gönderilmiyor. Taslak insan tarafından düzenlenebilir, görevli onay verirse demo içinde sadece simülasyon yapılıyor.

Son olarak riskli bir başvuru açıyoruz. Sistem bu başvuruda otomatik aksiyon almıyor, manuel kontrol gerektiğini söylüyor. Böylece AI hız kazandırıyor ama kritik kararlarda insan kontrolü korunuyor."

## Hakeme Gösterilecek Ekran Sırası

1. Dashboard
2. Gelen Başvurular listesi
3. Bir eksik staj evrakı başvurusu
4. AI sınıflandırması ve güven skoru
5. Checklist sonucu
6. Eksik alanlar
7. Mail taslağı
8. İnsan onaylı simüle gönderim
9. Riskli başvuru örneği
10. AI Transparency / güvenlik mesajı

## Demo Sırasında Vurgulanacak 5 Güçlü Nokta

1. "Burada sistem gelen başvuruları otomatik sınıflandırıyor."
2. "Bu ekranda AI checklist kontrolüyle eksik alanları çıkarıyor."
3. "Bu mail gönderilmiyor, sadece insan onayına hazır taslak olarak üretiliyor."
4. "Riskli belgelerde sistem otomatik aksiyon almayıp manuel kontrole yönlendiriyor."
5. "Manuel 6 dakikalık süreci yaklaşık 2 dakikaya indirerek %66 zaman kazancı hedefliyoruz."

## Demo Sırasında Kullanılacak Cümleler

- "Bu dashboard, başvuru operasyonunun hangi kuyruklarda biriktiğini tek bakışta gösteriyor."
- "Bu örnekte sistem staj evrakını tanıyor ve eksik alanları checklist üzerinden çıkarıyor."
- "Eksik evrak varsa başvuru otomatik olarak Eksik Evrak kuyruğuna öneriliyor."
- "Cevap maili hazır geliyor ama gönderilmiyor; görevli insan düzenleyip onaylıyor."
- "Riskli başvurularda sistem güvenli tarafta kalıyor ve manuel kontrol istiyor."
- "Demo gönderimi gerçek mail değil, sadece simülasyon durumudur."

## Final Demo Görev Dağılımı

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

## Jüri Soru-Cevap Kısa Hazırlık

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

## Kapanış Cümlesi

QueueLess AI Inbox'ın gücü, problemi soyut bir AI fikriyle değil, manuel başvuru evrakı kontrol sürecindeki her adımı karşılayan güvenli, ölçülebilir ve demo ile gösterilebilir bir MVP akışıyla çözmesidir.
