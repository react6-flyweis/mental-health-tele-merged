import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";

export default function FAQHero({ search, setSearch }: any) {
  return (
    <section className="py-16 bg-[#F3FEFB] relative">
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

      <div className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-block bg-[#CBFBF1] rounded-full px-4 py-1 text-xs font-semibold tracking-wide text-primary">
          FAQ&apos;s
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-2">
          <span className="text-primary block">Frequently</span>
          Asked Questions
        </h1>

        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Find answers to common questions about our services
        </p>

        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-xl">
            <InputGroup className="h-12 pl-5 bg-white/90 border-0 shadow-md rounded-full">
              <InputGroupAddon>
                <Search className="size-4 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                type="search"
                placeholder="Search for questions..."
                aria-label="Search FAQs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
