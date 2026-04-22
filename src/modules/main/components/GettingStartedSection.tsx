import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

import stepImg1 from "@/assets/landing/getting-started-1.png";
import stepImg2 from "@/assets/landing/getting-started-2.png";
import stepImg3 from "@/assets/landing/getting-started-3.png";
import { Link } from "react-router";

export default function GettingStartedSection({
  howItWorksSection,
  howItWorkes,
}: any) {
  const defaultSteps = [
    {
      id: 1,
      title: "Choose A Time That Works For You",
      description:
        "Book An Appointment In Minutes By Selecting A Time That Fits Your Schedule - No Long Wait Times.",
      image: stepImg1,
    },
    {
      id: 2,
      title: "Connect With A Licensed Expert Online",
      description:
        "Meet One-On-One With A Qualified Provider Through A Secure Video Session, Right From Your Home.",
      image: stepImg2,
    },
    {
      id: 3,
      title: "Track Progress And Continue Care",
      description:
        "Review Your Improvements, Follow Up With Your Provider, And Adjust Your Care Plan As Needed.",
      image: stepImg3,
    },
  ];

  const stepsToRender =
    Array.isArray(howItWorkes) && howItWorkes.length > 0
      ? [...howItWorkes]
          .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
          .map((step: any, index: number) => ({
            id: step._id,
            title: step.title,
            description: step.description,
            image: step.imageUrl || defaultSteps[index]?.image || stepImg1,
          }))
      : defaultSteps;

  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeader
          title={howItWorksSection?.title || "Getting Started Is Simple"}
          subtitle={howItWorksSection?.eyebrow || "Just Three Easy Steps"}
          description={
            howItWorksSection?.subtitle ||
            "No Clinic Visits. No Complicated Forms. Just Professional Mental Health Care, Designed To Fit Your Routine."
          }
        />
        <div className="max-w-6xl mx-auto">
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {stepsToRender.map((s: any) => (
              <div key={s.id} className="">
                <Card className="p-0 overflow-hidden">
                  <div className="overflow-hidden h-44 aspect-square">
                    <img
                      src={s.image}
                      alt={s.title}
                      width={1200}
                      height={800}
                      className="object-cover w-full h-full"
                      unoptimized={typeof s.image === "string"}
                    />
                  </div>

                  <CardContent className="pt-4 pb-6">
                    <CardTitle className="text-sm font-semibold text-slate-900">
                      {s.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-xs leading-relaxed h-20 overflow-hidden text-muted-foreground">
                      {s.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center">
            <Link to={howItWorksSection?.ctaUrl || "/onboarding"}>
              <Button size="lg" className="bg-gradient-primary">
                <span>
                  {howItWorksSection?.ctaLabel || "Schedule Your Appointment"}
                </span>
                <ChevronRight />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
