# PROBLEM_FIT.md

## 1. Problem Nedir?

Kurumlara gelen başvuru mailleri ve ekli belgelerin manuel incelenmesi tekrar eden, zaman alan ve hataya açık bir operasyon problemidir. Görevli kişi her başvuruda maili okur, ek dosyayı inceler, belge türünü anlamaya çalışır, eksik alanları kontrol eder, başvuruyu sınıflandırır ve cevap maili hazırlar.

Bu iş yükü özellikle insan kaynakları, öğrenci işleri, belediyeler, kamu kurumları ve staj başvurusu alan şirketlerde sık tekrar eder. Problem yalnızca "mail çokluğu" değil; mail, belge, checklist, kuyruk ve cevap sürecinin parçalı yönetilmesidir.

## 2. Bu Problem Kimleri Etkiler?

- İnsan kaynakları ekipleri
- Öğrenci işleri
- Belediyeler
- Kamu kurumları
- Staj başvurusu alan şirketler
- Evrak kontrolü yapan operasyon ekipleri

## 3. Manuel Süreç Bugün Nasıl İşliyor?

Manuel süreçte görevli kişi başvuru mailini açar, ek dosyayı indirir veya görüntüler, belgenin hangi başvuru türüne ait olduğunu anlamaya çalışır. Ardından başvuru formu, kimlik belgesi, transkript, izin formu, CV veya destekleyici evrak gibi dosyalarda zorunlu alanların tamamlanıp tamamlanmadığını kontrol eder.

Eksikler varsa not alır, başvuruyu doğru statüye taşır ve başvuru sahibine cevap maili yazar. Bu süreç her başvuru için yeniden yapılır.

Manuel adımlar:

1. Mail açılır.
2. Ek indirilir.
3. Belge türü anlaşılır.
4. Eksik alanlar kontrol edilir.
5. Eksikler not edilir.
6. Başvuru sınıflandırılır.
7. Cevap maili yazılır.
8. Gönderilir.

## 4. Zaman Kaybı Nerede Oluşuyor?

Zaman kaybı en çok tekrarlı mail okuma, belge kontrolü, eksik evrak not alma, cevap maili yazma ve sınıflandırma işlerinde oluşur. Görevli kişi her başvuruda benzer soruları yeniden cevaplar:

- Bu mail hangi başvuru türüyle ilgili?
- Ek dosya hangi belge türü?
- Zorunlu alanlardan hangileri eksik?
- Bu başvuru hangi kuyruğa gitmeli?
- Başvuru sahibine hangi cevap yazılmalı?

QueueLess AI Inbox bu tekrar eden karar noktalarını tek analiz akışında toplar.

## 5. QueueLess AI Inbox Bu Problemi Nasıl Çözüyor?

QueueLess AI Inbox mail ve belge analizini, checklist kontrolünü, kuyruk sınıflandırmasını ve mail taslağı üretimini tek akışta toplar.

Sistem gelen maili ve eki analiz eder, belge türünü tahmin eder, checklist'e göre eksik alanları çıkarır, riskli durumları işaretler ve başvuruyu doğru kuyruğa önerir. Ardından görevlinin düzenleyip onaylayabileceği bir cevap maili taslağı oluşturur.

Görevli kişi sıfırdan inceleme yapmak yerine AI destekli ön incelemeyi doğrular. Bu da süreci hızlandırır, standartlaştırır ve daha görünür hale getirir.

## 6. Problem ile Fikir Neden Birebir Uyumlu?

Problem manuel başvuru evrakı kontrol sürecidir. Fikir doğrudan bu sürecin her adımına karşılık verir.

Manuel süreç ile MVP karşılığı:

1. Mail açılır -> Mock Inbox başvuruyu listeler.
2. Ek indirilir -> Mock attachment metadata analiz edilir.
3. Belge türü anlaşılır -> AI analyzer belge türü tahmini yapar.
4. Eksik alanlar kontrol edilir -> Checklist engine eksikleri çıkarır.
5. Eksikler not edilir -> Eksik alanlar detay ekranında görünür.
6. Başvuru sınıflandırılır -> Queue engine doğru kuyruğu önerir.
7. Cevap maili yazılır -> AI insan onayına hazır taslak üretir.
8. Gönderilir -> İnsan onayı sonrası gönderim yalnızca simüle edilir.

Bu nedenle çözüm, problemin çevresinde duran genel bir otomasyon değil; problemin kendisini hedefleyen uçtan uca bir başvuru yönetimi MVP'sidir.

