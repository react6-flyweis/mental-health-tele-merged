import { ArrowRight } from "lucide-react";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Container } from "@/components/ui/container";

export default function WorkExcuseHero() {
  return (
    <section className="py-10">
      <Container>
        <div className="py-10 bg-accent rounded-2xl relative overflow-hidden">
          <div className="absolute -top-5 -scale-x-100 z-0 opacity-50 max-w-xs">
            <img
              src={bgPattern}
              alt="Background pattern"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute z-0 -top-5 right-0 opacity-50 max-w-xs">
            <img
              src={bgPattern}
              alt="Background pattern"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className=" text-4xl md:text-5xl font-medium tracking-tight leading-tight">
                <span className="block text-primary">
                  Get Your Work Excuse Letter
                </span>
                <span className="block text-primary font-medium">
                  <span className="text-slate-900 font-medium">Online</span>
                  <span> With Professional Guidance</span>
                </span>
              </h1>

              <p className="mx-auto max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
                You don&apos;t have to manage emotional challenges on your own —
                emotional well-being matters. If an animal plays an important
                role in your mental health, you may be eligible for an Emotional
                Support Animal (ESA) letter issued by a licensed healthcare
                provider.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <Link to="/onboarding">
                <Button className="bg-gradient-primary" size="lg">
                  Schedule An Online Visit
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
