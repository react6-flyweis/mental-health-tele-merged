import { Container } from "@/components/ui/container";
import { Heart, Globe, Users, Zap } from "lucide-react";
import { SectionHeader } from "@/modules/main/components/section-header";
import { cn } from "@/lib/utils";

export default function CareersMissionSection({ careers }: { careers: any }) {
  const values = [
    {
      id: "patient",
      title: "Patient-First",
      description: "Everything we do starts with empathy and care.",
      icon: Heart,
      gradient: "from-green-200 to-green-50",
    },
    {
      id: "nationwide",
      title: "Nationwide",
      description: "Serving communities across the country.",
      icon: Globe,
      gradient: "from-green-200 to-green-50",
    },
    {
      id: "community",
      title: "Community",
      description: "Building connections that matter.",
      icon: Users,
      gradient: "from-green-100 to-green-50",
    },
    {
      id: "innovation",
      title: "Innovation",
      description: "Leading with technology and creativity.",
      icon: Zap,
      gradient: "from-blue-100 to-blue-50",
    },
  ];
  console.log(careers?.featureCards);
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="mt-10 flex flex-col lg:flex-row items-start gap-10">
          <div className="lg:w-1/2">
            <SectionHeader
              title={
                careers?.featureCardsTitle || "Simplifying Mental Healthcare"
              }
              subtitle={
                careers?.featureCardsSubtitle ||
                "Through Technology & Compassion"
              }
              align="left"
            />
            <p className="mt-4 text-muted-foreground">
              {careers?.featureCardsBody ||
                "Our mission is to simplify access to mental healthcare through technology and compassion. We aim to remove barriers by offering flexible, affordable, and patient-focused services that empower both professionals and patients."}
            </p>
            <p className="mt-4 text-muted-foreground ">
              {careers?.featureCardsDescription2 ||
                "We believe mental wellness should be treated with the same priority as physical health, guided by trust, innovation, and community."}
            </p>
          </div>
          <div className="lg:w-1/2">
            <div className="relative w-full h-full">
              <div className="flex flex-wrap gap-4">
                {(careers?.featureCards ?? [])?.map((v: any, i: number) => (
                  <div
                    key={i}
                    className={cn("w-[45%]", {
                      "pt-8": i % 2 !== 0,
                    })}
                  >
                    <div
                      style={{ background: v?.bgColor }}
                      className={cn(
                        "p-6  rounded-2xl bg-linear-to-br flex flex-col items-start h-full gap-3",
                        v.gradient,
                      )}
                    >
                      <div className="size-10 bg-gradient-primary flex justify-center items-center rounded-xl">
                        {v?.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {v.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {v.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
