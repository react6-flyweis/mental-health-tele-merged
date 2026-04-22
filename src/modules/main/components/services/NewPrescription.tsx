import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import handlePrescriptionImage from "@/assets/services/handle-prescription.png";

const bullets = [
  {
    id: 1,
    text: `Certain medications, such as stimulants or anxiety-related drugs, require a more detailed medical review.`,
  },
  {
    id: 2,
    text: `Strong pain medications are not renewed through this service.`,
  },
  {
    id: 3,
    text: `If a long period has passed since your last prescription, a full consultation may be needed to reassess your treatment.`,
  },
];

export default function NewPrescription() {
  return (
    <section className="py-16">
      <Container maxWidth="6xl">
        <div className="grid items-center md:grid-cols-2 gap-8">
          <div className="relative">
            <div className="md:max-w-sm mx-auto relative">
              {/* Top-right accent border */}
              <span className="absolute -top-1 -right-1 size-40 border-3 border-b-0 border-l-0  border-[#06bfae] rounded-tr-lg pointer-events-none hidden md:block" />
              {/* Bottom-left accent border */}
              <span className="absolute -bottom-1 -left-1 size-40 border-3 border-r-0 border-t-0 border-primary rounded-bl-lg pointer-events-none hidden md:block" />

              <div className="p-2 rounded-lg bg-white border-2 border-[#9ee1d6] shadow-sm relative z-10">
                <img
                  src={handlePrescriptionImage}
                  alt="New prescription"
                  className="w-full h-80 aspect-square object-cover rounded-md"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold leading-tight">
              <span className="block text-primary">
                Is It Possible To Receive A
              </span>
              <span className="block text-slate-900">New Prescription?</span>
            </h2>

            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              Whether a new prescription can be issued depends on several
              important factors, including your current health condition, the
              type of medication involved, and local medical regulations. Every
              request is carefully reviewed on an individual basis by a licensed
              provider.
            </p>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              During your appointment, you can discuss your progress, symptoms,
              and any concerns. Based on this evaluation, your provider may
              adjust your treatment plan or determine if a new prescription is
              appropriate.
            </p>

            <div className="mt-6">
              <Button className="bg-gradient-primary" size="lg">
                Schedule A Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 space-y-3">
          {bullets.map((b) => (
            <div key={b.id} className="flex items-center gap-4">
              <div className="shrink-0">
                <div className="size-6 rounded-full bg-gradient-primary text-white flex items-center justify-center mt-1">
                  <Check className="w-4 h-4" />
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
