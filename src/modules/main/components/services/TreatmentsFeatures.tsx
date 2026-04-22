import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const features = [
  {
    title: "Care Through Secure Video Sessions",
    desc: "Consult Licensed Providers Through Online Video Visits. No Travel, No Waiting Rooms.",
  },
  {
    title: "Appointments That Fit Your Routine",
    desc: "Choose Visit Times That Work Around Your Schedule, Including Evenings And Weekends.",
  },
  {
    title: "Treatment Guided By Clinical Research",
    desc: "Care Plans Are Based On Proven Medical Practices And Tailored To Your Condition.",
  },
  {
    title: "Quality Care At Fair Pricing",
    desc: "Access Professional Mental Health Services Without The High Costs Of Traditional Clinics.",
  },
  {
    title: "Online Prescriptions Made Convenient",
    desc: "When Appropriate, Providers Can Issue New Prescriptions Or Continue Existing Ones Digitally.",
  },
  {
    title: "Support Whenever You Need It",
    desc: "Our Care Team Is Available To Assist You Throughout Your Treatment Journey.",
  },
];

import { Link } from "react-router";
export default function TreatmentsFeatures({ data }: { data?: any }) {
  const cards = data?.whyPlatformCards || features;
  const titleWords = (data?.whyPlatformTitle || "Why People Prefer Our Platform").split(" ");
  const firstPart = titleWords.slice(0, 3).join(" ");
  const secondPart = titleWords.slice(3).join(" ");

  return (
    <section className="py-12">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
            <span className="block">
              <span className="text-gradient bg-gradient-primary">
                {firstPart}{" "}
              </span>
              <span className="font-semibold">{secondPart}</span>
            </span>
          </h2>
          {data?.whyPlatformCtaLabel && (
            <Link to={data?.whyPlatformCtaUrl || "/onboarding"}>
              <Button className="bg-gradient-primary" size="lg">
                {data.whyPlatformCtaLabel}
              </Button>
            </Link>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          {cards.map((f: any) => (
            <div
              key={f.title}
              className="bg-[#21958008] border rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-2 bg-gradient-primary rounded-md relative">
                  <ShieldCheck className="w-5 h-5 text-white fill-current" />
                  <Check className="size-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {f.description || f.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
