import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/modules/main/components/section-header";

import { Container } from "@/components/ui/container";

import treatmentRenewalImage from "@/assets/services/treatment-renewal.png";
import arrowIcon from "@/assets/icons/arrow-curve.svg";
import bulbIcon from "@/assets/icons/bulb.svg";

const steps = [
  {
    title: "Choose a suitable time",
    description:
      "Select a convenient appointment slot and get connected with a licensed healthcare professional.",
  },
  {
    title: "Consult with a provider",
    description:
      "Review your medical background and current medication during a secure online consultation.",
  },
  {
    title: "Receive your renewal",
    description:
      "If appropriate, your provider will approve and issue a medication renewal digitally.",
  },
];

const features = [
  {
    id: 1,
    text: `When a healthcare provider prescribes medication, it’s issued for a specific amount and duration. As your supply runs low or reaches its end, a renewal is needed to continue treatment safely.`,
  },
  {
    id: 2,
    text: `Treatments renewals allow you to request an additional supply of your medication once the original treatments has been used. If no refills remain, a provider may review your treatment and issue a new treatments through an online consultation.`,
  },
];
export default function TreatmentRenewal() {
  return (
    <>
      <section className="py-16">
        <Container>
          <div className="grid items-center md:grid-cols-2">
            <div className="relative">
              <div className="md:max-w-sm mx-auto relative">
                {/* Top-right accent border */}
                <span className="absolute -top-1 -right-1 size-40 border-3 border-b-0 border-l-0  border-[#06bfae] rounded-tr-lg pointer-events-none hidden md:block" />
                {/* Bottom-left accent border */}
                <span className="absolute -bottom-1 -left-1 size-40 border-3 border-r-0 border-t-0 border-primary rounded-bl-lg pointer-events-none hidden md:block" />

                <div className="p-1">
                  <img
                    src={treatmentRenewalImage}
                    alt="Treatment Renewal"
                    className="w-full aspect-square object-cover rounded-md"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-semibold leading-tight">
                <span className="block text-primary">
                  Understanding treatments
                </span>
                <span className="block text-slate-900">renewals</span>
              </h2>

              <div className="mt-6 space-y-4">
                {features.map((f) => (
                  <div key={f.id} className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="size-6 rounded-full bg-gradient-primary text-white flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {f.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button className="bg-gradient-primary" size="lg">
                  Schedule a consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <SectionHeader
              title="Getting Treatments"
              subtitle="Online Is Simple"
            />
          </div>

          <div className="relative">
            <div className="grid gap-8 md:grid-cols-3 items-start">
              {steps.map((step) => (
                <div key={step.title} className="text-center px-4">
                  <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-lg bg-gradient-primary text-white mb-4">
                    <img src={bulbIcon} alt="Bulb" width={40} height={40} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="hidden md:block pointer-events-none">
              {steps.slice(0, -1).map((_, i) => (
                <img
                  key={i}
                  src={arrowIcon}
                  alt="Arrow"
                  width={160}
                  height={40}
                  className="absolute top-10 transform -translate-y-1/2"
                  style={{ left: `${((i + 1) / steps.length) * 100 - 8}%` }}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
