import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

import workExcuseImg from "@/assets/services/work-excuse-letter.png";

export default function WorkExcuseWhyChoose() {
  const features = [
    {
      id: 1,
      number: "01",
      title: "Certified & Licensed Medical Providers",
      desc: "Our experienced healthcare professionals provide accurate medical evaluations and issue legitimate work excuse letters you can trust.",
    },
    {
      id: 2,
      number: "02",
      title: "Legally Valid & Employer-Ready Documentation",
      desc: "All work excuse letters are issued following medical standards and legal guidelines accepted by employers, HR teams, and educational institutions.",
    },
    {
      id: 3,
      number: "03",
      title: "24/7 Appointment Availability & Support",
      desc: "Book appointments anytime and get assistance whenever you need — no waiting rooms, no long delays.",
    },
    {
      id: 4,
      number: "04",
      title: "Affordable & Transparent Pricing",
      desc: "Get professional medical documentation at a fraction of the cost of traditional clinic visits with no hidden fees.",
    },
  ];

  return (
    <section className="py-16 bg-linear-to-r to-60% from-[#f7fcfb] to-white">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 items-start">
          {/* Left: title + description + image (stacked) */}
          <div>
            <SectionHeader
              title="Why Choose Our"
              subtitle="Work Excuse Letter Service"
              align="left"
              description="Our experienced healthcare professionals provide accurate medical evaluations and issue legitimate work excuse letters you can trust."
            />

            <div className="mt-6 max-w-md md:mt-8">
              <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <img
                  src={workExcuseImg}
                  alt="Why choose work excuse letter"
                  className="w-full aspect-4/3 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: numbered features (2x2 grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.id} className="flex flex-col gap-4 items-start">
                <div className="shrink-0 w-12 h-12 rounded-md bg-white shadow-lg flex items-center justify-center text-sm font-semibold text-primary">
                  {f.number}
                </div>

                <div>
                  <div className="text-lg font-semibold text-slate-900">
                    {f.title}
                  </div>
                  <div className="text-muted-foreground mt-2 leading-relaxed">
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
