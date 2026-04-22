"use client";

import { FileCheck, ShieldIcon, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "react-router";

import aboutHeroImg from "@/assets/company/about.png";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";
const defaultIcons = [ShieldIcon, VideoIcon, FileCheck];

export default function AboutHero({ data, loading, error }: any) {
  if (loading)
    return (
      <section className="py-10 flex justify-center items-center">
        Loading...
      </section>
    );

  if (error)
    return (
      <section className="py-10 flex justify-center items-center text-red-500">
        {error}
      </section>
    );

  return (
    <section className="py-10">
      <Container className="relative">
        <div className="absolute top-5 -scale-x-100 z-0 opacity-50 max-w-xs">
          <img src={bgPattern} alt="Background pattern" />
        </div>
        <div className="absolute z-0 top-5 right-0 opacity-50 max-w-xs">
          <img src={bgPattern} alt="Background pattern" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-6">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
                <span className="block text-primary">
                  {data?.title || "Privacy Policy"}
                </span>
                <span className="block text-slate-900">
                  {data?.heroTitle || ""}
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
                {data?.heroSubtitle || ""}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link to={data?.heroCta1Url ?? "/onboarding"}>
                  <Button className="bg-gradient-primary h-10" size="lg">
                    {data?.heroCta1Label ?? "Start your assessment"}
                  </Button>
                </Link>

                <Link to={data?.heroCta2Url ?? "/company/contact"}>
                  <Button variant="outline" size="lg" className="h-10">
                    {data?.heroCta2Label ?? "Contact us"}
                  </Button>
                </Link>
              </div>

              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(data?.heroFeatureBadges ?? []).map(
                  (f: any, index: number) => {
                    const IconComponent =
                      f?.icon || defaultIcons[index] || FileCheck;

                    return (
                      <li key={index} className="flex items-start gap-1">
                        <div className="size-9 rounded-full bg-[#306A7A1A] text-primary flex items-center justify-center shrink-0 mt-1">
                          <IconComponent className="size-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {f.label}
                          </div>
                        </div>
                      </li>
                    );
                  },
                )}
              </ul>
            </div>

            <div className="md:col-span-6 flex justify-center md:justify-end">
              <div className="relative w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={data?.heroImageUrl || aboutHeroImg}
                    alt="About us hero"
                    width={940}
                    height={620}
                    className="object-cover w-full h-90 md:h-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
