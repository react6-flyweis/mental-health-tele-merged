import { Calendar, Clipboard, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function DeaInfoSection({ data }: any) {
  const sorted =
    data?.sections
      ?.slice()
      ?.sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)) || [];

  const introTop = data?.intro;
  const introBottom = sorted?.[0]?.body;

  const icons = [Clipboard, Calendar, Users];

  const items = sorted
    .filter((s: any) => s.heading)
    .slice(0, 3)
    .map((item: any, i: number) => ({
      title: item.heading,
      description: sorted?.[i + 3]?.body,
      Icon: icons[i],
    }));

  return (
    <section>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-sm space-y-2">
        <p>{introTop}</p>
        <p>{introBottom}</p>
      </div>

      <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item: any, i: number) => (
          <Card key={i} className="bg-white p-6 shadow-md gap-0">
            <div className="mb-4 size-12 rounded-xl bg-gradient-primary text-white flex items-center justify-center">
              <item.Icon className="size-6" />
            </div>
            <h3 className="font-medium text-slate-900">{item.title}</h3>
            <p className="mt-2 text-muted-foreground text-xs">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}