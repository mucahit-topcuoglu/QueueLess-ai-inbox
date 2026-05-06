# PROBLEM_FIT.md

## 1. Problem Nedir?

Kurumlara gelen başvuru mailleri ve ekli belgelerin manuel incelenmesi önemli bir operasyon problemidir. Görevli kişiler başvuru metnini, ek dosyaları, belge türlerini, eksik alanları ve cevap ihtiyacını tek tek kontrol etmek zorunda kalır.

Bu süreç özellikle çok sayıda başvuru alan kurumlarda yavaşlar, tekrar eder ve insan hatasına açık hale gelir.

## 2. Bu Problem Kimleri Etkiler?

- İnsan kaynakları ekipleri
- Öğrenci işleri
- Belediyeler
- Kamu kurumları
- Staj başvurusu alan şirketler
- Evrak kontrolü yapan operasyon ekipleri

## 3. Manuel Süreç Bugün Nasıl İşliyor?

Bugünkü manuel süreçte görevli kişi önce mail kutusunu açar ve yeni başvuruyu bulur. Ardından ekleri indirir veya görüntüler. Dosyanın hangi belge türüne ait olduğunu anlamaya çalışır. Başvuru formu, kimlik belgesi, transkript, izin formu veya destekleyici evrak gibi belgelerde zorunlu alanların tamamlanıp tamamlanmadığını kontrol eder.

Eksik alanlar varsa bunları not eder. Sonra başvurunun hangi statüye alınacağını belirler: eksik evrak, inceleme, riskli kontrol veya tamamlanma gibi. En sonunda başvuru sahibine cevap maili yazar ve gönderir.

## 4. Zaman Kaybı Nerede Oluşuyor?

Zaman kaybı en çok tekrarlı mail okuma, belge açma, belge türünü anlama, eksik evrak not alma, başvuruyu sınıflandırma ve cevap maili yazma adımlarında oluşur.

Bu görevlerin çoğu karar destek niteliğindedir. Her başvuruda benzer sorular sorulur:

- Bu başvuru hangi belge türünü içeriyor?
- Hangi zorunlu alanlar eksik?
- Başvuru hangi kuyruğa gitmeli?
- Başvuru sahibine hangi cevap verilmeli?

QueueLess AI Inbox bu tekrar eden kontrol noktalarını tek bir analiz akışında toplar.

## 5. QueueLess AI Inbox Bu Problemi Nasıl Çözüyor?

QueueLess AI Inbox mail ve belge analizini, checklist kontrolünü, kuyruk sınıflandırmasını ve cevap maili taslağı üretimini tek akışta toplar.

Sistem gelen başvuruyu analiz eder, belge türünü tahmin eder, checklist'e göre eksikleri çıkarır, riskli durumları işaretler ve başvuruyu doğru kuyruğa önerir. Ardından görevlinin düzenleyip onaylayabileceği bir cevap maili taslağı oluşturur.

Bu sayede görevli kişi sıfırdan kontrol yapmak yerine AI destekli bir ön incelemeyi denetler.

## 6. Problem ile Fikir Neden Birebir Uyumlu?

Problem, manuel başvuru evrakı kontrol sürecidir. Fikir de doğrudan bu süreci hedefler.

QueueLess AI Inbox maili, eki, belge türünü, eksik alanları, kuyruk kararını ve cevap taslağını aynı iş akışında ele alır. Yani çözüm, problemin çevresindeki genel bir otomasyon değil; problemin her manuel adımına karşılık gelen somut bir destek sistemidir.

Manuel süreçteki her adımın MVP karşılığı vardır:

1. Mail açılır -> Mock Inbox'ta başvuru görünür.
2. Ek indirilir -> Mock ek bilgisi analiz edilir.
3. Belge türü anlaşılır -> AI belge türü tahmini yapar.
4. Eksik alanlar kontrol edilir -> Checklist engine eksikleri çıkarır.
5. Eksikler not edilir -> Eksik alanlar listelenir.
6. Başvuru sınıflandırılır -> Queue engine doğru kuyruğu önerir.
7. Cevap maili yazılır -> AI cevap taslağı oluşturur.
8. Gönderilir -> İnsan onayı sonrası gönderim simüle edilir.

## 7. AI Neden Gerekli?

