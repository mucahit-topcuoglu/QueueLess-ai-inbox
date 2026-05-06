import type { ApplicationRecord, ProductQueue } from "./application";

export type DashboardApplication = ApplicationRecord & {
  recommendedQueue: ProductQueue;
};
