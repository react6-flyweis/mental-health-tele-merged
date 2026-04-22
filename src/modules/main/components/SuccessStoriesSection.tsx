"use client";
import { useEffect, useMemo, useState } from "react";
import { StarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { publicPageApi } from "@/api/publicpage.api";

export default function SuccessStoriesSection(props: any) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPages] = useState(1);

  const itemsPerPage = 12;
  const fetchReviews = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      if (props?.data) {
        const reviewsData = props.data || [];
        const normalized = reviewsData.map((r: any) => ({
          authorName: r.authorFirstName,
          authorCountry: r.providerSpecialty,
          authorImageUrl: null,
          rating: r.rating,
          comment: r.quote,
        }));
        setReviews(normalized);
        return;
      }
      const offset = page;

      const res: any = await publicPageApi.getReview({
        limit: itemsPerPage,
        offset,
      });

      const reviewsData = res?.data?.reviews || [];

      setReviews(reviewsData);
      setPages(res?.pages || 1);
      setTotalCount(res?.total || 0);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  // const totalPages = Math.ceil(totalCount / itemsPerPage);
  const pagination = useMemo(() => {
    if (page <= 7) {
      return Array.from({ length: page }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(page - 1, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < page - 3) {
      pages.push("...");
    }

    pages.push(page);
    return pages;
  }, [page, currentPage]);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  if (loading)
    return (
      <p className="text-center h-75 flex justify-center items-center">
        Loading...
      </p>
    );

  if (error)
    return (
      <p className="text-center h-75 flex justify-center items-center">
        {error}
      </p>
    );

  return (
    <section className="py-16">
      <Container>
        <SectionHeader title="Success" subtitle="Stories" />

        <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {reviews.map((s: any, i: number) => (
            <div key={i} className="bg-slate-50 rounded-xl p-4 h-full">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-700 overflow-hidden">
                  {s.authorImageUrl ? (
                    <img
                      src={s.authorImageUrl}
                      alt={s.authorName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>
                      {(s.authorName || "")
                        .split(" ")
                        .filter(Boolean)
                        .map((name: string) => name[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {s.authorName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {s.authorCountry}
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
                {s.comment}
              </p>
            </div>
          ))}
        </div>

        {!props?.data && reviews.length >= itemsPerPage && (
          <nav className="mt-12 flex justify-center items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handleClick(currentPage - 1)}
              className="p-2 rounded-lg border bg-white disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {pagination.map((p, idx) => (
              <button
                key={`${p}-${idx}`}
                onClick={() => typeof p === "number" && handleClick(p)}
                disabled={p === "..."}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  p === currentPage
                    ? "bg-gradient-primary text-white"
                    : "bg-white"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={currentPage === page}
              onClick={() => handleClick(currentPage + 1)}
              className="p-2 rounded-lg border bg-white disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        )}
      </Container>
    </section>
  );
}
