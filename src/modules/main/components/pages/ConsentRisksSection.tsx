import { Wifi, Stethoscope, AlertCircle } from "lucide-react";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Card } from "@/components/ui/card";
import { buildGroups } from "../../pages/marketing/footer/Consent";

export default function ConsentRisksSection({ data }: any) {
  const groups = buildGroups(data?.sections);

  const section = groups.find((g: any) =>
    g.title.toLowerCase().includes("risk"),
  );

  const icons = [Wifi, Stethoscope, AlertCircle];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader
          title="Possible Risks & Limitations"
          description={section?.description}
          className="max-w-xl mx-auto"
        />
      </div>

      <div className="mt-12 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {section?.items?.map((item: string, i: number) => {
          const Icon = icons[i] || Wifi;

          return (
            <Card
              key={i}
              className="bg-[#FFFBEB] ring-0 border border-[#FEF3C6] p-4 shadow-md gap-0"
            >
              <div className="mb-4 size-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
                <Icon className="size-6" />
              </div>

              <h3 className="font-medium text-slate-900">{item}</h3>

              <p className="mt-2 text-muted-foreground text-xs">
                {section?.items?.[i + 3] || ""}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
