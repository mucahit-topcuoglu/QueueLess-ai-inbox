import { InboxDashboard } from "@/components/InboxDashboard";
import { analyzedMockApplications } from "@/data/mockApplications";

export default function DashboardPage() {
  return <InboxDashboard initialApplications={analyzedMockApplications} />;
}
