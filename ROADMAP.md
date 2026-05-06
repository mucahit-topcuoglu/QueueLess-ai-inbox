# ROADMAP.md

## Phase 0: Project Setup and Documentation

- AGENTS.md ile proje kurallarını sabitle
- Problem-fikir uyumunu belgeleyen PROBLEM_FIT.md hazırla
- Mimari planı ARCHITECTURE.md içinde yaz
- GitHub workflow, AI log, review log ve güvenlik notlarını oluştur

## Phase 1: Mock Inbox and Data Model

- TypeScript başvuru modelini tanımla
- Mock başvuru verilerini oluştur
- Belge türü ve ek dosya metadata alanlarını ekle
- Demo için sahte ve güvenli veri kullan

## Phase 2: AI Analyzer

- Deterministic mock AI analyzer geliştir
- Belge türü tahmini üret
- Checklist'e göre eksik alanları çıkar
- Risk flag üret
- Cevap maili taslağı oluştur

## Phase 3: Dashboard UI

- Dashboard metriklerini göster
- Kuyruk sekmelerini oluştur
- Başvuru listesini göster
- %66 zaman kazancı iddiasını görünür yap

## Phase 4: Application Detail and Checklist View

- Başvuru detay ekranını oluştur
- Mail içeriği ve ek bilgilerini göster
- AI analiz sonucunu göster
- Checklist durumunu ve eksik alanları görünür yap

## Phase 5: Human-Approved Email Flow

- Cevap maili taslağı ekranı oluştur
- Taslağın düzenlenebilir olmasını sağla
- İnsan onayı sonrası simüle gönderim göster
- Gerçek mail gönderimi olmadığını açıkça koru

## Phase 6: Testing and Final Audit

- Mock inbox görünürlük testi
- Queue engine doğrulama testi
- Eksik evrak tespit testi
- Riskli belge manuel kontrol testi
- Simüle mail gönderimi testi
- Final AI audit ve güvenlik kontrolü

## Stretch Goals

- Role göre filtrelenebilir kuyruklar
- Daha gelişmiş dashboard metrikleri
- Çoklu belge türü desteği
- Gerçek AI provider adapter tasarımı
- PII maskeleme katmanı
- CSV export veya demo raporu
