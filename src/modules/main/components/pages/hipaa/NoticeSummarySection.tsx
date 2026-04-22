import { FileText } from "lucide-react";
import { HIPAASection } from "@/components/pages/HIPAASection";

export default function NoticeSummarySection() {
  return (
    <HIPAASection id="notice-summary" title="Notice Summary" Icon={FileText}>
      <div className="space-y-4">
        <div className="p-4 bg-green-50 border-l-4 border-[#3D8C8E]">
          <h4 className="font-semibold">Your Rights</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            You have the right to access and manage your health information,
            request corrections, and receive a copy of this notice.
          </p>
        </div>
        <div className="p-4 bg-yellow-50 border-l-4 border-[#F0B100]">
          <h4 className="font-semibold">Your Choices</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            You can decide how your information is shared in certain situations,
            such as with family members or for marketing purposes.
          </p>
        </div>
        <div className="p-4 bg-green-50 border-l-4 border-[#3D8C8E]">
          <h4 className="font-semibold">Our Uses and Disclosures</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            We may use and share your health information for treatment, payment,
            healthcare operations, and as required by law.
          </p>
        </div>
      </div>
    </HIPAASection>
  );
}
