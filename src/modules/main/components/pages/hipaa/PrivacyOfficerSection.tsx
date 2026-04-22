import { Mail, Bell } from "lucide-react";
import { HIPAASection } from "@/components/pages/HIPAASection";

export default function PrivacyOfficerSection() {
  return (
    <HIPAASection
      id="privacy-officer"
      title="Privacy Officer & Contact Information"
      Icon={Mail}
    >
      <div className="space-y-4">
        <p>
          If you have questions or complaints about your privacy rights, please
          contact our Privacy Officer:
        </p>
        <div className="p-4 grid grid-cols-2 border border-[#BEDBFF] bg-[#DBEAFE]  rounded-lg ">
          <div className="flex items-center space-x-4">
            <Mail className="size-6 text-blue-600" />
            <div>
              <p className="font-medium">Email</p>
              <a
                href="mailto:privacy@example.com"
                className="text-blue-600 hover:underline"
              >
                privacy@example.com
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <Bell className="size-6 text-blue-600" />
            <div>
              <p className="font-medium">Phone</p>
              <a
                href="tel:+10000000000"
                className="text-blue-600 hover:underline"
              >
                +1-000-000-0000
              </a>
            </div>
          </div>
        </div>
      </div>
    </HIPAASection>
  );
}
