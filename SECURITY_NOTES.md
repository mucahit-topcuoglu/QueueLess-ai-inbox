# SECURITY_NOTES.md

## Ollama AI Security Notes

- AI local/cloud Ollama endpoint uzerinden calisir.
- API key kullanilmaz.
- PDF icerikleri sadece analiz icin modele gonderilir.
- Gercek mail gonderimi yoktur.
- Insan onayi zorunludur.
- Riskli veya dusuk guvenli belgeler manuel kontrole gider.
- Demo verileri ve analiz sonuclari kalici olarak saklanmaz.
- PDF olmayan dosyalar reddedilir.
- Buyuk PDF dosyalari reddedilir.
- Cok uzun PDF metni modele gitmeden once truncate edilir.
- Uretim ortaminda veri maskeleme, dosya izolasyonu, audit log ve erisim kontrolu eklenmelidir.

## Security Notes

QueueLess AI Inbox MVP güvenli, kontrollü ve demo odaklı bir kapsamda geliştirilir.

## No Real Email Sending

Gerçek mail gönderimi yok. Analyzer ve UI yalnızca insan onayına hazır cevap taslağı ve demo simülasyon durumu üretir.

Gönderim sadece demo simülasyonudur. Onay butonu gerçek dış iletişim başlatmaz.

## Human Approval Required

İnsan onayı zorunlu. AI sadece analiz, kuyruk önerisi ve düzenlenebilir mail taslağı üretir. Son karar görevli insandadır.

İnsan onayı olmadan gönderim simülasyonu tamamlanmamalıdır.

## Fake Demo Data Only

Gerçek kişisel veri yok. Mock data yalnızca sahte demo isimleri, sahte başvurular ve güvenli örnek mail adresleri kullanır.

Gerçek kişi, kurum, belge, kimlik numarası veya özel veri kullanılmaz.

## No API Keys

API key yok. MVP gerçek AI API veya mail provider gerektirmez. Repo içine API key, token, secret veya provider credential eklenmez.

## Risky Applications Require Manual Control

Riskli belgeler manuel kontrole gider. Düşük güven skoru, bilinmeyen belge türü, eksik attachment, hatalı sender email, boş checklist veya doğrulanamayan içerik Riskli / Manuel Kontrol kuyruğuna yönlendirilir.

Riskli başvurularda gönderim simülasyonu engellenir. Taslak varsa bile otomatik onaya uygun sayılmaz.

## Future Production Security Requirements

- Gerçek mail entegrasyonu eklenirse OAuth veya provider-side secure auth kullanılmalı.
- Secrets sadece environment variable veya secret manager ile tutulmalı.
- PII masking, audit log ve role-based access control eklenmeli.
- Real AI API entegrasyonunda prompt injection, data minimization ve output review kontrolleri uygulanmalı.
- Outbound mail gönderimi için explicit human approval, confirmation modal ve immutable audit trail zorunlu olmalı.
- Riskli belgeler için ikinci insan review veya kurum policy kontrolü eklenmeli.
