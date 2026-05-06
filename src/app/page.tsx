import { CtaSection } from "@/components/CtaSection";
import { FeatureSection } from "@/components/FeatureSection";
import { HeroSection } from "@/components/HeroSection";
import { HumanApprovalNotice } from "@/components/HumanApprovalNotice";
import { SiteFooter } from "@/components/SiteFooter";
import { UseCaseCards } from "@/components/UseCaseCards";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <HeroSection />
      <FeatureSection />
      <UseCaseCards />
      <HumanApprovalNotice variant="dark" />
      <CtaSection />
      <SiteFooter />
    </main>
  );
}
