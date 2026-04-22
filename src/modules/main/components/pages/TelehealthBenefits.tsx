import { MapPin, Clock, Shield, Home } from "lucide-react";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Card } from "@/components/ui/card";
import { buildGroups } from "../../pages/marketing/footer/Consent";

export default function TelehealthBenefits({ data }: any) {
  const groups = buildGroups(data?.sections);

  const section = groups.find((g: any) =>
    g.title.toLowerCase().includes("benefits"),
  );

  const icons = [MapPin, Clock, Shield, Home];

  return (
    <section className="py-16 bg-linear-to-b from-[#F0FDFA] to-white">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader
          title="Benefits Of"
          subtitle="Telehealth"
          description={section?.description}
          className="max-w-xl mx-auto"
        />
      </div>

      <div className="mt-12 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {section?.items?.map((item: string, i: number) => {
          const Icon = icons[i] || MapPin;

          return (
            <Card key={i} className="bg-white p-4 shadow-md gap-0">
              <div className="mb-4 size-12 rounded-xl bg-[#CBFBF1] text-primary flex items-center justify-center">
                <Icon className="size-6" />
              </div>

              <h3 className="font-medium text-slate-900">{item}</h3>

              <p className="mt-2 text-muted-foreground text-xs">
                {section?.items?.[i + 4] || ""}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
