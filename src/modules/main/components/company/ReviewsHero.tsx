import bgPattern from "@/assets/landing/hero/bg-pattern.png";

import {
  Star,
  CheckCircle,
  ShieldCheck,
  Users,
  ThumbsUp,
  ShieldIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

export default function ReviewsHero() {
  return (
    <section className="relative py-20 bg-[#F3FEFB]">
      <Container>
        {/* background patterns */}
        <div className="absolute -top-5 -scale-x-100 z-0 opacity-50 max-w-xs">
          <img
            src={bgPattern}
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute z-0 -top-5 right-0 opacity-50 max-w-xs">
          <img
            src={bgPattern}
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>

        {/* content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            <span className="text-primary">Trusted By Thousands On Their</span>{" "}
            Mental Wellness Journey
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Real stories from real people. Discover how our care team has helped
            individuals feel heard, supported, and empowered every day.
          </p>

          {/* badges row (image-accurate layout) */}
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-center sm:space-x-6 space-y-4 sm:space-y-0">
            <div className="flex items-center bg-white rounded-2xl shadow-md px-6 py-4">
              <div className="flex mr-4">
                {[...Array(4)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
                <Star className="w-5 h-5 text-gray-300 fill-current" />
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold text-slate-900">
                  4.6/5
                </div>
                <div className="text-sm text-muted-foreground">
                  Average Rating
                </div>
              </div>
            </div>

            <div className="flex items-center bg-white rounded-2xl shadow-md px-6 py-4">
              <ShieldIcon className="w-6 h-6 text-primary mr-4" />
              <div className="text-left">
                <div className="text-lg font-semibold text-slate-900">
                  Accredited
                </div>
                <div className="text-sm text-muted-foreground">
                  Healthcare Provider
                </div>
              </div>
            </div>

            <div className="flex items-center bg-white rounded-2xl shadow-md px-6 py-4">
              <CheckCircle className="w-6 h-6 text-primary mr-4" />
              <div className="text-left">
                <div className="text-lg font-semibold text-slate-900">
                  Verified
                </div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
            </div>
          </div>
        </div>
        {/* stats cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: Star, // provider satisfaction
              value: "4.9 / 5",
              label: "Average provider satisfaction score",
            },
            {
              icon: ThumbsUp,
              value: "92%",
              label: "of patients rate their experience as excellent",
            },
            {
              icon: Users,
              value: "35,000+",
              label: "successful consultations completed",
            },
          ].map((stat, idx) => (
            <Card
              key={idx}
              className="flex flex-col items-center justify-center p-6 gap-0 ring-0 shadow-md rounded-2xl"
            >
              <div className="p-3 bg-[#F0FDFA] rounded-xl mb-2">
                <stat.icon className="size-6 text-primary" />
              </div>
              <span className="text-3xl font-semibold text-teal-600">
                {stat.value}
              </span>
              <span className="mt-1 text-sm text-center text-muted-foreground">
                {stat.label}
              </span>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
