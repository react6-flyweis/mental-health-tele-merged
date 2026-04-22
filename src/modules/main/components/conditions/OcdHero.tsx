import { CheckCircle, FileTextIcon, ShieldIcon, VideoIcon } from "lucide-react";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "react-router";

import ocdImg from "@/assets/conditions/ocd.png";

export default function OcdHero() {
  const features = [
    {
      id: "licensed",
      title: "State-licensed providers",
      icon: ShieldIcon,
    },
    {
      id: "video",
      title: "Secure video consultations",
      icon: VideoIcon,
    },
    {
      id: "plans",
      title: "Personalized care plans",
      icon: FileTextIcon,
    },
  ];

  return (
    <section className="py-10">
      <Container className="relative">
        <div className="absolute top-20 -scale-x-100 z-0 opacity-50 max-w-xs">
          <img
            src={bgPattern}
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute z-0 top-20 right-0 opacity-50 max-w-xs">
          <img
            src={bgPattern}
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* left: copy + CTAs */}
            <div className="md:col-span-6">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
                <span className="block text-primary">
                  Personalized <span className="text-slate-900">OCD</span>,
                  Available Online
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
                Connect with licensed professionals and receive an OCD treatment
                plan designed around your needs.
              </p>

              <div className="mt-4 max-w-xl text-sm text-muted-foreground">
                If obsessive thoughts or repetitive behaviors are affecting your
                daily life, expert help is available from the comfort of your
                home.
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link to="/onboarding">
                  <Button className="bg-gradient-primary h-10" size="lg">
                    Start your assessment!
                  </Button>
                </Link>

                <Button variant="outline" size="lg" className="h-10">
                  How it works
                </Button>
              </div>

              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {features.map((f) => (
                  <li key={f.id} className="flex items-start gap-1">
                    <div className="size-9 rounded-full bg-[#306A7A1A] text-primary flex items-center justify-center shrink-0 mt-1">
                      <f.icon className="size-5" />
                    </div>

                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {f.title}
                      </div>
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
                    src={ocdImg}
                    alt="Person using tele health video consultation"
                    width={940}
                    height={620}
                    className="object-cover w-full h-90 md:h-105"
                  />
                </div>

                <div className="absolute -left-10 -bottom-6 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E9FBF7] flex items-center justify-center text-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      500+ patients helped
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Join them today
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
