"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

const generateId = (text: string, index: number) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .concat(`-${index}`);

export default function SitemapContent({ data }: any) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRefs = useRef<any>({});
  const isClickScrolling = useRef(false);

  const sections =
    data?.sitemapSections
      ?.slice()
      ?.sort((a: any, b: any) => a.displayOrder - b.displayOrder)
      ?.map((s: any, i: number) => ({
        ...s,
        id: generateId(s.title, i),
      })) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

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
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0.3,
      },
    );

    Object.values(sectionRefs.current).forEach((el: any) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleScroll = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;

    isClickScrolling.current = true;
    setActiveId(id);

    window.scrollTo({
      top: el.offsetTop - 100,
      behavior: "smooth",
    });

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 500);
  };

  return (
    <Container className="py-16 lg:flex gap-8">
      <aside className="hidden lg:block lg:w-64 sticky top-24">
        <Card className="p-5 gap-0 shadow-sm">
          <h3 className="font-semibold mb-4 text-lg">Table of Contents</h3>
          <ul className="space-y-1">
            {sections.map((cat: any) => (
              <li key={cat.id}>
                <button
                  onClick={() => handleScroll(cat.id)}
                  className={cn(
                    "w-full text-left text-sm rounded-xl px-4 py-2.5 transition-colors",
                    activeId === cat.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  {cat.title}
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </aside>

      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {sections.map((cat: any) => (
            <div
              key={cat.id}
              id={cat.id}
              ref={(el: any) => (sectionRefs.current[cat.id] = el)}
              className="scroll-mt-24"
            >
              <h3 className="text-lg font-semibold mb-4">{cat.title}</h3>

              <ul className="space-y-2">
                {cat.links.map((link: any, i: number) => (
                  <li key={i}>
                    <Link
                      to={link.url}
                      className="text-sm text-muted-foreground hover:text-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
