import { InboxDashboard } from "@/components/InboxDashboard";
import { analyzedMockApplications } from "@/data/mockApplications";

export default function HomePage() {
  return <InboxDashboard initialApplications={analyzedMockApplications} />;
}
