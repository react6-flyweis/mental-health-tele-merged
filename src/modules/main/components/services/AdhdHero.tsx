import { CheckCircle } from "lucide-react";
import adhdImg from "@/assets/landing/hero/adhd.png";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "react-router";

export default function AdhdHero({ data }: any) {
  const features = [
    "Licensed medical professionals",
    "Flexible online visits",
    "Digital prescriptions when appropriate",
  ];

  return (
    <section className="py-10">
      <Container className="relative">
        <div className="absolute top-20 -scale-x-100 z-0 opacity-50 max-w-xs">
          <img
            src={bgPattern}
            alt="Background pattern"
            className="w-full h-full object-cover"
            width={100}
            height={100}
          />
        </div>

        <div className="absolute z-0 top-20 right-0 opacity-50 max-w-xs">
          <img
            src={data?.heroImageUrl ?? bgPattern}
            alt="Background pattern"
            className="w-full h-full object-cover"
            width={100}
            height={100}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* left: copy + CTAs */}
            <div className="md:col-span-6">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
                <span className="block text-primary">
                  {data?.heroTitle ?? ""}
                </span>
                {/* <span className="block text-primary">
                  Care <span className="text-slate-900">100% Online</span>
                </span> */}
              </h1>

              <p className="mt-4 max-w-xl  text-muted-foreground leading-relaxed">
                {data?.heroSubtitle ??
                  "Connect With Licensed Professionals And Receive A Personalized ADHD Treatment Plan From The Comfort Of Your Home."}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link to={data?.heroCTAUrl ?? "/onboarding"}>
                  <Button className="bg-gradient-primary" size="lg">
                    <Link to={data?.heroCTAUrl ?? "/onboarding"}>
                      {data?.heroCTALabel}
                    </Link>
                  </Button>
                </Link>

                <Button variant="outline" size="lg" asChild>
                  <Link to={data?.heroSecondaryCtaUrl ?? "/onboarding"}>
                    {data?.heroSecondaryCtaLabel}
                  </Link>
                </Button>
              </div>

              <ul className="mt-8 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <CheckCircle className="size-5 text-green-500" />
                    <div className="text-sm font-semibold text-slate-900">
                      {f}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* right: image card + badge */}
            <div className="md:col-span-6 flex justify-center md:justify-end">
              <div className="relative w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={adhdImg}
                    alt="Patient and provider discussion"
                    width={940}
                    height={620}
                    className="object-cover w-full aspect-square"
                  />
                </div>

                <div className="absolute -left-10 -bottom-6 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {data?.heroStatValue ?? "500+ patients helped"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {data?.heroStatLabel ?? "Join them today"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
