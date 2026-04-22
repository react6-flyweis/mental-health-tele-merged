import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

import prescribingLimitsImage from "@/assets/services/prescribing-limits.png";

import { Link } from "react-router";

export default function PrescribingLimits({ data }: { data?: any }) {
  const features = data?.bullets || [
    {
      id: 1,
      text: `Prescribing rules differ across states and are especially strict for certain medications that require additional safety checks and documentation. These regulations exist to protect patients and ensure responsible use.`,
    },
    {
      id: 2,
      text: `Some medications are more closely monitored due to their potential risks. For this reason, not every medication request can be fulfilled online, and approval always depends on medical necessity, patient history, and local laws.`,
    },
  ];

  const titleWords = (
    data?.title || "Understanding medication prescribing limits"
  ).split(" ");
  const midIndex = Math.ceil(titleWords.length / 2);
  const title1 = titleWords.slice(0, midIndex).join(" ");
  const title2 = titleWords.slice(midIndex).join(" ");

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="grid items-center md:grid-cols-2">
          <div className="relative">
            <div className="max-w-md mx-auto relative">
              {/* Top-right accent border */}
              <span className="absolute -top-1 -right-1 size-40 border-3 border-b-0 border-l-0  border-[#06bfae] rounded-tr-lg pointer-events-none hidden md:block" />
              {/* Bottom-left accent border */}
              <span className="absolute -bottom-1 -left-1 size-40 border-3 border-r-0 border-t-0 border-[#06bfae] rounded-bl-lg pointer-events-none hidden md:block" />

              <div className="p-1 rounded-lg">
                <img
                  src={data?.imageUrl || prescribingLimitsImage}
                  alt="Prescribing Limits"
                  className="w-full h-80 aspect-square object-cover rounded-md"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
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
