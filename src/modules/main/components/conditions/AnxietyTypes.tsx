import {
  Brain,
  Users,
  AlertCircle,
  ShieldCheck,
  Baby,
  Target,
  Activity,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

export default function AnxietyTypes() {
  const types = [
    {
      title: "Generalized anxiety",
      desc: "Persistent worry about everyday matters that feels difficult to control",
      icon: Brain,
    },
    {
      title: "Social anxiety",
      desc: "Intense discomfort or fear in social situations and interactions",
      icon: Users,
    },
    {
      title: "Panic disorder",
      desc: "Sudden episodes of overwhelming fear accompanied by physical symptoms",
      icon: AlertCircle,
    },
    {
      title: "PTSD",
      desc: "Anxiety following a traumatic event, often with flashbacks or avoidance",
      icon: ShieldCheck,
    },
    {
      title: "Postpartum anxiety",
      desc: "Excessive worry and fear that emerges after childbirth",
      icon: Baby,
    },
    {
      title: "Performance anxiety",
      desc: "Fear of judgment during activities like speaking or performing",
      icon: Target,
    },
    {
      title: "Health-related anxiety",
      desc: "Ongoing concern about physical health or potential illness",
      icon: Activity,
    },
  ];

  return (
    <section className="py-16 ">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="Major Types"
            subtitle="Of Anxiety"
            description="Anxiety presents itself in many forms. Recognizing your experience is the first step toward effective care."
            align="center"
          />
        </div>

        <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {types.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.title} className="rounded-xl p-5 bg-[#F9FAFB]">
                <div className="w-10 h-10 rounded-xl bg-[#CBFBF1] text-primary flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                <h4 className="text-sm font-semibold text-slate-900">
                  {t.title}
                </h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {t.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
