import { StarIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

export default function PatientTestimonialsSection({ data }: { data?: any }) {
  const stats = [
    { value: "4.9/5", label: "Average Provider Rating" },
    { value: "90%+", label: "Patients Report Excellent Care" },
    { value: "30,000+", label: "Completed Appointments" },
  ];

  const stories = [
    {
      name: "John Deo",
      country: "United States",
      rating: "5.0",
      text: "I Wanted A Natural Solution Without Harsh Side Effects, And This Capsule Delivered! Within A Week, I Felt More Energized, And My Stamina Improved. Definitely Worth It!",
    },
    {
      name: "Kianna Curtis",
      country: "United States",
      rating: "5.0",
      text: "This Product Has Completely Changed My Intimate Life. I Feel More Passionate And Confident, And The Effects Last For Hours. I Never Expected Such A Huge Difference!",
    },
    {
      name: "Corey Bergson",
      country: "United States",
      rating: "5.0",
      text: "I Was Struggling With Low Energy And Performance Issues, But After Using [Product Name] For A Month, I Feel Like I'm In My 20s Again! My Confidence Is Back",
    },
  ];

  return (
    <section className="py-16">
      <Container>
        {/* header */}
        <div className="mb-8">
          <SectionHeader title="What Our" subtitle="Patients Says" />
        </div>
        {/* stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-6 shadow-xl text-center text-white bg-gradient-primary"
            >
              <div className="text-3xl font-semibold">{s.value}</div>
              <div className="text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* testimonials */}
        <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {stories.map((s, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-4 h-full">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-700">
                  {s.name.split(" ")[0][0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {s.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {s.country}
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1 text-sm text-amber-500">
                  <span className="font-semibold text-slate-900">
                    {s.rating}
                  </span>
                  <StarIcon className="w-4 h-4 fill-current" />
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
