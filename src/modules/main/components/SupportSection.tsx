import { ChevronRight } from "lucide-react";
import supportImg from "@/assets/landing/support.png";
import mapImg from "@/assets/landing/map.png";
import { Button } from "@/components/ui/button";
import targetIcon from "@/assets/icons/target.svg";
import badgeIcon from "@/assets/icons/badge.svg";
import speakerIcon from "@/assets/icons/speaker.svg";
import { Container } from "@/components/ui/container";
import { Link } from "react-router";

export default function SupportSection({ data }: any) {
  const features =
    data?.bullets
      ?.slice()
      ?.sort(
        (a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
      ) || [];

  return (
    <section className="py-16 md:py-20 space-y-12">
      <div>
        <Container>
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold leading-relaxed">
                <span className="block text-primary">{data?.title}</span>
                <span className="block text-slate-900 font-semibold">
                  {data?.subtitle}
                </span>
              </h2>

              <ul className="mt-8 space-y-6">
                {features.map((item: any, index: number) => {
                  const icons = [badgeIcon, targetIcon, speakerIcon];
                  const Icon = icons[index % icons.length];

                  return (
                    <li key={item.heading}>
                      <div className="flex gap-2 items-center">
                        <div className="size-8 rounded-full bg-[#2195801A] flex items-center justify-center shrink-0">
                          <img
                            src={Icon}
                            alt=""
                            className="size-6"
                            width={100}
                          />
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          {item.heading}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {item.body}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex justify-center md:justify-end h-96">
              <div className="relative w-full h-full max-w-md">
                <div className="absolute -inset-2 rounded-2xl border-2 border-primary w-4/5"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={data?.imageUrl || supportImg}
                    alt=""
                    width={100}
                    height={96}
                    className="object-cover w-full h-96"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div>
        <Container>
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 items-center">
            <div className="flex justify-center md:justify-start">
              <div className="relative w-full max-w-lg">
                <div className="relative">
                  <img
                    src={mapImg}
                    alt=""
                    className="object-contain w-full h-auto"
                    width={100}
                    height={96}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-primary">
                {data?.title?.toUpperCase()}
              </h3>
              <h2 className="text-2xl md:text-3xl font-medium mt-2">
                <span className="block text-slate-900 font-semibold">
                  WHERE YOU ARE
                </span>
              </h2>

              {features[0] && (
                <div className="mt-6">
                  <div className="flex items-center gap-4">
                    <div className="size-8 flex items-center justify-center bg-[#2195801A] rounded-full">
                      <img
                        src={targetIcon}
                        alt=""
                        className="size-5"
                        width={100}
                        height={96}
                      />
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {features[0].heading}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {features[0].body}
                  </p>
                </div>
              )}

              <div className="mt-6 border-t pt-4">
                <Link to={data?.ctaUrl ?? ""}>
                  <Button size={"lg"} className="bg-gradient-primary">
                    {data?.ctaLabel} <ChevronRight />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
