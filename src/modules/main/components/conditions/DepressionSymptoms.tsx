import { Link } from "react-router";
import { Check, ArrowRight } from "lucide-react";

import depressionImg from "@/assets/conditions/depression-system.png";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function DepressionSymptoms() {
  const items = [
    "Persistent sadness or emptiness",
    "Loss of interest in daily activities",
    "Low energy or motivation",
    "Difficulty focusing or remembering",
    "Changes in sleep or appetite",
    "Irritability or emotional numbness",
    "Physical aches without clear cause",
  ];

  return (
    <section className="py-16">
      <Container>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* left: image */}
          <div className="md:col-span-6 flex justify-center md:justify-start">
            <div className="rounded-2xl overflow-hidden shadow-2xl w-full max-w-md">
              <img
                src={depressionImg}
                alt="Person seated, looking reflective"
                width={940}
                height={620}
                className="object-cover w-full h-[340px] md:h-[420px]"
              />
            </div>
          </div>

          {/* right: copy + list */}
          <div className="md:col-span-6">
            <h2 className="text-3xl font-semibold tracking-tight">
              <span className="text-primary">Depression</span>{" "}
              <span className="text-slate-900">Symptoms</span>
            </h2>

            <p className="mt-2 leading-relaxed max-w-xl">
              Depression can affect people differently, but common experiences
              may include:
            </p>

            <ul className="mt-4 space-y-2">
              {items.map((it) => (
                <li key={it} className="flex items-center gap-3">
                  <div className="mt-1 size-7 rounded-md bg-[#EAF7F3] text-primary flex items-center justify-center shrink-0">
                    <Check className="size-4" />
                  </div>
                  <div className="text-sm leading-relaxed">{it}</div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link to="/appointment?type=initial">
                <Button className="bg-gradient-primary" size="lg">
                  Book Online Appointment
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
