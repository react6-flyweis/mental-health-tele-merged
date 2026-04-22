import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { cn } from "@/lib/utils";

const items = [
  {
    id: "antidepressant-options",
    title: "Antidepressant options",
    description:
      "SSRIs and SNRIs are commonly prescribed for ongoing anxiety management. These medications work by regulating brain chemistry and typically take several weeks to show full effect.",
  },
  {
    id: "short-term-relief",
    title: "Short-term anxiety relief medications",
    description:
      "Short-term medications can reduce acute symptoms quickly; providers use them selectively because of side-effect and dependence risks and usually for brief periods.",
  },
  {
    id: "non-medication-alternatives",
    title: "Non-medication alternatives",
    description:
      "Therapies such as CBT, mindfulness, sleep and exercise improvements, and other behavioral approaches can be effective alone or together with medication.",
  },
  {
    id: "professional-guidance",
    title: "Importance of professional guidance",
    description:
      "Medication decisions are individualized — your provider will review history, coexisting conditions, and treatment goals, then monitor response and adjust therapy as needed.",
  },
];

export default function AnxietyTreatmentManagement() {
  return (
    <section className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="Treatments Management"
            subtitle="for Anxiety"
            description="Medication decisions are made carefully and individually, based on your evaluation and progress."
            align="center"
          />
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
            defaultValue="antidepressant-options"
          >
            {items.map((it) => (
              <AccordionItem
                key={it.id}
                value={it.id}
                className="bg-[#F9FAFB] rounded-xl p-4"
              >
                <AccordionTrigger className=" font-medium">
                  {it.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground">
                    {it.description}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 flex justify-center">
            <Link to="/onboarding?type=anxiety">
              <Button size="lg" className="bg-gradient-primary h-10 w-44">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
