import arrowIcon from "@/assets/icons/arrow-curve.svg";
import bulbIcon from "@/assets/icons/bulb.svg";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

const steps = [
  {
    title: "Create Your Account And Book A Visit",
    description:
      "Share Basic Personal Details And Health Information, Then Select A Convenient Time For Your Online Appointment.",
  },
  {
    title: "Meet With A Licensed Provider",
    description:
      "Join A Secure Video Session To Review Your Symptoms, Medical Background, And Possible Treatment Options.",
  },
  {
    title: "Receive Care Recommendations",
    description:
      "If Appropriate, Your Provider Will Issue A Treatment Plan Digitally And Guide You On Next Steps For Treatment.",
  },
];

export default function TreatmentsSteps({ data }: { data?: any }) {
  const currentSteps = data?.howItWorksSteps || steps;
  const titleWords = (
    data?.howItWorksTitle || "Getting Treatments Online Is Simple"
  ).split(" ");
  const midIndex = Math.ceil(titleWords.length / 2);
  const title = titleWords.slice(0, midIndex).join(" ");
  const subtitle = titleWords.slice(midIndex).join(" ");

  return (
    <section className="py-16">
      <Container>
        <SectionHeader title={title} subtitle={subtitle} className="mb-10" />

        <div className="relative">
          <div className="grid gap-8 md:grid-cols-3 items-start">
            {currentSteps.map((step: any) => (
              <div key={step.title} className="text-center px-4">
                <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-lg bg-gradient-primary text-white mb-4">
                  <img src={bulbIcon} alt="Bulb" width={40} height={40} />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="hidden md:block pointer-events-none">
            {currentSteps.slice(0, -1).map((_: any, i: number) => (
              <img
                key={i}
                src={arrowIcon}
                alt="Arrow"
                width={160}
                height={40}
                className="absolute top-10 transform -translate-y-1/2"
                style={{
                  left: `${((i + 1) / currentSteps.length) * 100 - 8}%`,
                }}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
