"use client";

import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Link } from "react-router";

const features = [
  { id: 1, title: "Proven, Research-Backed Care Approaches" },
  { id: 2, title: "Providers Who Track And Support Your Progress" },
  { id: 3, title: "Customized, Whole-Person Treatment Plans" },
  { id: 4, title: "Ongoing Patient Support When You Need It" },
];

export default function ExpertsSection({ data }: any) {
  const experts =
    data
      ?.slice()
      ?.sort(
        (a: any, b: any) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0),
      ) || [];

  return (
    <section className="py-16 bg-[#2195800D]">
      <Container>
        <SectionHeader
          align="center"
          title="Meet The Experts"
          subtitle="Behind Your Care"
          description="Our Mental Health Specialists Are Dedicated To Understanding Your Needs And Supporting You With Thoughtful, Professional Care At Every Step."
        />

        <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-7 gap-8 items-start">
          <div className="md:col-span-2">
            <ul className="space-y-4">
              {features.map((f) => (
                <li key={f.id}>
                  <div className="flex items-center gap-3 rounded-lg border-2 p-3">
                    <div className="w-5 h-5 shrink-0 rounded-full bg-gradient-primary flex items-center justify-center text-white">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {f.title}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Link to="/about">
                <Button
                  size={"lg"}
                  className="bg-gradient-primary w-full md:w-auto inline-flex items-center gap-2 rounded-lg"
                >
                  <span>Explore Our Care Team</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <Carousel
              opts={{ loop: true }}
              plugins={[
                AutoScroll({
                  speed: 1,
                  stopOnInteraction: false,
                  stopOnMouseEnter: true,
                }),
              ]}
            >
              <CarouselContent className=" -mx-2">
                {(experts.length ? experts : new Array(5).fill(null)).map(
                  (ex: any, i: number) => {
                    const Card = (
                      <div className="first:ml-6 pl-4 shrink-0 w-65 md:w-60 lg:w-[320px] bg-white rounded-2xl border border-slate-100 shadow-sm p-3 hover:shadow-md transition-shadow">
                        <div className="overflow-hidden rounded-xl aspect-square mb-3">
                          {ex ? (
                            <img
                              src={ex.imageUrl || "/placeholder.png"}
                              alt={ex.fullName}
                              width={320}
                              height={320}
                              className="object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-50 rounded-lg" />
                          )}
                        </div>

                        <div className="text-sm font-semibold text-slate-900">
                          {ex?.fullName}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed h-14 overflow-hidden">
                          {ex?.specialty}
                          {ex?.experienceYears
                            ? ` • ${ex.experienceYears} yrs exp`
                            : ""}
                        </p>
                      </div>
                    );

                    return (
                      <div key={ex?.id ?? i}>
                        {ex?.destinationUrl ? (
                          <Link to={ex.destinationUrl}>{Card}</Link>
                        ) : (
                          Card
                        )}
                      </div>
                    );
                  },
                )}
              </CarouselContent>

              <CarouselPrevious
                className="left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full p-2 shadow hover:shadow-md border"
                size="icon-sm"
              />
              <CarouselNext
                className="right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full p-2 shadow hover:shadow-md border"
                size="icon-sm"
              />
            </Carousel>
          </div>
        </div>
      </Container>
    </section>
  );
}
