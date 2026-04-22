"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  Shield,
  Users,
  Lock,
  FileText,
  Building2Icon,
} from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const buildHIPAASections = (sections: any[] = []) => {
  const sorted = sections
    ?.slice()
    ?.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)) || [];

  const articles: any = {
    intro: "",
    article1: [],
    article2: [],
    article3: [],
    rightsIntro: "",
    footer: "",
  };

  let current = "";

  sorted.forEach((item) => {
    if (item.heading?.includes("Introduction")) {
      current = "intro";
    } else if (item.heading?.includes("Article I")) {
      current = "article1";
    } else if (item.heading?.includes("Article II")) {
      current = "article2";
    } else if (item.heading?.includes("Article III")) {
      current = "article3";
    } else if (item.heading?.includes("Your Rights")) {
      articles.rightsIntro = item.body;
      current = "article3";
    } else if (item.heading?.includes("Services")) {
      articles.footer = item.body;
    } else if (item.body) {
      if (current === "intro") {
        articles.intro = item.body;
      } else if (current === "article1") {
        articles.article1.push(item.body);
      } else if (current === "article2") {
        articles.article2.push(item.body);
      } else if (current === "article3") {
        articles.article3.push(item.body);
      }
    }
  });

  return articles;
};

const sectionsMeta = [
  {
    id: "introduction",
    title: "Our",
    subtitle: "Introduction",
    Icon: FileText,
  },
  {
    id: "article-i",
    title: "Article I",
    subtitle: " – Responsibilities as a Covered Entity",
    Icon: Building2Icon,
  },
  {
    id: "article-ii",
    title: "Article II",
    subtitle: " – Use and Disclosure of PHI",
    Icon: Lock,
  },
  {
    id: "article-iii",
    title: "Article III",
    subtitle: " – Individual Rights",
    Icon: Users,
  },
];

export default function HIPAAPrivacyContent({ data }: any) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const parsed = buildHIPAASections(data?.sections);

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

    sectionsMeta.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 lg:flex lg:space-x-8">
      <aside className="hidden lg:block lg:w-72 sticky top-24 h-fit">
        <Card className="p-5 gap-0 shadow-sm">
          <h3 className="font-semibold mb-4 text-lg">Table of Contents</h3>
          <ul className="space-y-1">
            {sectionsMeta.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={cn(
                    "flex items-center text-sm rounded-xl hover:text-primary px-4 py-2.5 transition-colors",
                    activeId === s.id
                      ? "bg-primary/10 text-primary border-l-3 border-primary font-medium"
                      : "text-muted-foreground border-l-2 border-transparent"
                  )}
                >
                  <s.Icon className="size-4 mr-2 shrink-0" />
                  {s.title} {s.subtitle}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </aside>

      <div className="flex-1 space-y-6">
        <section id="introduction" className="scroll-mt-24">
          <Card className="p-6 md:p-8 gap-0 shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="size-7 text-primary" />
              <h2 className="text-xl font-semibold">
                <span className="text-primary">Our </span>Introduction
              </h2>
            </div>
            <p className="text-muted-foreground">{parsed.intro}</p>
          </Card>
        </section>

        <section id="article-i" className="scroll-mt-24">
          <Card className="p-6 md:p-8 gap-0 shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <Building2Icon className="size-7 text-primary" />
              <h2 className="text-xl font-semibold">
                <span className="text-primary">Article I </span>
                – Responsibilities as a Covered Entity
              </h2>
            </div>

            <Accordion type="single" collapsible>
              {parsed.article1.map((item: string) => (
                <AccordionItem key={item} value={item}>
                  <AccordionTrigger className="py-4">
                    <Shield className="size-4 mr-2" />
                    {item}
                  </AccordionTrigger>
                  <AccordionContent />
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </section>

        <section id="article-ii" className="scroll-mt-24">
          <Card className="p-6 md:p-8 gap-0 shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <Lock className="size-7 text-primary" />
              <h2 className="text-xl font-semibold">
                <span className="text-primary">Article II </span>
                – Use and Disclosure of PHI
              </h2>
            </div>

            <Accordion type="single" collapsible>
              {parsed.article2.map((item: string) => (
                <AccordionItem key={item} value={item}>
                  <AccordionTrigger className="py-4">
                    <Lock className="size-4 mr-2" />
                    {item}
                  </AccordionTrigger>
                  <AccordionContent />
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </section>

        <section id="article-iii" className="scroll-mt-24">
          <Card className="p-6 md:p-8 gap-0 shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="size-7 text-primary" />
              <h2 className="text-xl font-semibold">
                <span className="text-primary">Article III </span>
                – Individual Rights
              </h2>
            </div>

            <div className="p-4 rounded-lg bg-gradient-primary text-white mb-4">
              {parsed.rightsIntro}
            </div>

            <Accordion type="single" collapsible>
              {parsed.article3.map((item: string) => (
                <AccordionItem key={item} value={item}>
                  <AccordionTrigger className="py-4">
                    <Users className="w-4 mr-2 min-w-4" />
                    {item}
                  </AccordionTrigger>
                  <AccordionContent />
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </section>

        <div className="mt-12">
          <Card className="p-8 bg-gradient-primary text-white">
            <h3 className="text-xl font-semibold mb-4">
              Services And Features
            </h3>
            <p>{parsed.footer}</p>

            <div className="mt-6 p-4 rounded-lg border border-white/40 bg-white/10">
              Disclaimer : This policy serves as a general guideline. Specific
              situations may require individual assessment. For questions or
              concerns, please contact our Privacy Officer or visit our website
              for additional resources.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}