import { LOW_CONFIDENCE_THRESHOLD, PRODUCT_QUEUES, RISK_FLAGS } from "./constants.ts";
import type { ApplicationPriority, ApplicationRecord, ProductQueue } from "../types/application.ts";

export type QueueDecisionInput = {
  confidenceScore: number;
  missingFields: string[];
  riskFlags: string[];
};

export type QueueVisibleApplication = ApplicationRecord & {
  recommendedQueue?: ProductQueue;
};

export type QueueCounts = Record<ProductQueue, number> & {
  all: number;
};

export function recommendQueue(input: QueueDecisionInput): ProductQueue {
  if (input.confidenceScore < LOW_CONFIDENCE_THRESHOLD || input.riskFlags.length > 0) {
    return "Riskli / Manuel Kontrol";
  }

  if (input.missingFields.length > 0) {
    return "Eksik Evrak";
  }

  return "İncelemeye Alındı";
}

export function calculatePriority(queue: ProductQueue, missingFields: string[], riskFlags: string[]): ApplicationPriority {
  if (queue === "Riskli / Manuel Kontrol") {
    return riskFlags.includes(RISK_FLAGS.lowConfidence) ? "Kritik" : "Yüksek";
  }

  if (missingFields.length >= 3) {
    return "Yüksek";
  }

  if (missingFields.length > 0) {
    return "Normal";
  }

  return "Düşük";
}

export function hasReplyDraftForApproval(queue: ProductQueue): boolean {
  return queue === "Eksik Evrak" || queue === "İncelemeye Alındı";
}

export function isAwaitingHumanApproval(application: QueueVisibleApplication): boolean {
  const recommendedQueue = application.recommendedQueue ?? application.status;

  return Boolean(application.generatedReplyDraft)
    && application.status !== PRODUCT_QUEUES[5]
    && recommendedQueue !== PRODUCT_QUEUES[4];
}

export function calculateQueueCounts<TApplication extends QueueVisibleApplication>(applications: TApplication[]): QueueCounts {
  const counts = PRODUCT_QUEUES.reduce(
    (accumulator, queue) => ({ ...accumulator, [queue]: 0 }),
    { all: applications.length } as QueueCounts
  );

  for (const application of applications) {
    counts[application.status] += 1;
  }

  counts[PRODUCT_QUEUES[3]] = applications.filter(isAwaitingHumanApproval).length;

  return counts;
}

export function filterApplicationsByQueue<TApplication extends QueueVisibleApplication>(
  applications: TApplication[],
  queue: ProductQueue
): TApplication[] {
  if (queue === PRODUCT_QUEUES[3]) {
    return applications.filter(isAwaitingHumanApproval);
  }

  return applications.filter((application) => application.status === queue);
}

export function findLikelyDuplicateApplicationIds(applications: ApplicationRecord[]): string[] {
  const seen = new Map<string, string>();
  const duplicateIds: string[] = [];

  for (const application of applications) {
    const key = `${application.senderEmail.trim().toLowerCase()}::${application.subject.trim().toLowerCase()}`;
    const firstId = seen.get(key);

    if (firstId) {
      duplicateIds.push(application.id);
    } else {
      seen.set(key, application.id);
    }
  }

  return duplicateIds;
}