## 7. AI Neden Gerekli?

AI burada doğrudan problemle bağlantılıdır. Kullanım alanları:

- Belge türü tahmini
- Mail özeti çıkarma
- Eksik alanları checklist'e göre belirleme
- Düşük güven veya risk sinyallerini yakalama
- Başvuru için uygun kuyruğu önermek
- Cevap maili taslağı oluşturmak

MVP'de gerçek AI API kullanılmaz. Deterministic mock AI analyzer kullanılır. Bu tercih demo güvenilirliğini artırır, testleri tekrarlanabilir yapar ve hackathon süresinde kontrollü çıktı sağlar. Mimari ileride gerçek AI API'ye bağlanabilecek şekilde planlanmıştır.

## 8. İnsan Onayı Neden Gerekli?

Kurum belgeleri ve başvuru yanıtları hassas olabilir. Yanlış veya otomatik gönderilen bir mail idari, hukuki veya güven ilişkisi açısından risk oluşturabilir.

Bu yüzden AI otomatik mail göndermez. AI yalnızca düzenlenebilir cevap taslağı üretir. Son karar, düzenleme ve onay insandadır. Düşük güvenli veya riskli başvurular Riskli / Manuel Kontrol kuyruğuna yönlendirilir.

## 9. MVP Demo Akışı

Dashboard -> Gelen Başvurular -> Eksik Staj Evrakı Başvurusu -> AI Analizi -> Checklist -> Eksik Alanlar -> Kuyruk Önerisi -> Mail Taslağı -> İnsan Onayı -> Simüle Gönderim -> Riskli Başvuru -> AI Transparency / Güvenlik Mesajı

Demo sırasında hakem, manuel kontrol edilen bir başvurunun AI destekli ama insan onaylı akışla nasıl yönetildiğini görür.

## 10. Ölçülebilir Fayda

Manuel süreç yaklaşık 6 dakika:

- Mail ve ekleri inceleme
- Belge türünü anlama
- Eksik alanları kontrol etme
- Başvuruyu sınıflandırma
- Cevap maili yazma

QueueLess AI Inbox ile hedef süreç yaklaşık 2 dakika:

- AI ön analizini kontrol etme
- Checklist sonucunu doğrulama
- Mail taslağını onaylama

Tahmini zaman kazancı: %66.

## 11. 1. Tur Jüriye Söylenecek 60 Saniyelik Anlatım

QueueLess AI Inbox, kurumlara mail yoluyla gelen başvuruların manuel evrak kontrolü problemini hedefleyen AI destekli bir başvuru kuyruğu MVP'sidir. Bugün bir görevli başvuru mailini açıyor, eki indiriyor, belge türünü anlamaya çalışıyor, eksik alanları kontrol ediyor, başvuruyu sınıflandırıyor ve cevap mailini yazıyor. Bu süreç yaklaşık 6 dakika sürüyor ve her başvuruda tekrar ediyor.

Biz bu akışı tek ekrana topluyoruz. Sistem gelen maili ve eki analiz ediyor, belge türünü tahmin ediyor, checklist'e göre eksik alanları çıkarıyor, başvuruyu doğru kuyruğa öneriyor ve insan onayına hazır cevap maili taslağı oluşturuyor. AI gerçek mail göndermiyor; insan son kontrolü yapıyor ve demo sırasında gönderim yalnızca simüle ediliyor.

Bu MVP ile 6 dakikalık manuel süreci yaklaşık 2 dakikaya indirmeyi hedefliyoruz. Yani yaklaşık %66 zaman kazancı gösteriyoruz. Fikir problemle birebir uyumlu çünkü manuel başvuru evrakı kontrol sürecindeki her adımı daha hızlı, izlenebilir ve güvenli hale getiriyor.

## 12. Problem-Fikir Uyumu Checklist'i

- [x] Gerçek ve tekrar eden bir kurumsal problemi çözüyor.
- [x] AI kullanımı probleme doğrudan bağlı.
- [x] İnsan onayı ile güvenli kullanım sağlanıyor.
- [x] MVP demo ile gösterilebilir.
- [x] Ölçülebilir zaman kazancı var.
- [x] Kurumlar için uygulanabilir.
- [x] Mail, belge, kuyruk ve cevap sürecini tek akışta topluyor.
- [x] Hackathon süresinde yapılabilir bir MVP kapsamı var.
