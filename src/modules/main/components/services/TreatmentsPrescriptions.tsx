import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import handlePrescriptionImage from "@/assets/services/handle-prescription.png";

import { Container } from "@/components/ui/container";

import { Link } from "react-router";

export default function TreatmentsPrescriptions({ data }: { data?: any }) {
  const features = data?.bullets || [
    {
      id: 1,
      text: `Through our platform, you can consult with licensed medical professionals authorized to provide care in your state. Providers review your symptoms and medical background to determine the most appropriate treatment approach.`,
    },
    {
      id: 2,
      text: `When medication is part of your care plan, prescriptions are sent electronically to the pharmacy you choose, with clear guidance on usage and safety — all without leaving home.`,
    },
  ];

  const titleWords = (
    data?.title || "Handle Your Prescriptions Digitally, With Confidence"
  ).split(" ");
  const midIndex = Math.ceil(titleWords.length / 2);
  const title1 = titleWords.slice(0, midIndex).join(" ");
  const title2 = titleWords.slice(midIndex).join(" ");

  return (
    <section className="py-16 bg-[#f3faf8]">
      <Container>
        <div className="grid items-center md:grid-cols-2">
          <div className="relative">
            <div className="max-w-md mx-auto relative">
              {/* Top-right accent border */}
              <span className="absolute -top-1 -right-1 size-40 border-3 border-b-0 border-l-0  border-[#06bfae] rounded-tr-lg pointer-events-none hidden md:block" />
              {/* Bottom-left accent border */}
              <span className="absolute -bottom-1 -left-1 size-40 border-3 border-r-0 border-t-0 border-[#06bfae] rounded-bl-lg pointer-events-none hidden md:block" />

              <div className="p-1">
                <img
                  src={data?.imageUrl || handlePrescriptionImage}
                  alt="Handle Prescription"
                  className="w-full h-80 aspect-square object-cover rounded-md"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold leading-tight">
              <span className="block text-primary">{title1}</span>
              <span className="block text-slate-900 mt-1">{title2}</span>
            </h2>

            <div className="mt-6 space-y-4">
              {features.map((f: any, i: number) => (
                <div key={f.id || i} className="flex items-start gap-4">
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
              <Link to={data?.ctaUrl || "/onboarding"}>
                <Button className="bg-gradient-primary" size="lg">
                  {data?.ctaLabel || "Start Your Care"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
