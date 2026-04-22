import { Link } from "react-router";
import {
  Users,
  Brain,
  Heart,
  Activity,
  ShieldCheck,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Card } from "@/components/ui/card";

export default function OcdContributors() {
  const items = [
    {
      title: "Family history",
      desc: "OCD can appear more often in some families",
      icon: Users,
    },
    {
      title: "Brain chemistry",
      desc: "Differences in certain neurotransmitters may play a role",
      icon: Brain,
    },
    {
      title: "Life experiences",
      desc: "Stressful or traumatic events can trigger symptoms",
      icon: Heart,
    },
    {
      title: "Brain function",
      desc: "Certain brain circuits may process risk and uncertainty differently",
      icon: Activity,
    },
    {
      title: "Immune & health factors",
      desc: "In rare cases, infections or immune responses are involved",
      icon: ShieldCheck,
    },
    {
      title: "Personality traits",
      desc: "High responsibility or perfectionism may influence symptoms",
      icon: UserCheck,
    },
  ];

  return (
    <section className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="What May Contribute"
            subtitle="To OCD"
            description="OCD does not have a single cause. It is often linked to a combination of biological, psychological, and environmental factors."
            align="center"
          />
        </div>

        <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <Card key={it.title} className="p-5  gap-0">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary text-white flex items-center justify-center mb-4">
                  <Icon className="size-6" />
                </div>

                <h4 className="text-sm font-semibold text-slate-900">
                  {it.title}
                </h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {it.desc}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/appointment">
            <Button size="lg" className="bg-gradient-primary">
              Get Help Online
              <ArrowRight />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
