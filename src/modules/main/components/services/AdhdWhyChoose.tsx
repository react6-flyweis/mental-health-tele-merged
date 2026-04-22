import {
  Award,
  DollarSign,
  FlaskConical,
  Pill,
  Headphones,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Link } from "react-router";
const iconMap: any = {
  Award,
  DollarSign,
  FlaskConical,
  Pill,
  Headphones,
};
export default function AdhdWhyChoose({ data }: { data?: any }) {
  const features = [
    {
      id: 1,
      icon: Award,
      title: "Expert-led care",
      desc: "Work with board-certified providers who specialize in adult ADHD and understand your unique needs.",
    },
    {
      id: 2,
      icon: DollarSign,
      title: "Transparent pricing",
      desc: "Know exactly what you'll pay upfront. No hidden fees, no surprise bills, just honest healthcare.",
    },
    {
      id: 3,
      icon: FlaskConical,
      title: "Science-backed approach",
      desc: "Every treatment plan is rooted in proven research and tailored to help you thrive in daily life.",
    },
    {
      id: 4,
      icon: Pill,
      title: "Digital medication support",
      desc: "Manage prescriptions easily with electronic delivery to your preferred pharmacy, all in one place.",
    },
    {
      id: 5,
      icon: Headphones,
      title: "Always-on assistance",
      desc: "Get answers when you need them. Our support team is here to help you navigate your care journey.",
    },
  ];

  return (
    <section className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title={data?.whyChooseTitle ?? "Why Choose"}
            subtitle={data?.whyChooseSubtitle ?? " Our Platform"}
            description={
              data?.whyChooseDescription ??
              "Healthcare designed around your life, delivered with compassion and expertise."
            }
            align="center"
          />
        </div>

        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {(data?.whyChooseCards?.length ? data.whyChooseCards : features).map(
            (f: any, idx: any) => {
              const Icon =
                f.icon && typeof f.icon === "function"
                  ? f.icon
                  : (features[idx]?.icon ?? Calendar);

              return (
                <div key={f.id} className="rounded-2xl bg-[#F9FAFB] p-5">
                  <div className="w-11 h-11 rounded-xl bg-[#CBFBF1] text-primary flex items-center justify-center mb-4">
                    {Icon && <Icon />}
                  </div>

                  <h3 className=" text-slate-900">{f.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              );
            },
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/onboarding?type=adhd">
            <Button className="bg-gradient-primary h-10 w-60" size="lg">
              Schedule A Consultation
              <ArrowRight className="" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
