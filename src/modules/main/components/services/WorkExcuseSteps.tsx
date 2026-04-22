import arrowIcon from "@/assets/icons/arrow-curve.svg";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

import bulbIcon from "@/assets/icons/bulb.svg";

const steps = [
  {
    title: "Step 1: Book Your Online Medical Appointment",
    description:
      "Sign up and select a convenient date and time for your virtual consultation. A licensed provider will review your symptoms and medical history.",
  },
  {
    title: "Step 2: Attend Your Medical Evaluation",
    description:
      "Join a secure online consultation where the doctor will assess your health, confirm whether time off is medically necessary, and determine the appropriate duration.",
  },
  {
    title: "Step 3: Receive Your Official Work Excuse Letter",
    description:
      "If approved, your certified work excuse letter will be sent to your email shortly after the appointment — you can download and submit it to your employer or HR.",
  },
];

export default function WorkExcuseSteps() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          title="3 Simple Steps To Get A"
          subtitle="Work Excuse Letter Online"
          className="mb-10"
        />

        <div className="relative">
          <div className="grid gap-8 md:grid-cols-3 items-start">
            {steps.map((step) => {
              return (
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
              );
            })}
          </div>

          <div className="hidden md:block pointer-events-none">
            {steps.slice(0, -1).map((_, i) => (
              <img
                key={i}
                src={arrowIcon}
                alt="Arrow"
                width={160}
                height={40}
                className="absolute top-10 transform -translate-y-1/2"
                style={{ left: `${((i + 1) / steps.length) * 100 - 8}%` }}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
