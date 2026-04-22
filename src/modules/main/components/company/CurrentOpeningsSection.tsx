import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import CareersList from "./CareersList";

export default function CurrentOpeningsSection({
  loading,
  error,
  careers,
}: {
  loading: boolean;
  error: string | null;
  careers: any;
}) {
  return (
    <section id="openings" className="py-16 bg-white">
      <Container>
        <SectionHeader
          title="Current"
          subtitle="Opening"
          description="Find your next career opportunity and join a team that values your growth and contribution."
          align="center"
        />

        <div className="mt-10 max-w-3xl mx-auto space-y-4">
          <CareersList careers={careers} loading={loading} error={error} />
        </div>
      </Container>
    </section>
  );
}
