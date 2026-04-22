import { Brain, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

import brainIcon from "@/assets/icons/brain.svg";

export default function AnxietyWhatIs() {
  return (
    <section className="bg-[#F4FAF9]">
      <Container className="py-8">
        <div className="max-w-6xl mx-auto  flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center py-4 gap-4 md:gap-6">
            <div className="size-12 rounded-full bg-[#CBFBF1] text-primary flex items-center justify-center shrink-0">
              <img src={brainIcon} alt="Brain Icon" className="size-6" />
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                <span className="text-primary">What</span>
                is Anxiety?
              </h2>
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <Link to="/onboarding">
              <Button className="bg-gradient-primary" size="lg">
                Schedule An Online Visit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        <p className="mt-2 text-sm  max-w-xl leading-relaxed">
          Anxiety is a natural response to stress, but when it becomes constant
          or intense, it can affect daily life and well‑being.
        </p>
      </Container>
    </section>
  );
}
