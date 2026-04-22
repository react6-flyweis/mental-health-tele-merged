import { ShieldCheck, Lock, ClipboardCheck } from "lucide-react";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Card } from "@/components/ui/card";
import { buildGroups } from "../../pages/marketing/footer/Consent";

export default function ConsentPrivacySection({ data }: any) {
  const groups = buildGroups(data?.sections);

  const section = groups.find((g: any) =>
    g.title.toLowerCase().includes("privacy"),
  );

  const icons = [ShieldCheck, Lock, ClipboardCheck];

  const half = Math.ceil((section?.items?.length || 0) / 2);

  return (
    <section className="py-16 bg-linear-to-b from-[#F0FDFA] to-white">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader
          title="Privacy & Security"
          description={section?.description}
          className="max-w-xl mx-auto"
        />
      </div>

      <div className="mt-12 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {section?.items?.slice(0, half).map((item: string, i: number) => {
          const Icon = icons[i] || ShieldCheck;

          return (
            <Card
              key={i}
              className="bg-white p-6 shadow-md gap-0 items-center text-center"
            >
              <div className="mb-4 size-12 rounded-xl bg-gradient-primary text-white flex items-center justify-center shadow-[0px_4px_6px_-4px_#96F7E4,0px_10px_15px_-3px_#96F7E4]">
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
