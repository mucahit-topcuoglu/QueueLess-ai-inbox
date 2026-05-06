# SECURITY_NOTES.md

## No Real Email Sending

QueueLess AI Inbox MVP gercek mail gondermez. Analyzer ve UI yalnizca insan onayina hazir cevap taslagi ve demo simulasyon durumu uretir.

Kod kalite kontrolu uretim kodunda `sendEmail`, `nodemailer`, `smtp`, `mailgun` ve `sendgrid` patternlerini tarar. Bu PR'da gercek outbound mail entegrasyonu bulunmamaktadir.

## Human-in-the-loop Approval

AI sadece analiz, kuyruk onerisi ve duzenlenebilir mail taslagi uretir. Son karar gorevli insandadir.

Onay akisi `simulateHumanApproval` fonksiyonuyla demo durum guncellemesi yapar. Bu fonksiyon gercek dis iletisim baslatmaz, yalnizca basvuruyu UI state icinde `Tamamlananlar` durumuna tasir.

## Fake Demo Data Only

Mock data yalnizca sahte demo isimleri ve `example.com` mail adresleri kullanir. Gercek kisi, kurum, belge, kimlik numarasi veya ozel veri kullanilmaz.

## No API Keys

MVP gercek AI API veya mail provider gerektirmez. Repo icine API key, token, secret veya provider credential eklenmedi.

## Risky Applications Require Manual Control

Dusuk guven skoru, bilinmeyen belge turu, eksik attachment, hatali sender email, bos checklist veya imza dogrulanamiyor durumu `Riskli / Manuel Kontrol` kuyruguna gider.

Riskli basvurularda gonderim simulasyonu engellenir. Taslak varsa bile otomatik onaya uygun sayilmaz.

## Future Production Security Requirements

- Gercek mail entegrasyonu eklenirse OAuth veya provider-side secure auth kullanilmali.
- Secrets sadece environment variable veya secret manager ile tutulmali.
- PII masking, audit log ve role-based access control eklenmeli.
- Real AI API entegrasyonunda prompt injection, data minimization ve output review kontrolleri uygulanmali.
- Outbound mail gonderimi icin explicit human approval, confirmation modal ve immutable audit trail zorunlu olmali.
- Riskli belgeler icin ikinci insan review veya kurum policy kontrolu eklenmeli.
