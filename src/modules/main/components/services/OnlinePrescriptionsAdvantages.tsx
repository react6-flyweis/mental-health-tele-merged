import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

const items = [
  "Faster access to care",
  "Digital treatment records",
  "Reduced wait times",
  "No monthly clinic visits",
  "Direct pharmacy delivery",
];

export default function OnlinePrescriptionsAdvantages() {
  return (
    <section className="py-12 pb-0 bg-[#F9FAFB]">
      <Container>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Advantages Of"
            subtitle="Online Prescriptions"
            description="Experience the convenience and efficiency of modern medication management."
            align="center"
          />

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-3">
            {items.map((it) => (
              <div
                key={it}
                className="flex items-center gap-3 bg-white border border-[#E6F6F1] rounded-lg px-4 py-5 shadow-sm"
              >
                <div className="size-9 rounded-full bg-[#E9FBF7] text-primary flex items-center justify-center">
                  <Check className="size-5" />
                </div>
                <div className="text-sm text-slate-700 font-medium">{it}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
