import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

export default function DepressionUnderstandSymptoms() {
  return (
    <section className="py-16 pb-0 bg-[#F4FAF9]">
      <Container>
        <SectionHeader
          title="Understand"
          subtitle="Your Symptoms"
          description={
            "A brief online assessment can help you reflect on your mood, energy, and daily experiences. It's a first step toward understanding whether professional support may help."
          }
          className="mb-6"
        />

        <div className="flex justify-center mt-6">
          <Link to="/onboarding?type=initial">
            <Button size="lg" className="bg-gradient-primary">
              Schedule First Visit
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
