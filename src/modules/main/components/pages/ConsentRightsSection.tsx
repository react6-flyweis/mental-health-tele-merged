import { XCircle, CircleQuestionMark, Truck } from "lucide-react";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Card } from "@/components/ui/card";
import { buildGroups } from "../../pages/marketing/footer/Consent";

export default function ConsentRightsSection({ data }: any) {
  const groups = buildGroups(data?.sections);

  const section = groups.find((g: any) =>
    g.title.toLowerCase().includes("rights"),
  );

  const icons = [XCircle, CircleQuestionMark, Truck];

  const half = Math.ceil((section?.items?.length || 0) / 2);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader
          title="Your Rights As A Patient"
          description={section?.description}
          className="max-w-xl mx-auto"
        />
      </div>

      <div className="mt-12 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {section?.items?.slice(0, half).map((item: string, i: number) => {
          const Icon = icons[i] || XCircle;

          return (
            <Card
              key={i}
              className="bg-linear-to-br from-[#F0FDFA] to-white ring-0 border border-[#CBFBF1] p-6 gap-0"
            >
              <div className="mb-4 size-12 rounded-xl bg-[#CBFBF1] text-primary flex items-center justify-center">
                <Icon className="size-6" />
              </div>

              <h3 className="font-medium text-slate-900">{item}</h3>

              <p className="mt-2 text-muted-foreground text-xs">
                {section?.items?.[i + half] || ""}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
