import { Bell, Shield } from "lucide-react";
import { Lock } from "lucide-react";
import { HIPAASection } from "@/components/pages/HIPAASection";

export const responsibilitiesList = [
  {
    Icon: Lock,
    title: "Protect the privacy and security of your health information",
    description:
      "We maintain strict safeguards to ensure your medical data remains confidential and secure at all times.",
  },
  {
    Icon: Bell,
    title: "Inform you if a breach occurs",
    description:
      "We will promptly notify you if any unauthorized access or disclosure of your information happens.",
  },
  {
    Icon: Shield,
    title: "Follow the duties and privacy practices described in this notice",
    description:
      "We are committed to upholding all the privacy standards and obligations outlined here.",
  },
];

export default function OurResponsibilitiesSection() {
  return (
    <HIPAASection
      id="our-responsibilities"
      title="Our Responsibilities"
      Icon={Lock}
    >
      <div className="space-y-6">
        <p className="text-muted-foreground">We are required by law to:</p>
        <div className="space-y-3">
          {responsibilitiesList.map((item) => (
            <div
              key={item.title}
              className="flex items-start p-4 bg-[#F0FDFA] rounded-xl"
            >
              <item.Icon className="size-5 text-primary mt-1" />
              <div className="ml-3">
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HIPAASection>
  );
}
