import { Pill, MessageCircle, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Link } from "react-router";

const features = [
  {
    id: 1,
    icon: Pill,
    title: "Medication support",
    desc: "When appropriate, we provide FDA-approved medications to help you manage symptoms effectively.",
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "Behavioral therapy",
    desc: "Learn practical techniques and coping strategies through structured sessions with trained specialists.",
  },
  {
    id: 3,
    icon: Heart,
    title: "Everyday habit improvements",
    desc: "Build sustainable routines around sleep, exercise, and nutrition that support long-term wellness.",
  },
];

export default function AnxietyTreatmentApproach() {
  return (
    <section className="py-12 bg-[#F9FAFB]">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="Our Anxiety"
            subtitle="treatment approach"
            description="Comprehensive care that addresses every aspect of your wellbeing."
            align="center"
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.id} className="rounded-xl bg-white p-5">
                <div className="w-11 h-11 rounded-xl bg-[#CBFBF1] text-primary flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-sm font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/onboarding?type=anxiety">
            <Button className="bg-gradient-primary h-10 w-44" size="lg">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
