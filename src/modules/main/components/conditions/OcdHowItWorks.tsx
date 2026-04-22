import { UserPlus, Video, Clipboard, RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

const steps = [
  {
    id: 1,
    icon: UserPlus,
    title: "Create your account",
    description:
      "Sign up in minutes and share a bit about what brings you here today.",
  },
  {
    id: 2,
    icon: Video,
    title: "Meet your provider online",
    description:
      "Join a secure video session with a licensed professional who gets it.",
  },
  {
    id: 3,
    icon: Clipboard,
    title: "Get a personalized plan",
    description:
      "Receive a care strategy built specifically for your goals and lifestyle.",
  },
  {
    id: 4,
    icon: RefreshCw,
    title: "Ongoing check-ins & adjustments",
    description:
      "Stay connected with regular follow-ups to track progress and refine your treatment.",
  },
];

export default function OcdHowItWorks() {
  return (
    <section className="py-16 bg-[#F4FAF9]">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="How It"
            subtitle="works"
            description="Four simple steps to getting the OCD care you deserve."
            className="mb-10"
          />
        </div>

        <div className="max-w-6xl mx-auto mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className="relative">
                {/* numbered badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-white shadow-lg flex items-center justify-center font-semibold">
                  {s.id}
                </div>

                <div className="rounded-2xl bg-white border border-slate-100 p-6 h-full shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#CBFBF1] text-primary flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-medium text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
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
