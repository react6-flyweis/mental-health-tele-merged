import { Link } from "react-router";
import { ArrowRight, Clock, Sun, Coffee, Cloud, MoonIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Card } from "@/components/ui/card";

export default function InsomniaSymptoms() {
  const items = [
    {
      title: "Difficulty falling asleep",
      desc: "Taking a long time to drift off at bedtime",
      icon: Clock,
    },
    {
      title: "Waking frequently during the night",
      desc: "Multiple awakenings that disrupt rest",
      icon: MoonIcon,
    },
    {
      title: "Early morning waking",
      desc: "Waking up too early and unable to return to sleep",
      icon: Sun,
    },
    {
      title: "Feeling unrested after sleep",
      desc: "Not feeling refreshed despite time in bed",
      icon: Coffee,
    },
    {
      title: "Daytime fatigue or brain fog",
      desc: "Persistent tiredness and difficulty concentrating",
      icon: Cloud,
    },
  ];

  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          title="Common Symptoms"
          subtitle="Of Insomnia"
          description="Insomnia can look different for everyone, but common experiences include:"
          className="mb-8 mx-auto max-w-xl"
        />

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <Card
                key={it.title}
                className="p-4 flex-row gap-4 h-full hover:shadow-md transition-shadow"
              >
                <div className="size-10 rounded-full bg-[#CBFBF1] text-primary flex items-center justify-center shrink-0">
                  <Icon className="size-6" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">{it.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {it.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/appointment?type=initial">
            <Button size="lg" className="bg-gradient-primary h-10">
              Get Started Today
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
