# TEST_PLAN.md

## Test Strategy

QueueLess AI Inbox MVP için test stratejisi üç katmanlıdır:

- Deterministic logic tests: analyzer, checklist, queue engine ve human approval guard saf TypeScript fonksiyonlarıyla doğrulanır.
- Build and quality checks: Next.js build, required file check ve outbound mail pattern taraması çalıştırılır.
- Manual demo checks: dashboard, başvuru seçimi, mail taslağı ve riskli başvuru uyarısı demo sırasında kontrol edilir.

Testlerde gerçek mail servisi, gerçek AI API, gerçek kişisel veri veya API key kullanılmaz.

## Required Final Checks

- [x] Mock inbox görünür mü?
- [x] Analyzer doğru kuyruk öneriyor mu?
- [x] Eksik evrak doğru tespit ediliyor mu?
- [x] Riskli belge manuel kontrole gidiyor mu?
- [x] Mail sadece simüle ediliyor mu?
- [x] Dashboard kartları doğru çalışıyor mu?
- [x] Build başarılı mı?

## Analyzer Tests

- [x] Eksik staj evrakı Eksik Evrak kuyruğuna düşmeli.
- [x] Eksiksiz staj evrakı İncelemeye Alındı kuyruğuna düşmeli.
- [x] Düşük güven skorlu belge Riskli / Manuel Kontrol kuyruğuna düşmeli.
- [x] İmza doğrulanamayan belge Riskli / Manuel Kontrol kuyruğuna düşmeli.
- [x] Bilinmeyen belge türü manuel kontrol gerektiren duruma düşmeli.
- [x] Eksik evrak mail taslağı eksik alanları listelemeli.
- [x] Eksiksiz evrak mail taslağı incelemeye alındı bilgisini içermeli.
- [x] Analyzer gerçek mail gönderimi yapmamalı.

## Queue Tests

- [x] Queue sayıları mock data üzerinden doğru hesaplanmalı.
- [x] Status filtreleri doğru çalışmalı.
- [x] Tamamlananlar ayrı sayılmalı.
- [x] Riskli belgeler riskli kuyruğunda görünmeli.
- [x] Onay bekleyen yanıtlar doğru sayılmalı.

## UI Manual Tests

- [x] Dashboard ilk ekranda problem, çözüm ve demo güvenlik kuralını gösteriyor.
- [x] Dashboard kartları başvuru sayılarını ve %66 zaman kazancını gösteriyor.
- [x] Mock başvuru listesi ilk ekranda görünüyor.
- [x] Başvuru seçilince detay paneli, checklist ve AI analiz alanı güncelleniyor.
- [x] Riskli başvuruda manuel kontrol uyarısı gösteriliyor.

## Landing and Multi-Flow UI Tests

- [ ] Anasayfa açılıyor mu?
- [ ] Başla butonu çalışıyor mu?
- [ ] Kullanım senaryosu seçimi çalışıyor mu?
- [ ] Recruitment ekranı açılıyor mu?
- [ ] Job posting link input'u çalışıyor mu?
- [ ] PDF upload alanı görünüyor mu?
- [ ] CV kategorileri gösteriliyor mu?
- [ ] Academic ekranı açılıyor mu?
- [ ] Belge türü seçimi çalışıyor mu?
- [ ] Belge analizi kartları görünüyor mu?
- [ ] Human approval mesajı görünür mü?
- [ ] Responsive görünüm kabul edilebilir mi?

## Branding and Design Consistency Tests

- [ ] QueueLess AI logosu navbar/header alanında görünüyor mu?
- [ ] Ana sayfa, başla sayfası ve dashboard aynı green-black ürün dilini paylaşıyor mu?
- [ ] Kart, buton, badge ve spacing yaklaşımı sayfalar arasında tutarlı mı?
- [ ] Dashboard markalama alanı ana sayfa ile görsel olarak uyumlu mu?

## Human Approval Tests

- [x] Mail taslağı düzenlenebilir.
- [x] Onay butonu gerçek mail göndermez.
- [x] Onay sonrası simüle gönderim mesajı üretilir.
- [x] Onay sonrası başvuru Tamamlananlar durumuna geçer.
- [x] Riskli başvuruda gönderim simülasyonu engellenir.

## Security Tests

- [x] Gerçek mail gönderimi yok.
- [x] Gerçek AI API çağrısı bulunmuyor.
- [x] API key veya secret eklenmedi.
- [x] Mock data yalnızca sahte demo verisi kullanıyor.
- [x] Riskli ve düşük güvenli başvurular manuel kontrole yönleniyor.

## Build and Lint Checks

- [x] `npm run lint` final kontrol komutu.
- [x] `npm run build` final kontrol komutu.
- [x] `npm run test` test altyapısı varsa final kontrol komutu.
- [ ] `npm audit` production öncesi ayrıca incelenmeli; local kurulum iki moderate severity vulnerability raporladı.

## Suggested Commands

```bash
npm run lint
npm run build
npm run test
```

## Known Limitations

- Gerçek mail inbox entegrasyonu yoktur; MVP mock inbox ile çalışır.
- Gerçek AI API entegrasyonu yoktur; analyzer deterministic mock karar kuralları kullanır.
- Gerçek belge OCR veya dosya parsing yoktur.
- Browser tabanlı kapsamlı E2E test final MVP kapsamı dışında bırakılmıştır.

## Gemini API Tests

- [ ] `GEMINI_API_KEY` yoksa `/api/health/gemini` kontrollü hata dönüyor mu?
- [ ] API key response içinde görünmüyor mu?
- [x] PDF olmayan dosya reddediliyor mu?
- [x] 10MB üstü PDF reddediliyor mu?
- [ ] Recruitment endpoint iş ilanı + CV PDF analizi döndürüyor mu?
- [ ] Document endpoint checklist, eksik alan ve risk sonucu döndürüyor mu?
- [x] Gemini JSON parse hatasında uygulama crash etmiyor mu?
- [x] Gemini hata verirse fallback analyzer çalışıyor mu?
- [x] PDF içerikleri console log ile yazdırılmıyor mu?
- [x] Gerçek mail gönderimi yapılmıyor mu?

## Gemini Known Limitation Update

- Gemini API entegrasyonu `.env.local` içindeki API key ile server-side çalışır; API unavailable olursa fallback analyzer kullanılır.
