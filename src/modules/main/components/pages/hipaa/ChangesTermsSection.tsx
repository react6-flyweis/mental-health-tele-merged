import { Bell } from "lucide-react";
import { HIPAASection } from "@/components/pages/HIPAASection";

export default function ChangesTermsSection() {
  return (
    <HIPAASection
      id="changes-terms"
      title="Changes to the Terms of This Notice"
      Icon={Bell}
    >
      <div className="p-4 bg-yellow-50 border border-[#FFF085] rounded-lg">
        <p>
          We may update this notice from time to time. The latest version will
          always be available on our website.
        </p>
      </div>
    </HIPAASection>
  );
}
