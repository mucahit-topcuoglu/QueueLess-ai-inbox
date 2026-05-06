import { PRODUCT_QUEUES } from "./constants.ts";
import type { ApplicationRecord, ProductQueue } from "../types/application.ts";

export type ApprovalApplication = ApplicationRecord & {
  recommendedQueue?: ProductQueue;
};

export type ApprovalSimulationResult<TApplication extends ApprovalApplication> = {
  application: TApplication;
  simulated: boolean;
  message: string;
  blockedReason?: string;
};

export function canSimulateHumanApproval(application: ApprovalApplication): boolean {
  const recommendedQueue = application.recommendedQueue ?? application.status;

  return Boolean(application.generatedReplyDraft.trim())
    && application.status !== PRODUCT_QUEUES[5]
    && application.status !== PRODUCT_QUEUES[4]
    && recommendedQueue !== PRODUCT_QUEUES[4];
}

export function simulateHumanApproval<TApplication extends ApprovalApplication>(
  application: TApplication,
  editedDraft: string
): ApprovalSimulationResult<TApplication> {
  if (!canSimulateHumanApproval({ ...application, generatedReplyDraft: editedDraft })) {
    return {
      application,
      simulated: false,
      message: "Riskli basvurularda gonderim simulasyonu engellendi.",
      blockedReason: "Manual control is required before approval simulation."
    };
  }

  return {
    application: {
      ...application,
      generatedReplyDraft: editedDraft,
      status: PRODUCT_QUEUES[5]
    },
    simulated: true,
    message: "Mail gonderildi olarak simule edildi."
  };
}