AI, tekrar eden fakat bağlama göre değişen başvuru inceleme adımlarında karar desteği sağlar. Belge türü tahmini, mail özeti, eksik alan çıkarımı, risk tespiti ve cevap taslağı üretimi AI için doğal kullanım alanlarıdır.

MVP'de gerçek AI API kullanılmaz. Bunun yerine deterministic mock AI analyzer kullanılır. Bu tercih demo güvenilirliğini artırır ve hackathon süresinde tekrarlanabilir sonuç sağlar. Mimari ise ileride gerçek AI API'ye bağlanabilecek şekilde planlanır.

## 8. İnsan Onayı Neden Gerekli?

Kurum belgeleri hassas olabilir. Başvuru sahibine gönderilecek yanıtlar hukuki, idari veya kişisel sonuçlar doğurabilir. Bu nedenle sistem otomatik mail göndermez.

AI yalnızca taslak üretir. Son karar, düzenleme ve onay insandadır. Düşük güvenli, eksik veya riskli belgeler Riskli / Manuel Kontrol kuyruğuna yönlendirilir.

## 9. MVP Demo Akışı

Dashboard -> Gelen Başvuru -> AI Analizi -> Checklist -> Kuyruk -> Mail Taslağı -> İnsan Onayı -> Simüle Gönderim

Demo sırasında hakem, bir başvurunun manuel kontrol yerine AI destekli bir akışla nasıl incelendiğini görür. Sistem belge türünü tahmin eder, eksik alanları listeler, kuyruğu önerir ve cevap maili taslağı üretir. Görevli taslağı onayladığında gerçek mail gönderilmez; yalnızca demo simülasyonu gösterilir.

## 10. Ölçülebilir Fayda

Manuel süreç yaklaşık 6 dakika sürer:

- Mail ve ekleri inceleme
- Belge türünü anlama
- Eksik alanları kontrol etme
- Başvuruyu sınıflandırma
- Cevap maili yazma

QueueLess AI Inbox ile hedef süreç yaklaşık 2 dakikadır:

- AI ön analizini kontrol etme
- Checklist sonucunu doğrulama
- Mail taslağını onaylama

Tahmini zaman kazancı: %66.

## 11. 1. Tur Jüriye Söylenecek 60 Saniyelik Anlatım

QueueLess AI Inbox, kurumlara mail yoluyla gelen başvuruların manuel evrak kontrolü problemini hedefleyen bir AI destekli başvuru yönetim sistemi MVP'sidir. Bugün bir görevli başvuru mailini açıyor, ekleri indiriyor, belge türünü anlamaya çalışıyor, eksik alanları kontrol ediyor, başvuruyu sınıflandırıyor ve cevap mailini elle yazıyor. Bu süreç yaklaşık 6 dakika sürüyor ve her başvuruda tekrar ediyor.

Bizim çözümümüz bu akışı tek ekrana topluyor. Sistem gelen maili ve ek belgeyi analiz ediyor, belge türünü tahmin ediyor, checklist'e göre eksik alanları çıkarıyor, başvuruyu doğru kuyruğa öneriyor ve görevlinin onayına hazır cevap maili taslağı oluşturuyor. AI gerçek mail göndermez; insan son kontrolü yapar ve demo sırasında gönderim yalnızca simüle edilir.

Bu MVP ile manuel 6 dakikalık süreci yaklaşık 2 dakikaya indirmeyi hedefliyoruz. Yani yaklaşık %66 zaman kazancı sağlıyoruz. Fikrimiz problemle birebir uyumlu çünkü doğrudan manuel başvuru evrakı kontrol sürecindeki her adımı daha hızlı, izlenebilir ve güvenli hale getiriyor.

## 12. Problem-Fikir Uyumu Checklist'i

- [x] Gerçek ve tekrar eden bir kurumsal problemi çözüyor.
- [x] AI kullanımı probleme doğrudan bağlı.
- [x] İnsan onayı ile güvenli kullanım sağlanıyor.
- [x] MVP demo ile gösterilebilir.
- [x] Ölçülebilir zaman kazancı var.
- [x] Kurumlar için uygulanabilir.
- [x] Mail, belge, kuyruk ve cevap sürecini tek akışta topluyor.
- [x] Hackathon süresinde yapılabilir bir MVP kapsamı var.
