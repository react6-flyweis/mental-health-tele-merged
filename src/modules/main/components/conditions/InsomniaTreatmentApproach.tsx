import { MoonStar, Heart, Pill, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Link } from "react-router";

const features = [
  {
    id: 1,
    icon: MoonStar,
    title: "Short-term sleep aids",
    desc: "When appropriate for temporary sleep difficulties",
  },
  {
    id: 2,
    icon: Heart,
    title: "Sleep-wake balance support",
    desc: "Medications that help regulate natural sleep cycles",
  },
  {
    id: 3,
    icon: Pill,
    title: "Hormone-related options",
    desc: "Sleep regulation approaches for specific needs",
  },
  {
    id: 4,
    icon: Leaf,
    title: "Non-treatments support",
    desc: "Evaluated on a case-by-case basis",
  },
];

export default function InsomniaTreatmentApproach() {
  return (
    <section className="py-6">
      <Container className="bg-[#F9FAFB] rounded-xl py-8">
        <div className="max-w-4xl mx-auto text-center ">
          <SectionHeader
            title="Medication & Treatment"
            subtitle="Approach"
            description="Behavioral therapy is often the first approach to treating insomnia. In some cases, medication may be recommended after a full evaluation. Providers consider your symptoms, sleep habits, and medical history before suggesting any treatment."
            className="max-w-xl mx-auto"
          />
        </div>

        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto">
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
          <Link to="/onboarding?type=insomnia">
            <Button className="bg-gradient-primary h-10 w-56" size="lg">
              Book an appointment
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
