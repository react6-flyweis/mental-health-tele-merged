import { Shield } from "lucide-react";
import { HIPAASection } from "@/components/pages/HIPAASection";

export default function MoreInformationSection() {
  return (
    <HIPAASection
      id="more-information"
      title="For More Information"
      Icon={Shield}
    >
      <div className="p-4 bg-blue-50 border border-[#BEDBFF] rounded-lg">
        <p>
          You may also visit{" "}
          <a
            href="https://www.hhs.gov"
            className="text-primary hover:underline"
          >
            www.hhs.gov
          </a>{" "}
          for more details about your privacy rights under HIPAA.
        </p>
      </div>
    </HIPAASection>
  );
}
