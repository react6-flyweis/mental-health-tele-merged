import dayjs from "dayjs";

export default function SitemapHero({ data }: any) {
  return (
    <section className="py-20 bg-[#F6FFFC] relative overflow-hidden">
      <div className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-block bg-[#CBFBF1] rounded-full px-4 py-1 text-xs font-semibold tracking-wide text-primary">
          Site Map
        </div>

        <h1 className="text-4xl md:text-5xl max-w-lg font-semibold tracking-tight mt-2 mx-auto">
          <span className="text-primary">
            {data?.heroTitle?.split(" ")[0]}
          </span>{" "}
          {data?.heroTitle?.split(" ").slice(1).join(" ")}
        </h1>

        <p className="mt-4 text-sm text-muted-foreground">
          {data?.heroSubtitle}
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Effective Date: {data?.effectiveDate ? dayjs(data?.effectiveDate).format("MMMM DD, YYYY") : ""}
        </p>
      </div>
    </section>
  );
}