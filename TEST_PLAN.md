# TEST_PLAN.md

## Test Plan Draft

Bu dosya QueueLess AI Inbox MVP tamamlandıkça doğrulama senaryolarını takip etmek için kullanılacaktır.

## Planned Test Areas

### Mock Inbox

- [ ] Mock inbox görünür mü?
- [ ] Mock başvurular listeleniyor mu?
- [ ] Başvuru detayına gidilebiliyor mu?

### AI Analyzer

- [ ] AI analyzer doğru kuyruk öneriyor mu?
- [ ] Belge türü tahmini gösteriliyor mu?
- [ ] Güven skoru veya analiz sonucu görünür mü?

### Checklist and Missing Documents

- [ ] Eksik evrak doğru tespit ediliyor mu?
- [ ] Tamamlanan alanlar ve eksik alanlar ayrışıyor mu?
- [ ] Eksik evrak başvuruları doğru kuyruğa gidiyor mu?

### Risk Handling

- [ ] Riskli belge manuel kontrole gidiyor mu?
- [ ] Düşük güvenli analizler Riskli / Manuel Kontrol kuyruğuna alınıyor mu?

### Human-Approved Email Flow

- [ ] Mail taslağı oluşturuluyor mu?
- [ ] Mail taslağı düzenlenebilir mi?
- [ ] Mail sadece simüle ediliyor mu?
- [ ] İnsan onayı olmadan gönderim simülasyonu tamamlanmıyor mu?

### Build and Quality

- [ ] Build başarılı mı?
- [ ] Lint başarılı mı?
- [ ] Testler varsa başarılı mı?

## Suggested Commands

```bash
npm run lint
npm run build
npm run test
```

## UI Demo Test Scenarios

- [x] Dashboard kartları görünüyor mu?
- [x] Başvuru listesi görünüyor mu?
- [x] Kuyruk filtreleri çalışıyor mu?
- [x] Başvuru detay paneli açılıyor mu?
- [x] Checklist görünümü doğru mu?
- [x] Mail taslağı görünüyor mu?
- [x] Mail gönderimi sadece simüle ediliyor mu?
- [x] Empty state çalışıyor mu?

## UI Verification Plan

- Dashboard açıldığında jüri problemi ve çözümü ilk ekranda okuyabilmeli.
- `Tümü`, `Eksik Evrak`, `İncelemeye Alındı` ve `Riskli / Manuel Kontrol` filtreleri mock data üzerinden listeyi değiştirmeli.
- Risk flag bulunan başvuruda manuel kontrol uyarısı görünmeli.
- `Taslağı Düzenle` butonu taslağı textarea olarak düzenlenebilir yapmalı.
- `Maili Onayla ve Gönder` gerçek outbound işlem başlatmamalı; yalnızca simülasyon mesajı göstermeli.
- Onay sonrası seçili başvuru UI içinde `Tamamlananlar` kuyruğuna taşınmalı.

## Queue and Human Approval Integration Tests

- [ ] Kuyruk filtreleri doğru çalışıyor mu?
- [ ] Dashboard kartları mock data'dan doğru hesaplanıyor mu?
- [ ] Başvuru seçilince detay paneli güncelleniyor mu?
- [ ] Mail taslağı düzenlenebiliyor mu?
- [ ] Onay sonrası başvuru Tamamlananlar durumuna geçiyor mu?
- [ ] Riskli başvuruda gönderim simülasyonu engelleniyor mu?
- [ ] Gerçek mail gönderimi yapılmadığı doğrulanıyor mu?

## Test Scenarios: Mock AI Analyzer and Queue Engine

- [x] Eksik staj evraki Eksik Evrak kuyruguna dusmeli.
- [x] Eksiksiz staj evraki Incelemeye Alindi kuyruguna dusmeli.
- [x] Dusuk guven skorlu belge Riskli / Manuel Kontrol kuyruguna dusmeli.
- [x] Imza dogrulanamayan belge Riskli / Manuel Kontrol kuyruguna dusmeli.
- [x] Eksik evrak icin mail taslagi eksikleri listelemeli.
- [x] Eksiksiz evrak icin mail taslagi incelemeye alindi metni uretmeli.
- [x] Analyzer hicbir sekilde gercek mail gondermemeli.

## Edge Case Coverage

- [x] Eksik attachment risk flag uretir.
- [x] Cok dusuk confidence score manuel kontrole gider.
- [x] Bilinmeyen belge turu manuel kontrole gider.
- [x] Imza dogrulanamiyor ifadesi manuel kontrol risk flag uretir.
- [x] Checklist tamamen bossa manuel kontrol risk flag uretir.
- [x] Sender email formati hataliysa risk flag uretir.
- [x] Ayni basvuru tekrar gelmis olabilir durumu risk flag olarak temsil edilir.

## Verification Result

- Date: 2026-05-06
- Branch: feature/c-ai-analyzer-and-mock-data
- Owner: Kisi C
- Commands:
  - npm run lint
  - npm run build
  - npm run test
- Result: Passed
