"use client";

import { useMemo, useState } from "react";
import { Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/modules/main/components/section-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";

import bgPattern from "@/assets/landing/hero/bg-pattern.png";

export default function SleepSchedule() {
  const [age, setAge] = useState<number | "">(30);
  const [bedtime, setBedtime] = useState("23:00");
  const [waketime, setWaketime] = useState("07:00");
  const [calculated, setCalculated] = useState<null | {
    hours: number;
    minutes: number;
  }>(null);

  const recommendedForAge = useMemo(() => {
    if (typeof age !== "number") return "Varies by age";
    if (age >= 18 && age <= 64) return "7–9 hours (most adults)";
    if (age >= 65) return "7–8 hours (older adults)";
    if (age >= 14) return "8–10 hours (teens)";
    return "Varies by age";
  }, [age]);

  function computeDuration(b: string, w: string) {
    const [bh, bm] = b.split(":").map(Number);
    const [wh, wm] = w.split(":").map(Number);
    const start = bh * 60 + bm;
    const end = wh * 60 + wm;
    let diff = end - start;
    if (diff <= 0) diff += 24 * 60; // crosses midnight
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return { hours, minutes };
  }

  function onCalculate(e?: React.FormEvent) {
    e?.preventDefault();
    const res = computeDuration(bedtime, waketime);
    setCalculated(res);
  }

  return (
    <section className="py-16">
      <Container className="relative">
        {/* Decorative background elements could go here if we had SVGs */}
        <div className="absolute top-26 left-0 -scale-x-100 z-0 opacity-50 max-w-xs">
          <img
            src={bgPattern}
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute z-0 top-26 right-0 opacity-50 max-w-xs">
          <img
            src={bgPattern}
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>

        <SectionHeader
          title="Discover Your Ideal"
          subtitle="Sleep Schedule"
          description="Everyone's sleep needs are different. Use this simple tool to estimate how much rest your body may need based on your routine and age."
          className="max-w-xl mx-auto"
        />

        <div className="mt-8 flex justify-center">
          <Card className="w-full max-w-lg shadow-lg bg-[#FAFAFA]">
            <CardHeader>
              <CardTitle className="sr-only">Sleep calculator</CardTitle>
              <CardDescription />
            </CardHeader>

            <CardContent>
              <form className="space-y-4" onSubmit={onCalculate}>
                <div className="grid grid-cols-1 gap-4">
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <User className="size-4 text-muted-foreground" />
                      Your Age
                    </FieldLabel>
                    <Input
                      type="number"
                      value={age}
                      min={1}
                      max={120}
                      onChange={(ev) =>
                        setAge(
                          ev.target.value === "" ? "" : Number(ev.target.value),
                        )
                      }
                      placeholder="30"
                    />
                  </Field>

                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <Clock className="size-4 text-muted-foreground" />
                      Typical Bedtime
                    </FieldLabel>
                    <Input
                      type="time"
                      value={bedtime}
                      onChange={(ev) => setBedtime(ev.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <Clock className="size-4 text-muted-foreground" />
                      Typical Wake Time
                    </FieldLabel>
                    <Input
                      type="time"
                      value={waketime}
                      onChange={(ev) => setWaketime(ev.target.value)}
                    />
                  </Field>
                </div>

                <div className="pt-2">
                  <Button
                    className="bg-gradient-primary w-full"
                    size="lg"
                    type="submit"
                  >
                    Calculate my sleep
                  </Button>
                </div>
              </form>

              {calculated && (
                <div className="mt-6 rounded-lg border bg-background p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Estimated sleep
                      </div>
                      <div className="text-lg font-semibold">
                        {calculated.hours}h {calculated.minutes}m
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Recommended for your age: {recommendedForAge}
                      </div>
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      Good starting point
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
