import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

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

const symptoms = [
  {
    title: "Trouble focusing",
    body: "Difficulty sustaining attention on tasks, frequent distractibility, and trouble following through on detailed work.",
  },
  {
    title: "Restlessness & impulsive behavior",
    body: "Feeling unusually restless or fidgety, interrupting others, and making quick decisions without thinking them through.",
  },
  {
    title: "Difficulty with organization",
    body: "Problems planning, prioritizing, and keeping track of tasks or personal items — missing deadlines or losing things is common.",
  },
  {
    title: "Overlap with anxiety or depression",
    body: "ADHD often co-occurs with anxiety or depression; symptoms can overlap and make diagnosis or treatment more complex.",
  },
];

export default function AdhdSymptomsSection({ data }: { data: any }) {
  return (
    <section className="py-16 bg-[#F9FAFB]">
      <Container>
        <SectionHeader
          title=""
          subtitle={data?.symptomsTitle ?? "Common ADHD symptoms in adults"}
          description={
            data?.symptomsDescription ??
            "These signs are common, and you're not alone. If they sound familiar, we can help."
          }
          className="mb-6"
        />

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" className="space-y-4" collapsible>
            {(data?.symptoms ?? symptoms).map((s: any, i: number) => (
              <AccordionItem
                key={s.text}
                value={`symptom-${i + 1}`}
                className="shadow-md bg-white border p-3 px-4 rounded-xl"
              >
                <AccordionTrigger>{s.text}</AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground">
                    {s.description ?? ""}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 flex justify-center">
            <Link to="/appointment?type=initial">
              <Button size="lg" className="bg-gradient-primary">
                Schedule First Visit
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
