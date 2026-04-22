import {
  GraduationCap,
  DollarSign,
  Pill,
  MessageCircle,
  UserCog,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

export default function AnxietyWhyChoose() {
  const features = [
    {
      id: 1,
      icon: GraduationCap,
      title: "Experienced mental health clinicians",
      desc: "Work with licensed professionals who specialize in anxiety treatment",
    },
    {
      id: 2,
      icon: DollarSign,
      title: "Affordable and transparent care",
      desc: "Clear pricing with no hidden fees or surprise costs",
    },
    {
      id: 3,
      icon: UserCog,
      title: "Personalized treatment plans",
      desc: "Every care plan is tailored to your unique needs and goals",
    },
    {
      id: 4,
      icon: Pill,
      title: "Digital treatments support",
      desc: "Access medications when clinically appropriate, sent directly to pharmacy",
    },
    {
      id: 5,
      icon: MessageCircle,
      title: "Clear communication & updates",
      desc: "Stay informed throughout your treatment journey with ongoing support",
    },
  ];

  return (
    <section className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="Why"
            subtitle="Choose Us"
            description="Quality care designed around your needs and lifestyle"
            align="center"
          />
        </div>
        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.id} className="rounded-2xl bg-[#F9FAFB] p-5">
                <div className="w-11 h-11 rounded-xl bg-[#CBFBF1] text-primary flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className=" text-slate-900">{f.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
