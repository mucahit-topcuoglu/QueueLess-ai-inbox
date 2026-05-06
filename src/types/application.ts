import type { PRODUCT_QUEUES } from "../lib/constants.ts";

export type ProductQueue = (typeof PRODUCT_QUEUES)[number];

export type ApplicationType =
  | "Staj Evrakı"
  | "CV Başvurusu"
  | "Genel Başvuru Formu"
  | "Bilinmeyen Belge";

export type DocumentType = "PDF" | "DOCX" | "Image" | "Plain Email" | "Unknown";

export type ApplicationPriority = "Düşük" | "Normal" | "Yüksek" | "Kritik";

export type ChecklistItem = {
  label: string;
  required: boolean;
  present: boolean;
};

export type ApplicationRecord = {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
  attachmentName: string | null;
  documentType: DocumentType;
  detectedApplicationType: ApplicationType;
  confidenceScore: number;
  priority: ApplicationPriority;
  status: ProductQueue;
  checklist: ChecklistItem[];
  missingFields: string[];
  riskFlags: string[];
  aiSummary: string;
  generatedReplyDraft: string;
  createdAt: string;
};

export type AnalyzerResult = {
  detectedApplicationType: ApplicationType;
  documentType: DocumentType;
  confidenceScore: number;
  priority: ApplicationPriority;
  checklistResult: ChecklistItem[];
  missingFields: string[];
  riskFlags: string[];
  recommendedQueue: ProductQueue;
  requiresHumanApproval: true;
  replyDraftReadyForApproval: boolean;
  aiSummary: string;
  generatedReplyDraft: string;
};
