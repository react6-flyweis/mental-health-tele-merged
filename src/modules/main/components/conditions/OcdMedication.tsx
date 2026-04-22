import { Pill, FileTextIcon, ShieldCheck, Shield } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Card } from "@/components/ui/card";
import medImg from "@/assets/conditions/medication-as-care.jpg";

const items = [
  {
    id: "serotonin",
    title: "Medications supporting serotonin balance",
    desc: "These are often used as a first-line approach to help manage OCD symptoms.",
    icon: Pill,
  },
  {
    id: "alternative",
    title: "Alternative options if initial treatment isn't effective",
    desc: "Your provider may explore other medications if the first approach doesn't provide sufficient relief.",
    icon: FileTextIcon,
  },
];

export default function OcdMedication() {
  return (
    <section className="py-12">
      <Container>
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 items-center">
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <div className="rounded-xl overflow-hidden shadow-lg max-w-md aspect-square">
              <img
                src={medImg}
                alt="Person practicing calming exercise"
                className="w-full h-full object-cover"
                priority={false}
              />
            </div>
          </div>

          <div className="max-w-xl order-1 md:order-2">
            <SectionHeader
              title="Medication As"
              subtitle="Part Of Care"
              description="In some cases, medication may support therapy by helping reduce symptom intensity. Decisions are made carefully based on your needs and response."
              align="left"
              className="max-w-md"
            />

            <div className="mt-6 space-y-4">
              {items.map((o) => {
                return (
                  <Card key={o.id} className="p-4 bg-white border">
                    <div className="flex gap-4">
                      <div>
                        <h4 className="text-sm text-slate-900 font-medium">
                          {o.title}
                        </h4>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {o.desc}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-6 p-5 border border-[#96F7E4] bg-[#CBFBF1] flex-row  gap-3">
              <div className="">
                <Shield className="size-6 text-primary" />
              </div>
              <div>
                Ongoing monitoring helps ensure treatment remains safe and
                effective.
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
