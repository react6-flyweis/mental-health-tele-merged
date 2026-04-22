"use client";

import { useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

const WORK_TYPES = [
  {
    label: "Full-Time",
    key: "full-time",
    minHours: 0,
    maxHours: 60,
    defaultHours: 40,
    rate: 60,
  },
  {
    label: "Part-Time",
    key: "part-time",
    minHours: 0,
    maxHours: 30,
    defaultHours: 20,
    rate: 50,
  },
] as const;

type WorkTypeKey = (typeof WORK_TYPES)[number]["key"];

export default function EarningsCalculatorSection() {
  const [activeType, setActiveType] = useState<WorkTypeKey>("full-time");

  const workType = WORK_TYPES.find((t) => t.key === activeType)!;

  const [hours, setHours] = useState(workType.defaultHours);


  function handleTypeChange(key: WorkTypeKey) {
    setActiveType(key);
    const next = WORK_TYPES.find((t) => t.key === key)!;
    setHours(next.defaultHours);
  }
  function handleHoursChange(value: number, type: WorkTypeKey) {
    console.log({ type })
    setActiveType(type);
    const safeValue = Math.min(
      workType.maxHours,
      Math.max(workType.minHours, value)
    );
    setHours(safeValue as any);
  }
  const annualEarnings = hours * workType.rate * 52;

  const progress =
    ((hours - workType.minHours) /
      (workType.maxHours - workType.minHours)) *
    100;

  return (
    <section className="py-16 bg-slate-50">
      <Container>
        <div className="flex justify-center">
          <Card className="w-full max-w-xl p-8  gap-0 bg-white">
            {/* Label */}
            <div className="inline-flex w-fit mx-auto items-center gap-2 bg-[#EAFEFA] text-primary text-xs font-medium py-1 px-3 rounded-xl mb-4">
              <Calculator className="w-4 h-4" />
              <span>Earnings Calculator</span>
            </div>

            {/* Title */}
            <h2 className="text-center text-3xl font-bold mb-2">
              <span className="text-primary">Estimate Your</span>{" "}
              <span className="text-foreground">Potential Earnings</span>
            </h2>

            {/* Subtitle */}
            <p className="text-center text-muted-foreground text-sm mb-8 max-w-sm mx-auto">
              Select your preferred working hours and see how your dedication
              can translate into annual income.
            </p>

            {/* Toggle */}
            <div className="w-fit mx-auto inline-flex bg-gray-100 rounded-full p-1 mb-8">
              {WORK_TYPES.map((type) => (
                <button
                  key={type.key}
                  onClick={(e) => handleTypeChange(type.key)}

                  className={cn(
                    "px-6 py-2 text-sm font-medium transition-all duration-200 rounded-full",
                    activeType === type.key
                      ? "bg-gradient-primary text-white"
                      : "text-primary hover:bg-primary/20",
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Hours per week
                </span>
                <span className="text-sm font-bold text-primary">
                  {hours} hrs
                </span>
              </div>

              <div className="relative">
                <input
                  type="range"
                  min={workType.minHours}
                  max={workType.maxHours}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value) as any)}
                  className="w-full h-2 appearance-none bg-transparent cursor-pointer slider z-10 relative bottom-0.75"
                />

                <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 rounded-full"></div>

                <div
                  className="absolute top-0 left-0 h-2 bg-gradient-primary rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {workType.minHours} hrs
                </span>
                <span className="text-xs text-muted-foreground">
                  {workType.maxHours} hrs
                </span>
              </div>
            </div>


            {/* Earnings Display */}
            <div className="bg-[#EAFEFA] border border-primary/20 rounded-3xl p-8 text-center mb-8">
              <p className="text-sm text-muted-foreground mb-1">
                Estimated Annual Earnings
              </p>
              <p className="text-4xl font-bold text-primary mb-1">
                ${annualEarnings.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Based on average rate of ${workType.rate}/hour
              </p>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <Link to="/apply">
                <Button className="bg-gradient-primary h-10 px-8">
                  Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
