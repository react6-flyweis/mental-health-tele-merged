import { Users } from "lucide-react";
import { HIPAASection } from "@/components/pages/HIPAASection";

const choicesList = [
  {
    title: "Communicating with family or friends involved in your care",
    description:
      "You can specify who we may speak with about your health status and treatment plans.",
  },
  {
    title: "Disaster relief coordination",
    description:
      "We may share limited information with relief organizations to help notify your loved ones in emergencies.",
  },
];

export default function YourChoicesSection() {
  return (
    <HIPAASection id="your-choices" title="Your Choices" Icon={Users}>
      <div className="space-y-6">
        <p className="text-muted-foreground">
          You may choose how we share your information in situations such as:
        </p>
        <div className="space-y-3">
          {choicesList.map((item) => (
            <div
              key={item.title}
              className=" p-4 bg-linear-to-r from-[#EFF6FF] to-white border border-[#DBEAFE] rounded-lg "
            >
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-[#FEFCE8] border border-[#FFF085] rounded-lg">
          <p className="text-sm">
            We will not use your information for marketing or sell it without
            your written permission.
          </p>
        </div>
      </div>
    </HIPAASection>
  );
}
