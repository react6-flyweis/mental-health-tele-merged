import {
  FileText,
  Mail,
  Lock,
  Database,
  Bell,
  Shield,
  Users,
} from "lucide-react";
import { HIPAASection } from "@/components/pages/HIPAASection";

export const rightsList = [
  {
    Icon: FileText,
    title: "View or receive a copy of your medical records",
    description:
      "Access your complete health information whenever you need it.",
  },
  {
    Icon: FileText,
    title: "Ask us to correct inaccurate information",
    description:
      "Request amendments to any information you believe is incorrect.",
  },
  {
    Icon: Mail,
    title: "Request private communication in a specific way or location",
    description:
      "Choose how and where we contact you about your health information.",
  },
  {
    Icon: Lock,
    title: "Ask us to limit what we share",
    description:
      "Request restrictions on how your information is used or disclosed.",
  },
  {
    Icon: Database,
    title: "Receive a list of disclosures made in the past",
    description:
      "Get a detailed accounting of when and why we shared your information.",
  },
  {
    Icon: FileText,
    title: "Get a paper or digital copy of this notice",
    description: "Receive this privacy notice in your preferred format.",
  },
  {
    Icon: Users,
    title: "Appoint someone to act on your behalf",
    description:
      "Designate a personal representative to manage your health information.",
  },
  {
    Icon: Bell,
    title: "File a complaint if you believe your privacy rights were violated",
    description: "Report any concerns about how your information was handled.",
  },
];

export default function YourRightsSection() {
  return (
    <HIPAASection id="your-rights" title="Your Rights" Icon={Shield}>
      <div className="space-y-6">
        <p className="text-muted-foreground">You have the right to:</p>
        <div className="space-y-3">
          {rightsList.map((item) => (
            <div
              key={item.title}
              className="flex items-start p-4 bg-white rounded-lg shadow-sm"
            >
              <item.Icon className="size-5 text-primary mt-1" />
              <div className="ml-3">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HIPAASection>
  );
}
