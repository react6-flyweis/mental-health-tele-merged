import { Activity, Cloud, Calendar, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Card } from "@/components/ui/card";

export default function DepressionConditionsSupport() {
  const conditions = [
    {
      title: "Major Depressive Disorder",
      desc: "Persistent feelings of sadness, or hopelessness that affect daily functioning and quality of life.",
      icon: Activity,
    },
    {
      title: "Seasonal Mood Changes",
      desc: "Shifts in mood and energy that occur during specific times of year, often in fall and winter months.",
      icon: Cloud,
    },
    {
      title: "Long-Term Low Mood",
      desc: "Chronic feelings of sadness or discouragement that persist for extended periods, affecting overall wellbeing.",
      icon: Calendar,
    },
    {
      title: "Postpartum Depression",
      desc: "Mood challenges following childbirth that go beyond typical adjustment, affecting parents and family bonds.",
      icon: Heart,
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="Conditions"
            subtitle="We Can Support"
            description="Our providers specialize in various forms of depression and mood concerns"
            align="center"
          />
        </div>

        <div className="mt-8 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {conditions.map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.title} className="p-5 gap-0">
                <div className="w-10 h-10 rounded-xl bg-[#407B7F1A] text-primary flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                <h4 className="text-sm font-semibold text-slate-900">
                  {c.title}
                </h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {c.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
