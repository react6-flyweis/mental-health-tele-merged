import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

import checkIcon from "@/assets/icons/check.svg";

const refillPlans = [
  {
    id: "first-visit",
    title: "First Visit",
    price: "$119",
    subtitle: "Ideal For Individuals Starting Care On Our Platform.",
    bullets: [
      "30-Minute Secure Video Consultation",
      "In-Depth Review Of Symptoms And Medical Background",
      "Personalized Care Recommendations",
      "Medication Guidance When Appropriate",
    ],
    href: "/onboarding?type=initial",
    cta: "Schedule First Visit",
  },
];

export default function RefillPricing({
  title,
  subtitle,
  description,
}: {
  title?: string;
  subtitle?: string;
  description?: string;
}) {
  return (
    <section className="py-16 md:py-20 bg-[#f3faf8]">
      <Container>
        <SectionHeader
          title={title || "Refill Pricing"}
          subtitle={subtitle || ""}
          description={description || ""}
          className="mb-8"
        />

        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 items-start">
          {refillPlans.map((p) => (
            <Card key={p.id} className="border border-primary p-0 rounded-md">
              <CardHeader className="bg-[#eaf7f3] rounded-t-lg border-b border-primary px-6 py-4">
                <CardTitle className="text-xl text-center font-semibold text-slate-900">
                  {p.title}
                </CardTitle>

                <div className="text-primary font-semibold text-lg md:text-xl text-center">
                  {p.price}
                </div>
              </CardHeader>

              <CardContent className="px-6">
                <span className="text-sm font-medium">{p.subtitle}</span>

                <ul className="space-y-3 mt-5 divide-y border-b">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <div className="size-6 rounded-full bg-gradient-primary/10 text-primary flex items-center justify-center mt-1">
                        <img
                          src={checkIcon}
                          alt="Check Icon"
                          className="size-3.5"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {b}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="bg-transparent border-t-0">
                <Link to={p.href}>
                  <Button size="lg" className="bg-gradient-primary">
                    {p.cta}
                    <ArrowRight />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
