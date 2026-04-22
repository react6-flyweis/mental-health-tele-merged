import { Brain, Heart, ShieldIcon, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Link } from "react-router";
import { Card } from "@/components/ui/card";

import sleepQualityImg from "@/assets/conditions/sleep-quality.png";

export default function InsomniaWhyEssential() {
  const benefits = [
    {
      id: 1,
      icon: Brain,
      title: "Mental Clarity",
      desc: "Poor sleep affects focus, memory, and decision-making abilities",
    },
    {
      id: 2,
      icon: Zap,
      title: "Energy Levels",
      desc: "Inadequate rest leads to persistent fatigue and reduced productivity",
    },
    {
      id: 3,
      icon: Heart,
      title: "Emotional Health",
      desc: "Sleep problems can increase stress, irritability, and mood changes",
    },
    {
      id: 4,
      icon: ShieldIcon,
      title: "Overall Wellness",
      desc: "Chronic sleep issues may impact long-term physical health",
    },
  ];

  return (
    <section className="py-16">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            title="Why Quality Sleep"
            subtitle="Is Essential"
            description="Ongoing sleep problems can affect focus, mood, energy levels, and overall health. Over time, poor sleep may also increase stress and impact daily performance."
            align="center"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8  max-w-6xl mx-auto">
          <div className="md:col-span-6 space-y-4">
            <div className="space-y-3">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.id}
                    className="flex items-start gap-4 rounded-xl bg-[#F8FBF9] p-4 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#CBFBF1] text-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {b.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {b.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <Card className=" bg-emerald-50 text-primary p-4">
                Evidence-based care can help restore healthier sleep patterns.
              </Card>

              <div className="mt-6">
                <Link to="/onboarding?type=insomnia">
                  <Button className="bg-gradient-primary" size="lg">
                    Get professional support
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 flex  md:justify-end">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl aspect-square">
              <img
                src={sleepQualityImg}
                alt="Person waking up refreshed"
                width={720}
                height={480}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
