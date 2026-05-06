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

## Data Policy

MVP boyunca yalnızca sahte demo verisi kullanılacaktır. Gerçek başvuru sahibi adı, mail adresi, kimlik bilgisi, belge numarası veya kişisel veri kullanılmaz.

## Secrets Policy

MVP gerçek AI API veya mail provider gerektirmez. Bu nedenle API key, token veya secret repo içine eklenmez.

## Risk Routing

Düşük güven skoru, belirsiz belge türü, eksik kritik alan veya şüpheli içerik durumunda başvuru Riskli / Manuel Kontrol kuyruğuna yönlendirilmelidir.
