# TEST_PLAN.md

## Test Strategy

QueueLess AI Inbox MVP icin test stratejisi uc katmanlidir:

- Deterministic logic tests: analyzer, checklist, queue engine ve human approval guard saf TypeScript fonksiyonlariyla dogrulanir.
- Build and quality checks: Next.js build, required file check ve outbound mail pattern taramasi calistirilir.
- Manual demo checks: dashboard, basvuru secimi, mail taslagi ve riskli basvuru uyarisi demo sirasinda kontrol edilir.

Testlerde gercek mail servisi, gercek AI API, gercek kisisel veri veya API key kullanilmaz.

## Analyzer Tests

- [x] Eksik staj evraki "Eksik Evrak" kuyruguna dusmeli.
- [x] Eksiksiz staj evraki "Incelemeye Alindi" kuyruguna dusmeli.
- [x] Dusuk guven skorlu belge "Riskli / Manuel Kontrol" kuyruguna dusmeli.
- [x] Imza dogrulanamayan belge "Riskli / Manuel Kontrol" kuyruguna dusmeli.
- [x] Bilinmeyen belge turu manuel kontrol gerektiren duruma dusmeli.
- [x] Eksik evrak mail taslagi eksik alanlari listelemeli.
- [x] Eksiksiz evrak mail taslagi incelemeye alindi bilgisini icermeli.
- [x] Analyzer gercek mail gonderimi yapmamali.

## Queue Tests

- [x] Queue sayilari mock data uzerinden dogru hesaplanmali.
- [x] Status filtreleri dogru calismali.
- [x] Tamamlananlar ayri sayilmali.
- [x] Riskli belgeler riskli kuyrugunda gorunmeli.
- [x] Onay bekleyen yanitlar dogru sayilmali.

## UI Manual Tests

- [x] Dashboard ilk ekranda problem, cozum ve demo guvenlik kuralini gosteriyor.
- [x] Mock basvuru listesi ilk ekranda gorunuyor.
- [x] Basvuru secilince detay paneli, checklist ve AI analiz alani guncelleniyor.
- [x] Empty state component mevcut.
- [x] Loading state component mevcut.
- [x] Error state component mevcut.
- [x] Riskli basvuruda manuel kontrol uyarisi gosteriliyor.

## Human Approval Tests

- [x] Mail taslagi duzenlenebilir.
- [x] Onay butonu gercek mail gondermez.
- [x] Onay sonrasi "Mail gonderildi olarak simule edildi" mesaji uretilir.
- [x] Onay sonrasi basvuru "Tamamlananlar" durumuna gecer.
- [x] Riskli basvuruda gonderim simulasyonu engellenir.

## Security Tests

- [x] Kod icinde `sendEmail`, `nodemailer`, `smtp`, `mailgun`, `sendgrid` patternleri uretim kodunda bulunmuyor.
- [x] Gercek AI API cagrisi bulunmuyor.
- [x] API key veya secret eklenmedi.
- [x] Mock data yalnizca demo isimleri ve `example.com` mail adresleri kullaniyor.
- [x] Riskli ve dusuk guvenli basvurular manuel kontrole yonleniyor.
- [x] `npm audit --audit-level=moderate` sifir vulnerability ile tamamlandi.

## Build and Lint Checks

- [x] `npm install` ile Next.js bagimliliklari kuruldu ve `package-lock.json` olustu.
- [x] `npm run lint` basarili.
- [x] `npm run build` basarili.
- [x] `npm run test` basarili.
- [x] `npm run check:logic` basarili.
- [x] `npm run dev` kisa sureli baslatildi ve `http://127.0.0.1:3000` HTTP 200 dondu.

## Known Limitations

- Gercek mail inbox entegrasyonu yoktur; MVP mock inbox ile calisir.
- Gercek AI API entegrasyonu yoktur; analyzer deterministic mock karar kurallari kullanir.
- UI manual QA tarayici otomasyonuyla degil, build ve component varligi dogrulamasiyla desteklenmistir.
- Riskli basvurular demo icin manuel kontrol kuyruğuna alinir; gercek belge dogrulama entegrasyonu gelecek surum isidir.

## Final QA Checklist

- [x] MVP locally build aliyor.
- [x] Dashboard route static olarak uretiliyor.
- [x] Dev server ilk sayfayi HTTP 200 ile aciyor.
- [x] Mock applications analyzer ile zenginlestiriliyor.
- [x] Queue statuses dogru hesaplanıyor.
- [x] Mail send sadece simule ediliyor.
- [x] Human approval guard test edildi.
- [x] Riskli basvuruda simulasyon engellendi.
- [x] TEST_PLAN.md guncellendi.
- [x] SECURITY_NOTES.md guncellendi.
- [x] REVIEW_LOG.md guncellendi.
- [x] AI_USAGE_LOG.md guncellendi.
- [x] FINAL_AI_AUDIT.md dolduruldu.
