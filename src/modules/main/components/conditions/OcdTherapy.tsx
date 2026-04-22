import { Check, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import evidenceImg from "@/assets/conditions/evidence-therapy.png";

const bullets = [
  "Understand thought patterns and their origins",
  "Reduce compulsive behaviors gradually and safely",
  "Develop practical coping strategies over time",
  "Build resilience and confidence in managing symptoms",
];

export default function OcdTherapy() {
  return (
    <section className="py-12">
      <Container>
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 items-center">
          <div className="max-w-xl">
            <SectionHeader
              title="Evidence-Based"
              subtitle="Therapy"
              description="Therapy is a core part of OCD treatment. Common approaches help you understand thought patterns, reduce compulsive behaviors, and develop practical coping strategies over time."
              align="left"
            />

            <ul className="mt-6 space-y-4">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <div className="size-6 rounded-full bg-gradient-primary/10 text-primary flex items-center justify-center mt-1">
                    <CheckCircle className="size-5" />
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {b}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-lg border border-[#96F7E4] bg-[#F0FDFA] px-4 py-3 text-sm text-muted-foreground ">
              Treatment is collaborative and progresses at a pace that feels
              manageable to you.
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="rounded-xl overflow-hidden shadow-lg max-w-md aspect-square">
              <img
                src={evidenceImg}
                alt="Therapist talking with patient"
                className="w-full h-full object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
