"use client";

import React, { useState } from "react";
import {
  Target,
  Edit3,
  Search,
  CheckCircle,
  RefreshCw,
  ShieldCheck,
  Info,
  MessageCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const iconMap: any = {
  "editorial mission": Target,
  "how we create content": Edit3,
  "research & topic selection": Search,
  "review & fact-checking": CheckCircle,
  "ongoing updates": RefreshCw,
  "conflicts of interest": ShieldCheck,
  "important limitations": Info,
  "feedback & corrections": MessageCircle,
};

const buildSections = (sections: any[] = []) => {
  const sorted = sections
    ?.slice()
    ?.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const groups: any[] = [];
  let current: any = null;

  sorted.forEach((item) => {
    if (item.heading) {
      if (current) groups.push(current);

      current = {
        id: item.heading.toLowerCase().replace(/\s+/g, "-"),
        title: item.heading,
        content: [],
      };

      if (item.body) current.content.push(item.body);
    } else if (current && item.body) {
      current.content.push(item.body);
    }
  });

  if (current) groups.push(current);

  return groups;
};

export default function EditorialPolicyContent({ data }: any) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sections = buildSections(data?.sections || []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((s: any) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 lg:flex lg:space-x-8">
      <aside className="hidden lg:block lg:w-72 sticky top-24 h-fit">
        <Card className="p-5 gap-0 shadow-sm">
          <h3 className="font-semibold mb-4 text-lg">On This Page</h3>
          <ul className="space-y-1">
            {sections.map((s: any) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={cn(
                    "block text-sm rounded-xl px-4 py-2.5",
                    activeId === s.id
                      ? "bg-primary/10 text-primary border-l-3 border-primary font-medium"
                      : "text-muted-foreground border-l-2 border-transparent"
                  )}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </aside>

      <div className="flex-1 space-y-6">
        {sections.map((s: any) => {
          const Icon =
            iconMap[s.title.toLowerCase()] || MessageCircle;

          return (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <Card className="p-6 md:p-8 gap-0 shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="shrink-0 size-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-sm">
                    <Icon className="size-5 text-white" />
                  </div>

                  <h2 className="text-xl font-semibold text-foreground">
                    {s.title}
                  </h2>
                </div>

                <div className="pl-5 text-base leading-relaxed text-muted-foreground space-y-2">
                  {s.content.map((c: string, i: number) => (
                    <li key={i}>{c}</li>
                  ))}
                </div>
              </Card>
            </section>
          );
        })}
      </div>
    </div>
  );
}