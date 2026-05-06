"use client";

import { useMemo, useState } from "react";
import { PRODUCT_QUEUES } from "@/lib/constants";
import { simulateHumanApproval } from "@/lib/approvalFlow";
import { calculateQueueCounts, filterApplicationsByQueue } from "@/lib/queueEngine";
import type { ApplicationRecord } from "@/types/application";
import type { DashboardApplication } from "@/types/dashboard";
import { DashboardCards } from "./DashboardCards";
import { ApplicationDetail } from "./ApplicationDetail";
import { ApplicationList } from "./ApplicationList";
import { ErrorState } from "./ErrorState";
import { LoadingState } from "./LoadingState";
import { QueueTabs, type QueueFilter } from "./QueueTabs";
import { TopNav } from "./TopNav";

const RISK_QUEUE = PRODUCT_QUEUES[4];
const COMPLETED_QUEUE = PRODUCT_QUEUES[5];

export function InboxDashboard({ initialApplications }: { initialApplications: ApplicationRecord[] }) {
  const [applications, setApplications] = useState<DashboardApplication[]>(() => initializeDashboardApplications(initialApplications));
  const [activeQueue, setActiveQueue] = useState<QueueFilter>("Tümü");
  const [selectedId, setSelectedId] = useState(initialApplications[0]?.id ?? null);
  const [isLoading] = useState(false);
  const [error] = useState("");

  const counts = useMemo(() => calculateQueueCounts(applications), [applications]);

  const filteredApplications = useMemo(() => {
    if (activeQueue === "Tümü") {
      return applications;
    }

    return filterApplicationsByQueue(applications, activeQueue);
  }, [activeQueue, applications]);

  const selectedApplication = filteredApplications.find((application) => application.id === selectedId) ?? filteredApplications[0] ?? null;

  function handleApprove(applicationId: string, draft: string) {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === applicationId
          ? simulateHumanApproval(application, draft).application
          : application
      )
    );
  }

  function handleDraftChange(applicationId: string, draft: string) {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === applicationId
          ? { ...application, generatedReplyDraft: draft }
          : application
      )
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <TopNav tone="light" />
      <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
      <header className="mb-5 rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-emerald-700">QueueLess AI Inbox</p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              Başvuru mailleri için AI destekli kontrol masası
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              Bu sistem kuruma gelen başvuruları AI ile analiz eder, eksik evrakları ayırır, riskli olanları manuel kontrole gönderir ve insan onayına hazır mail taslağı oluşturur.
            </p>
          </div>
          <div className="grid gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950 sm:min-w-72">
            <span className="font-bold">Demo güvenlik kuralı</span>
            <span>Gerçek mail gönderilmez. Gönderim yalnızca arayüzde simüle edilir.</span>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium leading-6 text-emerald-950">
          AI yalnızca analiz ve taslak üretir. Son karar ve gönderim onayı görevli insandadır.
        </div>
      </header>

      <DashboardCards applications={applications} queues={PRODUCT_QUEUES} />

      <section className="mt-5">
        <QueueTabs queues={PRODUCT_QUEUES} activeQueue={activeQueue} counts={counts} onChange={setActiveQueue} />
      </section>

      {error ? <div className="mt-5"><ErrorState message={error} /></div> : null}

      {isLoading ? (
        <div className="mt-5">
          <LoadingState />
        </div>
      ) : (
        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(420px,0.9fr)_minmax(0,1.1fr)]">
          <section>
            <ApplicationList
              applications={filteredApplications}
              selectedId={selectedApplication?.id ?? null}
              onSelect={(application) => setSelectedId(application.id)}
            />
          </section>

          <ApplicationDetail
            application={selectedApplication}
            isCompleted={selectedApplication?.status === COMPLETED_QUEUE}
            isRisky={selectedApplication?.recommendedQueue === RISK_QUEUE || selectedApplication?.status === RISK_QUEUE}
            onDraftChange={(draft) => {
              if (selectedApplication) {
                handleDraftChange(selectedApplication.id, draft);
              }
            }}
            onApprove={(draft) => {
              if (selectedApplication) {
                handleApprove(selectedApplication.id, draft);
              }
            }}
          />
        </div>
      )}
      </div>
    </main>
  );
}

function initializeDashboardApplications(applications: ApplicationRecord[]): DashboardApplication[] {
  return applications.map((application) => {
    const recommendedQueue = application.status;

    return {
      ...application,
      recommendedQueue
    };
  });
}
