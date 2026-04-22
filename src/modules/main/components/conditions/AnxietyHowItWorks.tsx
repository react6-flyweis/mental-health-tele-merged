import { UserPlus, Video, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

const steps = [
  {
    id: 1,
    icon: UserPlus,
    title: "Get started online",
    description: "Create an account and choose a time that works for you.",
  },
  {
    id: 2,
    icon: Video,
    title: "Meet your provider",
    description:
      "Discuss your symptoms and health history during a secure video visit.",
  },
  {
    id: 3,
    icon: HeartHandshake,
    title: "Ongoing care",
    description:
      "Receive a personalized plan with follow-ups to track progress and adjust treatment if needed.",
  },
];

export default function AnxietyHowItWorks() {
  return (
    <section className="py-16 bg-[#F4FAF9]">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="How It"
            subtitle="works"
            description="Our simple process to getting the anxiety care you deserve."
            className="mb-10"
          />
        </div>

        <div className="max-w-6xl mx-auto mt-8 grid gap-6 grid-cols-1 md:grid-cols-3">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.id}>
                <div className="rounded-2xl bg-white border border-slate-100 p-6 h-full shadow-sm relative overflow-hidden">
                  {/* Large faint number in the top-right (behind content) */}
                  <div className="absolute right-6 top-6 text-4xl font-medium text-slate-100/60 pointer-events-none select-none">
                    {String(s.id).padStart(2, "0")}
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#CBFBF1] text-primary flex items-center justify-center mb-4 relative z-10">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-medium text-slate-900 relative z-10">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed relative z-10">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
