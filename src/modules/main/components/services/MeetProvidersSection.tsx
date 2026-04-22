import AutoScroll from "embla-carousel-auto-scroll";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import expertImg1 from "@/assets/landing/expert-1.png";
import expertImg2 from "@/assets/landing/expert-2.png";
import expertImg3 from "@/assets/landing/expert-3.png";
import expertImg4 from "@/assets/landing/expert-4.png";

const defaultProviders = [
  {
    id: 1,
    name: "Dr. Jane Smith, MD",
    description:
      "A Highly Experienced Physician With A Strong Background In Primary Care And Mental Health — Committed To Personalized, Evidence-Based Treatment.",
    image: expertImg4,
  },
  {
    id: 2,
    name: "Dr. Alex Johnson, MD",
    description:
      "A Highly Experienced Physician With A Strong Background In Primary Care And Mental Health — Committed To Personalized, Evidence-Based Treatment.",
    image: expertImg1,
  },
  {
    id: 3,
    name: "Dr. Priya Patel, MD",
    description:
      "A Highly Experienced Physician With A Strong Background In Primary Care And Mental Health — Committed To Personalized, Evidence-Based Treatment.",
    image: expertImg2,
  },
  {
    id: 4,
    name: "Dr. Michael Chichak, MD",
    description:
      "A Highly Experienced Physician With A Strong Background In Primary Care And Mental Health — Committed To Personalized, Evidence-Based Treatment.",
    image: expertImg3,
  },
];

const defaultImages = defaultProviders.map((p) => p.image);

interface TeamMember {
  id?: string | number;
  name?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  specialty?: string;
  bio?: string;
  description?: string;
  imageUrl?: string;
  profileImageUrl?: string;
  image?: string;
}

interface MeetProvidersSectionProps {
  data?: {
    teamTitle?: string;
    teamSubtitle?: string;
    teamDescription?: string;
    teamMembers?: TeamMember[];
  };
  loading?: boolean;
  error?: string | null;
  title?: string;
  subtitle?: string;
  description?: string;
  layout?: "carousel" | "grid";
  rows?: number;
}

export default function MeetProvidersSection({
  data,
  loading,
  error,
  title = "Meet our",
  subtitle = "providers",
  description = "Quality care shouldn't come with surprise costs. Here's exactly what you'll pay.",
  layout = "carousel",
  rows = 1,
}: MeetProvidersSectionProps) {
  const members =
    data?.teamMembers?.length && data.teamMembers.length > 0
      ? data.teamMembers
      : defaultProviders;

  if (loading) {
    return (
      <section className="py-16 text-center">
        <Container>
          <p>Loading providers...</p>
        </Container>
      </section>
    );
  }

  if (error) {
    console.error("Providers API error:", error);
  }

  const renderCard = (p: TeamMember, index: number) => {
    const imageUrl =
      p.imageUrl ||
      p.profileImageUrl ||
      p.image ||
      defaultImages[index % defaultImages.length];

    const displayName =
      p.name ||
      [`Dr.`, p.firstName, p.lastName].filter(Boolean).join(" ").trim() ||
      "Provider";

    const displayRole = p.role || p.specialty || "Provider";

    const displayBio =
      p.bio ||
      p.description ||
      "A Highly Experienced Physician With A Strong Background In Primary Care And Mental Health.";

    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow">
        <div className="overflow-hidden rounded-xl aspect-square mb-3 bg-gray-50">
          <img
            src={imageUrl}
            alt={displayName}
            width={640}
            height={520}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="text-sm font-semibold text-slate-900 line-clamp-1">
          {displayName}
        </div>
        <div className="text-sm font-normal text-slate-900 line-clamp-1">
          {displayRole}
        </div>

        <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">
          {displayBio}
        </p>
      </div>
    );
  };

  return (
    <section className="py-16 bg-transparent">
      <Container>
        <SectionHeader
          title={data?.teamTitle ?? title}
          subtitle={data?.teamSubtitle ?? subtitle}
          description={data?.teamDescription ?? description}
        />

        <div className="mt-8 space-y-6">
          {layout === "carousel" ? (
            Array.from({ length: rows }).map((_, rowIdx) => (
              <Carousel
                key={rowIdx}
                opts={{ loop: true }}
                plugins={[
                  AutoScroll({
                    speed: 1,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                  }),
                ]}
              >
                <CarouselContent className="-ml-4">
                  {members.map((p: TeamMember, index: number) => (
                    <CarouselItem
                      key={`${p.id ?? index}-${index}`}
                      className="pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/4"
                    >
                      {renderCard(p, index)}
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ))
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {members.map((p: TeamMember, index: number) => (
                <div key={`${p.id ?? index}-${index}`}>
                  {renderCard(p, index)}
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
