import { Database } from "lucide-react";
import { HIPAASection } from "@/components/pages/HIPAASection";

const usesList = [
  {
    title: "Treatment",
    description:
      "To provide and coordinate your care with other healthcare providers.",
  },
  {
    title: "Operations",
    description:
      "To improve our services, train staff, and ensure quality care delivery.",
  },
  {
    title: "Payment",
    description:
      "To process billing, insurance claims, and payment verification.",
  },
  {
    title: "Public Health",
    description:
      "For safety and prevention activities, disease reporting, and public health initiatives.",
  },
  {
    title: "Research",
    description:
      "When allowed by law and with appropriate safeguards in place.",
  },
  {
    title: "Legal Requirements",
    description:
      "When required by law, court orders, or law enforcement requests.",
  },
  {
    title: "Organ Donation",
    description:
      "To support organ, eye, or tissue donation requests and coordination.",
  },
  {
    title: "Workers' Compensation",
    description: "For work-related injury or illness claims and processing.",
  },
];

export default function OurUsesSection() {
  return (
    <HIPAASection
      id="our-uses"
      title="Our Uses and Disclosures"
      Icon={Database}
    >
      <div className="space-y-6">
        <p className="text-muted-foreground">
          We typically use or share your health information for:
        </p>
        <div className="space-y-3">
          {usesList.map((item) => (
            <div
              key={item.title}
              className="border-l-4 border-primary p-4 bg-white shadow"
            >
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </HIPAASection>
  );
}
