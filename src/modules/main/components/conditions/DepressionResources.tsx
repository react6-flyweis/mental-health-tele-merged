import { Link } from "react-router";
import { BookOpen, Check, ArrowRight } from "lucide-react";

import usefulResourcesImg from "@/assets/conditions/useful-resources.jpg";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/modules/main/components/section-header";

export default function DepressionResources() {
  const resources = [
    "Evidence-based information about depression and treatment",
    "Practical coping techniques for daily challenges",
    "Stories of recovery and hope from others",
    "Guidance on supporting loved ones with depression",
  ];

  return (
    <section className="py-16 bg-[#F8FBFA]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* left: copy + card */}
          <div className="md:col-span-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mt-1">
                <BookOpen className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <SectionHeader
                  title="Useful"
                  subtitle="Resources"
                  align="left"
                />
                <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">
                  Learning about depression and coping strategies can be
                  helpful, but professional guidance matters. Explore trusted
                  resources and discuss what you learn with your provider.
                </p>
              </div>
            </div>

            <div className="mt-6 max-w-md">
              <div className="bg-[#F1FAF7] border border-[#E6F9F3] rounded-xl p-4 shadow-sm">
                <div className="text-sm font-semibold text-slate-900 mb-3">
                  What you&apos;ll find:
                </div>

                <ul className="space-y-3">
                  {resources.map((r) => (
                    <li key={r} className="flex items-start gap-3">
                      <div className="size-7 rounded-md bg-[#407B7F1A] shrink-0 text-primary flex items-center justify-center mt-1">
                        <ArrowRight className="size-5" />
                      </div>

                      <div className="text-sm mt-1 text-slate-700">{r}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <Link to="/appointment">
                  <Button className="bg-gradient-primary inline-flex h-10">
                    Get Started Today
                    <ArrowRight />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* right: image */}
          <div className="md:col-span-6 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={usefulResourcesImg}
                  alt="Useful resources"
                  width={940}
                  height={620}
                  className="object-cover w-full h-[320px] md:h-[420px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
