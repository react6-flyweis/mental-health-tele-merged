import {
  Clock,
  Calendar,
  XCircle,
  CheckCircle,
  AlertTriangle,
  FileText,
  Mail,
  Phone,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function RefundsDetails({ data, loading, error }: any) {
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <Container maxWidth="4xl">
          <Skeleton className="h-8 w-40 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 border-2">
                <Skeleton className="size-12 rounded-xl mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-1" />
              </Card>
            ))}
          </div>
          <div className="mt-8 space-y-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="pt-0 shadow">
                <CardHeader className="border-b pt-5 flex gap-4 items-center">
                  <Skeleton className="size-6" />
                  <div className="flex items-end gap-2 w-full">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-6 w-1/2" />
                  </div>
                </CardHeader>
                <CardContent className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (error) return null;

  const sorted =
    data
      ?.slice()
      ?.sort(
        (a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
      ) || [];
  const definitions: any[] = [];

  const defIndex = sorted.findIndex((s: any) => s.heading === "Definitions");

  if (defIndex !== -1) {
    const titles = sorted.slice(defIndex + 1, defIndex + 4);
    const desc = sorted.slice(defIndex + 4, defIndex + 7);

    titles.forEach((t: any, i: number) => {
      definitions.push({
        title: t?.body,
        description: desc?.[i]?.body,
      });
    });
  }
  let i = 0;

  while (i < sorted.length) {
    if (sorted[i].heading === "Definitions") {
      definitions.push({
        title: sorted[i + 1]?.body,
        description: sorted[i + 4]?.body,
      });
      definitions.push({
        title: sorted[i + 2]?.body,
        description: sorted[i + 5]?.body,
      });
      definitions.push({
        title: sorted[i + 3]?.body,
        description: sorted[i + 6]?.body,
      });
      break;
    }
    i++;
  }

  const sections: any[] = [];
  let current: any = null;

  sorted.forEach((item: any) => {
    if (/^\d+\.$/.test(item.heading)) {
      if (current) sections.push(current);

      current = {
        number: item.heading,
        title: "",
        content: [],
      };
    } else if (current && item.heading && !current.title) {
      current.title = item.heading;
    } else if (current && item.body) {
      current.content.push(item.body);
    }
  });

  if (current) sections.push(current);

  const definitionIcons = [Clock, Calendar, XCircle];
  const sectionIcons = [
    CheckCircle,
    XCircle,
    AlertTriangle,
    FileText,
    Mail,
    Phone,
    Shield,
  ];

  return (
    <section className="py-16 bg-white">
      <Container maxWidth="4xl">
        <h2 className="text-2xl font-semibold">Definitions</h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {definitions.map((def: any, index: number) => {
            const Icon = definitionIcons[index] || FileText;

            return (
              <Card key={index} className="p-6 border-2">
                <div className="mb-4 size-12 rounded-xl flex items-center justify-center bg-gray-100">
                  <Icon className="size-6" />
                </div>

                <h3 className="font-medium">{def.title}</h3>

                <p className="mt-2 text-xs text-muted-foreground">
                  {def.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 space-y-8">
          {sections.map((sec: any, idx: number) => {
            const Icon = sectionIcons[idx] || FileText;

            return (
              <Card key={idx} className="pt-0 shadow">
                <CardHeader className="border-b pt-5 flex gap-4 items-center">
                  <Icon className="size-6" />

                  <div className="flex items-end gap-2">
                    <span className="font-bold text-3xl">{sec.number}</span>

                    <CardTitle className="font-bold text-xl">
                      {sec.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  {sec.content.map((c: string, i: number) => (
                    <p key={i} className="text-muted-foreground mt-2 text-sm">
                      {c}
                    </p>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
