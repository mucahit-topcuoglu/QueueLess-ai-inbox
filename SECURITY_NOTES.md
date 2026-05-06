# SECURITY_NOTES.md

## Security Notes

QueueLess AI Inbox MVP güvenli, kontrollü ve demo odaklı bir kapsamda geliştirilir.

## Security Decisions

- Gerçek kişisel veri kullanılmaz.
- Gerçek mail gönderilmez.
- API key kullanılmaz.
- İnsan onayı olmadan gönderim yapılmaz.
- Riskli belgeler manuel kontrole gider.

## Human Approval Policy

AI yalnızca cevap maili taslağı oluşturur. Cevap taslağı görevli insan tarafından okunabilir, düzenlenebilir ve onaylanabilir olmalıdır.

Demo sırasında gönderim butonu gerçek dış iletişim başlatmaz. Sadece simüle edilmiş bir durum değişikliği gösterir.

## Dashboard UI Mail Simulation

- UI'da `Maili Onayla ve Gönder` butonu gerçek mail göndermez, sadece demo simülasyonu yapar.
- İnsan onayı olmadan hiçbir outbound işlem yapılmaz.
- Simülasyon yalnızca tarayıcı state'i içinde başvuru durumunu `Tamamlananlar` olarak günceller.

## Data Policy

MVP boyunca yalnızca sahte demo verisi kullanılacaktır. Gerçek başvuru sahibi adı, mail adresi, kimlik bilgisi, belge numarası veya kişisel veri kullanılmaz.

## Secrets Policy

## Mock AI Analyzer Security Decisions

- Gercek mail gonderimi yoktur.
- AI analyzer sadece oneri uretir.
- Insan onayi zorunludur.
- Dusuk guven skorlu belgeler manuel kontrole gider.
- Gercek kisisel veri kullanilmaz.
- Demo verisi sahtedir.
- Cevap maili yalnizca string taslak olarak uretilir.
- Riskli basvurular icin taslak otomatik gonderime uygun degildir ve manuel kontrol aciklamasi icerir.
- Kod icinde gercek outbound mail provider, SMTP entegrasyonu veya otomatik iletisim mantigi bulunmaz.

MVP gerçek AI API veya mail provider gerektirmez. Bu nedenle API key, token veya secret repo içine eklenmez.

## Risk Routing

Düşük güven skoru, belirsiz belge türü, eksik kritik alan veya şüpheli içerik durumunda başvuru Riskli / Manuel Kontrol kuyruğuna yönlendirilmelidir.
