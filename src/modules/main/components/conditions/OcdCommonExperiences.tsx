import { Brain, RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Card } from "@/components/ui/card";

export default function OcdCommonExperiences() {
  const experiences = [
    {
      title: "Obsessive thoughts may include:",
      items: [
        "Unwanted, intrusive thoughts or images",
        "Fear of harm, contamination, or mistakes",
        "Strong need for certainty or perfection",
      ],
      icon: Brain,
    },
    {
      title: "Compulsive behaviors may include:",
      items: [
        "Repeated checking or cleaning",
        "Counting, arranging, or mental rituals",
        "Actions done to reduce anxiety, even briefly",
      ],
      icon: RefreshCw,
    },
  ];

  return (
    <section className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="Common"
            subtitle="OCD Experiences"
            align="center"
          />
        </div>

        <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 mx-auto items-stretch">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <Card
                key={idx}
                className={`p-6 border bg-linear-to-br gap-0 ${
                  idx === 0
                    ? "from-[#F0FDFA] to-white border-primary"
                    : "from-[#F5F5F4] to-white border-[#E7E5E4]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`size-12 rounded-xl flex items-center justify-center ${
                      idx === 0 ? "bg-gradient-primary" : "bg-slate-700"
                    }`}
                  >
                    <Icon className="text-white size-6" />
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 mt-1">
                    {exp.title}
                  </h3>
                </div>

                <ul className="mt-4 space-y-3 pl-2">
                  {exp.items.map((it, i) => (
                    <li
                      key={i}
                      className="relative text-sm text-muted-foreground pl-6"
                    >
                      <span className="absolute left-0 top-1/2 w-2 h-2 bg-primary rounded-full -translate-y-1/2" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 bg-[#CBFBF1] p-4 text-center text-slate-900 ">
          Many people recognize these patterns but find them hard to control —
          professional care can help.
        </Card>
      </Container>
    </section>
  );
}
