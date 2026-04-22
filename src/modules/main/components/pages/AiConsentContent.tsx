"use client";

import {
  Eye,
  Mic,
  User,
  ShieldCheck,
  Mail,
  CheckCircle,
  Bot,
  FileText,
  Users,
  Shield,
  Database,
  Lock,
  UserCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AiConsentContent({ data }: any) {
  const sorted =
    data?.sections
      ?.slice()
      ?.sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)) || [];

  const groups: any[] = [];
  let current: any = null;

  sorted.forEach((item: any) => {
    if (item.heading) {
      if (current) groups.push(current);

      current = {
        title: item.heading,
        items: [],
      };

      if (item.body) current.items.push(item.body);
    } else if (current && item.body) {
      current.items.push(item.body);
    }
  });

  if (current) groups.push(current);

  const firstCard = groups[0];
  const secondCard = groups[1];

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      {/* FIRST CARD */}
      <Card>
        <CardHeader className="border-b flex gap-5 items-center">
          <div className="size-10 flex justify-center items-center rounded-xl bg-gradient-primary">
            <Mic className="size-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            {firstCard?.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {firstCard?.items?.map((text: string, i: number) => (
            <div key={i} className="flex gap-2">
              <Eye className="size-5 text-primary shrink-0" />
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}

          <div className="mt-4 bg-[#5FB5A51A] border border-[#4A7C7E4D] p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <CheckCircle className="size-5 text-primary mr-2" />
              <span className="font-medium">
                Agreement and acknowledgement
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {
                sorted.find((s: any) =>
                  s.body?.includes("confirm that you understand")
                )?.body
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SECOND CARD */}
      <Card className="mt-8">
        <CardHeader className="border-b flex gap-5 items-center">
          <div className="size-10 flex justify-center items-center rounded-xl bg-gradient-primary">
            <Bot className="size-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            {secondCard?.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {secondCard?.items?.map((text: string, i: number) => (
            <div key={i} className="flex gap-3">
              <FileText className="size-5 text-primary shrink-0" />
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}