import { Container } from "@/components/ui/container";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/modules/main/components/section-header";
import {
  Accessibility,
  ShieldCheck,
  Users,
  Heart,
  Rocket,
  Badge,
} from "lucide-react";

export default function StandForSection({ careers }: { careers: any }) {
  const items = [
    {
      id: "integrity",
      title: "Integrity & Openness",
      description:
        "We act with honesty and transparency in every decision we make.",
      icon: ShieldCheck,
    },
    {
      id: "accessibility",
      title: "Accessibility for All",
      description:
        "We ensure our services are accessible to everyone, regardless of background or ability.",
      icon: Accessibility,
    },
    {
      id: "respect",
      title: "Respect & Equality",
      description:
        "We honor diversity and treat every person with dignity and fairness.",
      icon: Users,
    },
    {
      id: "patient",
      title: "Patient-Centered Thinking",
      description:
        "Our decisions are always guided by what’s best for the people we serve.",
      icon: Heart,
    },
    {
      id: "innovation",
      title: "Innovation & Growth",
      description:
        "We continuously evolve through learning, creativity, and bold ideas.",
      icon: Rocket,
    },
    {
      id: "quality",
      title: "Quality & Responsibility",
      description:
        "We hold ourselves accountable to the highest standards in care and operations.",
      icon: Badge,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted">
      <Container>
        <SectionHeader
          title={careers?.valuesTitle || "What We"}
          subtitle={""}
          description={careers?.valuesSubtitle || ""}
        />

        <Accordion
          type="single"
          collapsible
          className="mt-8 space-y-3 max-w-3xl mx-auto"
        >
          {careers?.values?.map((item: any, idx: number) => (
            <AccordionItem
              className="p-3 py-2 bg-white rounded-xl shadow"
              value={idx.toString()}
              key={idx.toString()}
            >
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <div className="size-10 flex items-center justify-center bg-gradient-primary rounded-xl">
                    {item.icon}
                  </div>
                  <span className="font-semibold">{item.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-13">
                {item.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
