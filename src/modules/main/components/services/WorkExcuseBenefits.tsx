import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Container } from "@/components/ui/container";

export default function WorkExcuseBenefits() {
  const benefits = [
    {
      id: 1,
      title: "Workplace Acceptance",
      desc: "Recognized By HR Teams And Management",
    },
    {
      id: 2,
      title: "Medical Verification",
      desc: "Confirms Legitimate Health-Related Absence",
    },
    {
      id: 3,
      title: "Professional Documentation",
      desc: "Ensures Credibility And Trust",
    },
    {
      id: 4,
      title: "Job Protection",
      desc: "Supports Company Attendance Policies",
    },
  ];

  return (
    <section className="py-12 bg-[#F4F9F8]">
      <Container>
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeader
            title="Key Benefits Of A Work"
            subtitle="Excuse Letter"
          />
          <div className="mt-8 space-y-4 flex flex-col items-center">
            {benefits.map((b) => (
              <div
                key={b.id}
                className="w-fit flex items-center gap-4 rounded-lg border  p-3"
              >
                <div className="shrink-0">
                  <div className="size-6 rounded-full bg-gradient-primary text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                </div>

                <div className="flex items-center text-sm text-slate-700 gap-1">
                  <div className="font-medium">{b.title}:</div>
                  <div className="text-muted-foreground">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button className="bg-gradient-primary">
              Schedule A Visit
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
