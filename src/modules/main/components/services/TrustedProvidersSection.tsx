import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

import expertImg1 from "@/assets/landing/expert-1.png";
import expertImg2 from "@/assets/landing/expert-2.png";
import expertImg3 from "@/assets/landing/expert-3.png";
import expertImg4 from "@/assets/landing/expert-4.png";
import AutoScroll from "embla-carousel-auto-scroll";

interface Provider {
  id: number;
  name: string;
  description: string;
  image: string;
}

// reuse same list as MeetProvidersSection so the names and pictures match
const providers: Provider[] = [
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

export default function TrustedProvidersSection({ data }: { data?: any }) {
  // Use data if available, else fallback to static providers
  const currentProviders =
    data && data.length > 0
      ? data.map((p: any) => ({
          id: p.id || p._id,
          name: p.fullName || p.name,
          description: p.bio || p.description,
          image: p.profileImageUrl || expertImg1, // fallback if missing
          isStaticImage: !p.profileImageUrl,
        }))
      : providers.map((p) => ({ ...p, isStaticImage: true }));

  const Controls = function Controls() {
    const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
      useCarousel();

    return (
      <div className="w-full flex items-center justify-center gap-3 mt-6">
        <Button
          size="icon-lg"
          className="bg-gradient-primary"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
        >
          <ArrowLeft />
        </Button>
        <Button
          size="icon-lg"
          className="bg-gradient-primary"
          onClick={scrollNext}
          disabled={!canScrollNext}
        >
          <ArrowRight />
        </Button>
      </div>
    );
  };

  // helper to render a provider card
  const renderCard = (p: any) => (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="overflow-hidden rounded-xl aspect-square mb-3 bg-gray-50 flex items-center justify-center text-3xl font-bold text-gray-300">
        {p.isStaticImage ? (
          <img
            src={p.image}
            alt={p.name}
            width={640}
            height={520}
            className="object-cover w-full h-full"
          />
        ) : (
          <img
            src={p.image}
            alt={p.name}
            className="object-cover w-full h-full"
          />
        )}
      </div>

      <div className="text-sm font-semibold text-slate-900">{p.name}</div>
      <p className="text-xs text-muted-foreground mt-2 leading-relaxed h-14 overflow-hidden">
        {p.description}
      </p>
    </div>
  );

  return (
    <section className="py-16 bg-[#2195800D]">
      <Container>
        <SectionHeader
          title="Connect With Trusted Healthcare"
          subtitle="Professionals"
        />

        <div className="max-w-6xl mx-auto mt-10">
          <Carousel
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
              {[...currentProviders, ...currentProviders].map((p, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/4"
                >
                  {renderCard(p)}
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* centered controls below carousel */}
            <div className="relative w-full">
              <Controls />
            </div>
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
