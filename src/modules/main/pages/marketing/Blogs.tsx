import BlogHero from "@/modules/main/components/blog/BlogHero";
import ArticleGrid from "@/modules/main/components/blog/ArticleGrid";

import { Suspense } from "react";

export default function page() {
  // filter by tag from url if provided
  //   const activeTag = searchParams?.tag || "";

  return (
    <>
      <Suspense fallback={<div className="h-20" />}>
        <BlogHero />
      </Suspense>

      <Suspense fallback={<div>Loading articles...</div>}>
        <ArticleGrid />
      </Suspense>
    </>
  );
}
