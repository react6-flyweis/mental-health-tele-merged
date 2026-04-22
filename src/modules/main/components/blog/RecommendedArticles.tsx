import { Link } from "react-router";
import { ExternalLinkIcon } from "lucide-react";
import ArticleCard from "./ArticleCard";
import { articles } from "@/lib/blog";

// compute recommended list (simple slice for now)
const recommendedArticles = articles.slice(0, 3);

interface RecommendedArticlesProps {
  relatedPost: any[];
}

export default function RecommendedArticles({ relatedPost }: RecommendedArticlesProps) {
  return (
    <section className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Recommended Articles</h2>
        <Link
          to="/blog"
          className="text-teal-600 hover:underline flex items-center gap-1"
        >
          View all <ExternalLinkIcon className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPost.map((article) => (
          <ArticleCard key={article.href} article={article} />
        ))}
      </div>
    </section>
  );
}
