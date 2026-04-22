import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Link } from "react-router";

export default function AnxietyFact() {
  const percent = 43.2;
  const r = 16; // circle radius in SVG viewBox coords
  const circumference = 2 * Math.PI * r;
  const dash = (percent / 100) * circumference;

  return (
    <section className="py-12">
      <Container className="text-center">
        <SectionHeader
          title="Anxiety Disorders Affect"
          subtitle="19.1% Of The US Population"
          description="32% of women and 25% of men have symptoms of anxiety disorder"
          className="max-w-4xl mx-auto flex flex-wrap"
        />

        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="relative">
            <svg
              viewBox="0 0 36 36"
              className="w-40 h-40 md:w-48 md:h-48"
              aria-hidden
            >
              <defs>
                <linearGradient id="anxietyFactGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#0F766E" />
                </linearGradient>
              </defs>

              {/* background ring (pale mint) */}
              <circle
                cx="18"
                cy="18"
                r="16"
                strokeWidth="4"
                className="stroke-teal-100"
                fill="none"
              />

              {/* progress ring (teal gradient) */}
              <circle
                cx="18"
                cy="18"
                r="16"
                strokeWidth="4"
                stroke="url(#anxietyFactGrad)"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${dash} ${circumference - dash}`}
                transform="rotate(-150 18 18)"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-3xl md:text-4xl font-semibold text-slate-900">
                {percent}%
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground max-w-2xl">
            Only {percent}% of people with GAD (generalized anxiety disorder)
            are receiving treatment
          </p>

          <p className="text-muted-foreground max-w-2xl text-center leading-relaxed">
            Anxiety disorders are treatable. Consult a healthcare expert today
            to learn how you can manage your symptoms effectively and lead a
            fulfilling life.
          </p>

          <Link to="/onboarding">
            <Button className="bg-gradient-primary h-10">
              Schedule A Consultation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
