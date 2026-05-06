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
