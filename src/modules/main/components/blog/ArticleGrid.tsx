"use client";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/modules/main/components/section-header";
import ArticleCard, { Article } from "./ArticleCard";
import { publicPageApi } from "@/api/publicpage.api";
import { useSearchParams } from "react-router";

export default function ArticleGrid() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag");
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchBlogs = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const res: any = await publicPageApi.getBlog({
        limit: itemsPerPage,
        page: page,
        category: tag ?? "",
      });

      let posts = res?.data?.posts || [];
      setTotalCount(res?.pages || 0);

      if (tag && tag !== "All") {
        posts = posts.filter((item: any) =>
          item.tags?.some((t: string) => t.toLowerCase() === tag.toLowerCase()),
        );
      }

      const formatted = posts.map((item: any) => ({
        title: item.title,
        href: `/blog/${item.slug}`,
        category: item.category,
        date: new Date(item.publishedAt).toLocaleDateString(),
        description: item.excerpt,
        image: item.coverImageUrl,
      }));

      setArticles(formatted);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage, tag]);

  useEffect(() => {
    setCurrentPage(1);
  }, [tag]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const pagination = useMemo(() => {
    if (totalCount <= 7) {
      return Array.from({ length: totalCount }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalCount - 1, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalCount - 3) {
      pages.push("...");
    }

    pages.push(totalCount);
    return pages;
  }, [totalCount, currentPage]);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  if (loading)
    return (
      <p className="text-center h-[300px] flex items-center justify-center">
        Loading...
      </p>
    );

  if (error)
    return (
      <p className="text-center h-[300px] flex items-center justify-center">
        {error}
      </p>
    );
  if (!loading && articles.length === 0) {
    return (
      <p className="text-center h-[300px] flex items-center justify-center">
        No blogs found
      </p>
    );
  }

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <SectionHeader title="Latest" subtitle="Articles" className="mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.href} article={article} />
        ))}
      </div>

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
              p === currentPage ? "bg-gradient-primary text-white" : "bg-white"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          disabled={currentPage === totalCount}
          onClick={() => handleClick(currentPage + 1)}
          className="p-2 rounded-lg border bg-white disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </section>
  );
}
