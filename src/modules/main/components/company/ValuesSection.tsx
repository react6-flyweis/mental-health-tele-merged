import { Heart, Shield, Sparkles } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

export default function ValuesSection({ data, loading, error }: any) {
  const defaultValues = [
    {
      id: 1,
      title: "Empower Growth",
      description:
        "We help individuals take charge of their mental wellness journey through intuitive tools, expert care, and continuous support.",
      icon: Sparkles,
    },
    {
      id: 2,
      title: "Personalized Support",
      description:
        "Every mind is different. Our solutions are tailored to each individual's unique needs using advanced clinical practices and smart technology.",
      icon: Heart,
    },
    {
      id: 3,
      title: "Break the Stigma",
      description:
        "We promote open conversations and create a safe environment where seeking help feels natural and respected.",
      icon: Shield,
    },
  ];

  const valuesData =
    data?.values && data.values.length > 0 ? data.values : defaultValues;

  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeader
          title={data?.valuesTitle || "Our Values"}
          subtitle=""
          description={
            data?.valuesDescription ||
            "These core principles guide everything we do"
          }
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {valuesData.map((v: any, index: number) => {
            const DefaultIcon = defaultValues[index]?.icon || Sparkles;
            const IconComponent = v?.icon || DefaultIcon;

            return (
              <Card
                key={index}
                className="p-6 gap-0 flex flex-col items-start shadow-lg text-center md:text-left"
              >
                <div className="mb-4 flex items-center justify-center rounded-xl bg-gradient-primary p-3">
                  <IconComponent className="size-5 text-white" />
                </div>

                <CardTitle className="text-lg font-semibold">
                  {v.title}
                </CardTitle>
                <CardDescription className="mt-2 text-sm text-muted-foreground">
                  {v.description}
                </CardDescription>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
