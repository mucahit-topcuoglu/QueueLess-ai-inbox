import { HumanApprovalNotice } from "./HumanApprovalNotice";

const documents = [
  {
    title: "staj-formu-ayse-demo.pdf",
    queue: "Eksik Evrak",
    missing: ["Öğrenci No", "Kurum Adı"],
    risks: [],
    summary: "Staj evrakı olarak sınıflandırıldı; iki zorunlu alan eksik."
  },
  {
    title: "staj-defteri-mert-demo.pdf",
    queue: "İncelemeye Alındı",
    missing: [],
    risks: [],
    summary: "Zorunlu alanlar tamamlandı, danışman incelemesine hazır."
  },
  {
    title: "scan-riskli-demo.jpg",
    queue: "Riskli / Manuel Kontrol",
    missing: ["İmza"],
    risks: ["Düşük güven skoru", "İmza doğrulanamıyor"],
    summary: "Tarama kalitesi düşük olduğu için manuel kontrol gerekir."
  }
];

const queues = ["Eksik Evrak", "İncelemeye Alındı", "Riskli / Manuel Kontrol", "Onay Bekleyen Yanıtlar", "Tamamlananlar"];

export function DocumentQueueBoard() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
      <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-panel">
        <h2 className="text-lg font-black text-neutral-950">Belge analiz sonucu ve kuyruklar</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {queues.map((queue) => (
            <div key={queue} className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <p className="font-bold text-neutral-900">{queue}</p>
              <div className="mt-3 space-y-2">
                {documents.filter((document) => document.queue === queue).map((document) => (
                  <div key={document.title} className="rounded-md border border-neutral-200 bg-white p-3 text-sm">
                    <p className="font-black text-neutral-950">{document.title}</p>
                    <p className="mt-1 text-neutral-600">{document.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="space-y-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-panel">
        <h2 className="text-lg font-black text-neutral-950">Detay görünümü</h2>
        <Info title="Tespit edilen zorunlu alanlar" items={["Ad Soyad", "Öğrenci No", "Staj Dönemi", "Tarih", "İmza", "Kurum Adı"]} />
        <Info title="Eksik alanlar" items={["Öğrenci No", "Kurum Adı"]} />
        <Info title="Riskli noktalar" items={["Risk yok veya manuel kontrol uyarısı kartlarda gösterilir"]} />
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm leading-6 text-neutral-700">
          AI açıklaması: Mail konusu, ek dosya adı ve checklist eşleşmeleri incelendi. Eksikler çıkarıldı ve kuyruk önerisi üretildi.
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
          Yanıt taslağı: Eksik alanların tamamlanması için öğrenciye gönderilecek bilgilendirme metni görevli onayına hazırdır.
        </div>
        <HumanApprovalNotice />
      </aside>
    </div>
  );
}

function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-black text-neutral-950">{title}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">{item}</li>
        ))}
      </ul>
    </div>
  );
}
