"use client";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import {
  Calendar,
  Pill,
  DollarSign,
  ShieldIcon,
  Building2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { publicPageApi } from "@/api/publicpage.api";

const categories = [
  {
    title: "About MEDvidi",
    icon: Building2Icon,
    items: [],
  },
  {
    title: "Appointments",
    icon: Calendar,
    items: [],
  },
  {
    title: "Prescription",
    icon: Pill,
    items: [],
  },
  {
    title: "Pricing",
    icon: DollarSign,
    items: [],
  },
  {
    title: "DEA Update",
    icon: ShieldIcon,
    items: [],
  },
];

export default function FAQCategories({ search }: { search: string }) {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFAQs = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await publicPageApi.getFAQ();
      setFaqs(res?.data?.faqs || []);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const categoryMap: Record<string, string> = {
    about: "About MEDvidi",
    appointments: "Appointments",
    prescription: "Prescription",
    pricing: "Pricing",
    "dea-update": "DEA Update",
    providers: "About MEDvidi",
  };

  const groupedFaqs = faqs.reduce((acc: any, faq: any) => {
    const key = categoryMap[faq.category] || faq.category;

    if (!acc[key]) acc[key] = [];

    acc[key].push({
      q: faq.question,
      a: faq.answer,
      order: faq.displayOrder,
    });

    acc[key].sort((a: any, b: any) => a.order - b.order);

    return acc;
  }, {});

  const filteredFaqs = Object.keys(groupedFaqs).reduce((acc: any, key) => {
    acc[key] = groupedFaqs[key].filter((item: any) =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
    );
    return acc;
  }, {});

  useEffect(() => {
  const handleScroll = () => {
    const offsets = sectionRefs.current.map((el) =>
      el ? Math.abs(el.getBoundingClientRect().top) : Infinity
    );

    const minIndex = offsets.indexOf(Math.min(...offsets));
    setActive(minIndex);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            if (!Number.isNaN(idx)) {
              setActive(idx);
            }
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0.1 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (idx: number) => {
    const el = sectionRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (loading)
    return (
      <p className="text-center h-75 flex items-center justify-center">
        Loading...
      </p>
    );

  if (error)
    return (
      <p className="text-center h-75 flex items-center justify-center">
        {error}
      </p>
    );

  if (!loading && faqs.length === 0) {
    return (
      <p className="text-center h-75 flex items-center justify-center">
        No FAQs found
      </p>
    );
  }

  return (
    <section className="pb-16">
      <Container>
        <nav className="sticky top-0 z-10 bg-white py-4">
          <div className="flex justify-center space-x-4 overflow-x-auto scrollbar-none">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap px-4 py-2 border-b-2 transition-colors",
                  idx === active
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <cat.icon className="size-4" />
                {cat.title}
              </button>
            ))}
          </div>
        </nav>

        {categories.map((cat, idx) => (
          <div
            key={idx}
            ref={(el) => {
              sectionRefs.current[idx] = el;
            }}
            data-idx={idx}
            className="space-y-12 max-w-3xl mx-auto pt-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 bg-gradient-primary flex justify-center items-center rounded-xl">
                <cat.icon className="size-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold">{cat.title}</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {(filteredFaqs[cat.title] || []).length === 0 ? (
                <div className="text-center text-muted-foreground py-3 text-sm rounded-xl border bg-white">
                  No FAQs found
                </div>
              ) : (
                (filteredFaqs[cat.title] || []).map((item: any, i: number) => (
                  <AccordionItem
                    key={i}
                    value={`${idx}-${i}`}
                    className="rounded-xl border bg-white"
                  >
                    <AccordionTrigger className="p-3">
                      {item.q}
                    </AccordionTrigger>

                    {item.a && (
                      <AccordionContent className="p-3 pt-0">
                        <div className="text-sm text-muted-foreground">
                          {item.a}
                        </div>
                      </AccordionContent>
                    )}
                  </AccordionItem>
                ))
              )}
            </Accordion>
          </div>
        ))}

        <div className="mt-12 flex justify-center">
          <Link to="/contact">
            <Button size="lg" className="bg-gradient-primary px-6">
              Contact Us
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}