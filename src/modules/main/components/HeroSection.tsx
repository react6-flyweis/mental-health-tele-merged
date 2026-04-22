"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";
import { Link } from "react-router";
import { Container } from "@/components/ui/container";

export default function HeroSection({ data, conditions }: any) {
  console.log({ da: data?.ctaLabel });
  const categories =
    conditions
      ?.slice()
      ?.sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
      ?.map((c: any) => ({
        name: c.label,
        src: c.iconUrl || "",
        to: c.destinationUrl,
      })) || [];

  return (
    <section className="py-5">
      <Container>
        <div
          className="py-10 bg-accent rounded-2xl relative overflow-hidden"
          style={{ backgroundColor: data?.backgroundColor }}
        >
          <div className="absolute -top-5 -scale-x-100 z-0 opacity-50 max-w-xs">
            <img
              src={bgPattern}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute z-0 -top-5 right-0 opacity-50 max-w-xs">
            <img
              src={bgPattern}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-white shadow-sm text-xs font-semibold tracking-wide uppercase rounded px-4 py-1.5 mb-2">
                Welcome To Mental Health Tally
              </div>

              <h1 className=" text-4xl md:text-5xl font-medium tracking-tight leading-tight">
                <span className="block text-primary">{data?.title}</span>
              </h1>

              <p className="mx-auto max-w-lg text-base md:text-lg text-muted-foreground leading-relaxed">
                {data?.subtitle}
              </p>
            </div>

            <div className="mt-10">
              <div className="max-w-6xl mx-auto">
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
                  <CarouselContent className="gap-6 -mx-2">
                    {categories.map((c: any) => (
                      <div
                        key={c.name}
                        className="pl-4 shrink-0 w-52 md:w-64 lg:w-72"
                      >
                        <Link to={c.to || "#"}>
                          <div className="relative overflow-hidden rounded-2xl bg-[#E2EBEC] p-6 flex flex-col items-center gap-4 text-center hover:shadow-lg transition-all duration-300">
                            <div className="absolute -top-20 -left-16 size-52 rounded-full bg-[#0084D41C]"></div>

                            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-sm">
                              {c.src ? (
                                <img
                                  src={c.src}
                                  alt={c.name}
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200" />
                              )}
                            </div>

                            <span className="text-lg font-mono font-semibold text-sky-900">
                              {c.name}
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
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

            <div className="mt-10 flex justify-center">
              <Link to={data?.ctaUrl ?? ""}>
                <Button className="bg-gradient-primary" size="lg">
                  {data?.ctaLabel}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
