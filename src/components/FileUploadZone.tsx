"use client";

import { useState } from "react";

export function FileUploadZone({
  title = "PDF belgelerini seç veya sürükle",
  helper = "Demo akışı: dosyalar sadece tarayıcı state'inde listelenir.",
  demoFiles = ["demo-cv-ayse.pdf", "demo-staj-evraki.pdf"]
}: {
  title?: string;
  helper?: string;
  demoFiles?: string[];
}) {
  const [files, setFiles] = useState<string[]>([]);
  const visibleFiles = files.length > 0 ? files : demoFiles;

  return (
    <div>
      <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-emerald-400 bg-emerald-50 px-4 text-center transition hover:bg-emerald-100">
        <span className="text-sm font-black text-slate-950">{title}</span>
        <span className="mt-1 text-xs font-medium text-slate-600">{helper}</span>
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
        {visibleFiles.map((file) => (
          <div key={file} className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
            <span className="font-semibold text-slate-800">{file}</span>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800">Hazır</span>
          </div>
        ))}
      </div>
    </div>
  );
}
