"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HIPAASectionProps {
  id: string;
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

export function HIPAASection({ id, title, Icon, children }: HIPAASectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <Card className="pt-0 shadow">
        <CardHeader className="pt-4 flex items-center bg-gradient-primary border-b gap-2">
          <div className="shrink-0 size-10 bg-[#FFFFFF33] rounded-xl  flex items-center justify-center shadow-sm">
            <Icon className="size-5 text-white" />
          </div>
          <CardTitle className="text-xl font-semibold text-white ">
            <span className="">{title} </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-base leading-relaxed text-muted-foreground">
          {children}
        </CardContent>
      </Card>
    </section>
  );
}
