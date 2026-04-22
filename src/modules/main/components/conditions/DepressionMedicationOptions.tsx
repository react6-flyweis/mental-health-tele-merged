import { Activity, Pill, FileTextIcon, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Card } from "@/components/ui/card";

export default function DepressionMedicationOptions() {
  const options = [
    {
      id: "common",
      title: "Commonly Prescribed Antidepressants",
      desc: "First-line medications often recommended for their effectiveness and established safety profiles.",
      icon: Pill,
    },
    {
      id: "snri",
      title: "Serotonin & Norepinephrine Options",
      desc: "Medications that work on multiple brain chemical systems, helpful for various symptom patterns.",
      icon: Activity,
    },
    {
      id: "atypical",
      title: "Alternative or Atypical Medications",
      desc: "Newer or different approaches that may be chosen based on individual needs and responses.",
      icon: FileTextIcon,
    },
    {
      id: "older",
      title: "Older or Less Frequently Used Options",
      desc: "Earlier medications that may still be appropriate in certain circumstances with careful monitoring.",
      icon: Clock,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-[#2195800D]">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="Understanding"
            subtitle="Medication Options"
            description={
              "When medication is recommended, your provider will explain available options and help you choose what fits your situation best."
            }
            align="center"
          />
        </div>

        <div className="mt-8 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {options.map((o) => {
            const Icon = o.icon;
            return (
              <Card key={o.id} className="p-5 gap-0 bg-[#E9F4F2]">
                <div className="flex gap-4">
                  <div className="size-12 shrink-0 rounded-xl bg-white text-primary flex items-center justify-center mb-4">
                    <Icon className="size-6" />
                  </div>

                  <div className="">
                    <h4 className=" text-base text-slate-900">{o.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {o.desc}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 ">
          <div className="mt-6 p-3 py-5  text-sm text-muted-foreground rounded-xl bg-[#E9F4F2] border  text-center">
            <strong>Educational focus:</strong> We prioritize helping you
            understand your options, not promoting specific brands.
          </div>
        </div>
      </Container>
    </section>
  );
}
