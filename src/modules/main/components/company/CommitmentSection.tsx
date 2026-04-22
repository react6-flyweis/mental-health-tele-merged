import { ShieldIcon, TrendingUp, CheckCircle, Award } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Card } from "@/components/ui/card";

const commitments = [
  {
    id: 1,
    title: "Trusted Experience",
    desc: "All our providers bring years of hands-on clinical experience and specialized training in mental healthcare.",
    icon: Award,
  },
  {
    id: 2,
    title: "Continuous Growth",
    desc: "Our clinicians regularly participate in performance reviews, patient feedback sessions, and professional development programs.",
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Careful Selection",
    desc: "Each provider goes through a rigorous screening and credentialing process to ensure compassionate and evidence-based treatment.",
    icon: CheckCircle,
  },
];

export default function CommitmentSection({
  title,
  subtitle,
  features,
}: {
  title?: string;
  subtitle?: string;
  features?: any[];
}) {
  const displayTitle = title || "Our Commitment";
  const displaySubtitle = subtitle || "To Excellence";
  const cards = features && features.length > 0 ? features : commitments;

  return (
    <section className="py-16 bg-white">
      <Container>
        <SectionHeader title={displayTitle} subtitle={displaySubtitle} />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {cards.map((c: any, index: number) => (
            <Card
              key={c.id || c._id || index}
              className="p-5 gap-0 flex flex-col shadow ring-0"
            >
              <div className="size-13 bg-[#B8E8E2] text-primary rounded-xl flex items-center justify-center mb-4">
                {typeof c.icon === "string" ? (
                  <span className="text-2xl">{c.icon}</span>
                ) : c.icon ? (
                  <c.icon className="size-6" />
                ) : (
                  <span className="text-2xl">🌟</span>
                )}
              </div>
              <h4 className="text-lg font-semibold">{c.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                {c.desc || c.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
