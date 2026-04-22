"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

const buildSections = (sections: any[] = []) => {
  const sorted = sections
    ?.slice()
    ?.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const groups: any[] = [];
  let current: any = null;

  const isValidHeading = (heading?: string) => {
    if (!heading) return false;
    const h = heading.trim().toLowerCase();
    if (!h) return false;
    if (/^\d+$/.test(h)) return false;
    if (h.includes("table of contents")) return false;
    if (h.startsWith("•")) return false;
    return true;
  };

  const generateId = (text: string, index: number) =>
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")
      .concat(`-${index}`);

  sorted.forEach((item, index) => {
    if (isValidHeading(item.heading)) {
      if (current) groups.push(current);

      current = {
        id: generateId(item.heading, index),
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

export default function TermsOfUseContent({ data }: any) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sections = buildSections(data?.sections || []);
  const sectionRefs = useRef<any>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let visible: any = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = entry;
          }
        });

        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0.25,
      }
    );

    Object.values(sectionRefs.current).forEach((el: any) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleScroll = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;

    window.scrollTo({
      top: el.offsetTop - 100,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 lg:flex lg:space-x-8">

      <aside className="hidden lg:block lg:w-72 sticky top-24 h-fit">
        <Card className="p-5 gap-0 shadow-sm">
          <h3 className="font-semibold mb-4 text-lg">Table of Contents</h3>
          <ul className="space-y-1">
            {sections.map((s: any) => (
              <li key={s.id}>
                <button
                  onClick={() => handleScroll(s.id)}
                  className={cn(
                    "w-full text-left flex items-center text-sm rounded-xl hover:text-primary px-4 py-2.5 transition-colors",
                    activeId === s.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  <FileText className="size-4 mr-2 shrink-0" />
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </aside>

      <div className="flex-1 space-y-6">
        {sections.map((s: any) => (
          <section
            key={s.id}
            id={s.id}
            ref={(el: any) => (sectionRefs.current[s.id] = el)}
            className="scroll-mt-24"
          >
            <Card className="p-6 md:p-8 gap-0 shadow-md">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                <span className="text-primary">{s.title}</span>
              </h2>

              <div className="space-y-3 text-muted-foreground">
                {s.content.map((c: string, i: number) => (
                  <p key={i} className="text-base leading-relaxed">
                    {c}
                  </p>
                ))}
              </div>
            </Card>
          </section>
        ))}
      </div>
    </div>
  );
}