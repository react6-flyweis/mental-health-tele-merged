import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/styled-accordion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

export default function FAQSection({ data }: any) {
  const faqs =
    data
      ?.filter((item: any) => item.showOnHomepage)
      ?.slice(0, 10)
      ?.sort(
        (a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
      ) || [];

  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="FAQs" className="mb-6" />

        <Accordion
          type="single"
          className="space-y-4"
          collapsible
          defaultValue="faq-1"
        >
          {faqs.map((item: any, i: number) => (
            <AccordionItem
              key={item._id}
              value={`faq-${i + 1}`}
              className={cn("shadow-lg rounded-md border", {
                "border-2 border-primary": i === 0,
                "bg-white": i !== 0,
              })}
            >
              <AccordionTrigger className="p-3">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="p-3 pt-0">
                <div className="text-sm text-muted-foreground">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
