"use client";

import { useState } from "react";

export function PdfUploadPanel({ title, description }: { title: string; description: string }) {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-panel">
      <h2 className="text-lg font-black text-neutral-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
      <label className="mt-4 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-emerald-400 bg-emerald-50 px-4 text-center transition hover:bg-emerald-100">
        <span className="text-sm font-black text-neutral-950">PDF belgelerini seç veya sürükle</span>
        <span className="mt-1 text-xs font-medium text-neutral-600">Demo akışı: dosyalar sadece tarayıcı state’inde listelenir.</span>
        <input
          type="file"
          accept="application/pdf,.pdf"
          multiple
          className="sr-only"
          onChange={(event) => {
            const nextFiles = Array.from(event.target.files ?? []).map((file) => file.name);
            setFiles(nextFiles);
          }}
        />
      </label>
      <div className="mt-4 space-y-2">
        {(files.length > 0 ? files : ["demo-cv-ayse.pdf", "demo-staj-evraki.pdf"]).map((file) => (
          <div key={file} className="flex items-center justify-between rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm">
            <span className="font-semibold text-neutral-800">{file}</span>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800">Hazır</span>
          </div>
        ))}
      </div>
    </div>
  );
}
