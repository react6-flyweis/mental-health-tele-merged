import { ArrowRight } from "lucide-react";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Container } from "@/components/ui/container";

export default function RefillHero() {
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
          <div className="relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className=" text-4xl md:text-5xl font-medium tracking-tight leading-tight">
                <span className="block text-primary">Refill prescriptions</span>
                <span className="block text-primary font-medium">
                  online,{" "}
                  <span className="text-slate-900 font-medium">
                    {" "}
                    stress-free
                  </span>
                </span>
              </h1>

              <p className="mx-auto max-w-lg text-base md:text-lg text-muted-foreground leading-relaxed">
                Request medication renewals digitally and continue your care
                with confidence.
              </p>
            </div>

            <div className="mt-10 flex justify-center">
              <Link to="/onboarding">
                <Button className="bg-gradient-primary" size="lg">
                  Schedule an online visit
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
