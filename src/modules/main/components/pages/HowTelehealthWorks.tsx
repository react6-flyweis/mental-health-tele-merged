import { buildGroups } from "../../pages/marketing/footer/Consent";
import { SectionHeader } from "@/modules/main/components/section-header";

export default function HowTelehealthWorks({ data }: any) {
  const groups = buildGroups(data?.sections);
  const section = groups.find((g: any) => g.title.includes("How Telehealth"));

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader
          title="How Telehealth"
          subtitle="Works"
          description={data?.intro}
          className="max-w-xl mx-auto"
        />
      </div>

      <div className="mt-12 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {section?.items?.map((item: string, i: number) => (
          <div key={i} className="text-center">
            <div className="mx-auto mb-4 size-12 rounded-xl bg-gradient-primary" />
            <h3 className="text-lg font-medium text-slate-900">
              {section?.title?.split(",")[i] || item}
            </h3>
            <p className="mt-2 text-muted-foreground text-sm">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
