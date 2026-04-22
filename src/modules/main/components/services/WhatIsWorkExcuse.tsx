import { Check, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

import workExcuseImage from "@/assets/services/work-excuse-letter.png";

export default function WhatIsWorkExcuse() {
  const points = [
    {
      id: 1,
      text: `A Work Excuse Letter is an official document issued by a licensed healthcare professional to confirm that an individual was medically unable to attend work for a specific period of time. It helps employees communicate legitimate health‑related absences to their employer in a clear and professional way.`,
    },
    {
      id: 2,
      text: `Unlike informal notes, a professional work excuse letter includes verified medical confirmation, recommended rest duration, and return‑to‑work guidance — ensuring both employee and employer receive clear, reliable information.`,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="relative">
            <div className="max-w-md mx-auto relative">
              {/* Top-right accent border */}
              <span className="absolute -top-1 -right-1 size-40 border-3 border-b-0 border-l-0 border-[#06bfae] rounded-tr-lg pointer-events-none hidden md:block" />
              {/* Bottom-left accent border */}
              <span className="absolute -bottom-1 -left-1 size-40 border-3 border-r-0 border-t-0 border-[#06bfae] rounded-bl-lg pointer-events-none hidden md:block" />

              <div className="p-1 rounded-lg">
                <img
                  src={workExcuseImage}
                  alt="What is a work excuse letter"
                  className="w-full h-80 aspect-square object-cover rounded-md"
                />
              </div>
            </div>
          </div>

          <div>
            <SectionHeader title="What Is A Work Excuse" subtitle="Letter?" />

            <div className="mt-6 space-y-4">
              {points.map((p) => (
                <div key={p.id} className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="size-6 rounded-full bg-gradient-primary text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button className="bg-gradient-primary">
                Schedule A Visit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
