import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Info } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

export default function DeaFAQSection({ data }: any) {
  const sorted =
    data?.sections
      ?.slice()
      ?.sort(
        (a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
      ) || [];

  const faqStartIndex = sorted.findIndex((s: any) =>
    s.heading?.includes("Frequently"),
  );

  const faqItems = sorted.slice(faqStartIndex + 2);

  return (
    <section className="py-16">
      <Container maxWidth="5xl">
        <SectionHeader
          title="Frequently Asked"
          subtitle="Questions"
          description={sorted?.[faqStartIndex + 1]?.heading}
          align="center"
          className="mb-8"
        />

        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item: any, idx: number) => (
            <AccordionItem
              className="border rounded-xl"
              key={idx}
              value={`faq-${idx}`}
            >
              <AccordionTrigger className="flex items-center p-3">
                <span className="mr-3 size-10 rounded-xl bg-gradient-primary text-white flex items-center justify-center">
                  <Info className="size-6" />
                </span>
                {item.heading}
              </AccordionTrigger>

              <AccordionContent className="p-3 pl-16 pt-0 text-sm text-muted-foreground">
                {item.body || ""}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
