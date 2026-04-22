"use client";

import { useSearchParams } from "react-router";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";

import { Link } from "react-router";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { cn } from "@/lib/utils";

const tags = [
  "All",
  "ADHD",
  "Anxiety",
  "Depression",
  "Sleep Health",
  "Medications",
  "Mental Wellness",
  "OCD",
  "Phobias",
  "Stress Management",
  "Weight Care",
];

export default function BlogHero() {
  const [params] = useSearchParams();
  const activeTag = params?.get("tag") || "";
  return (
    <section className="py-20 bg-[#F3FEFB]">
      <Container className="relative">
        <div className="absolute -top-5 -scale-x-100 z-0 opacity-50 max-w-xs">
          <img
            src={bgPattern}
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute z-0 -top-5 right-0 opacity-50 max-w-xs">
          <img
            src={bgPattern}
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>

        <SectionHeader
          title="Insights For A"
          subtitle="Healthier Mind"
          description="Explore expert-written articles on mental wellness, treatments, and everyday strategies to support your emotional well-being."
          as="h1"
          className="max-w-3xl mx-auto px-4"
        />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {tags.map((tag) => {
            const isActive = activeTag === tag;

            return (
              <Link
                key={tag}
                to={`/blog?tag=${encodeURIComponent(tag)}`}
                className={cn(
                  "px-3 z-10 py-1.5 rounded-full font-semibold transition-colors",
                  isActive
                    ? "bg-primary text-white shadow-[0px_4px_6px_-4px_#96F7E480,0px_10px_15px_-3px_#96F7E480]"
                    : "bg-white text-primary shadow-md hover:bg-primary hover:text-white",
                )}
              >
                {tag}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
