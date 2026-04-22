import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export interface Article {
  title: string;
  href: string;
  category: string;
  date: string;
  description: string;
  image: string;
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to={article.href} className="group">
      <Card className="h-full p-0 shadow-sm">
        <div className="relative w-full h-48 bg-gray-100">
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              className="object-cover rounded-t-xl w-full h-full"
            />
          ) : null}
        </div>

        <CardContent className="flex flex-col flex-1 p-3 pt-1">
          <div className="flex justify-between items-center gap-2 mb-2">
            <Badge className="bg-[#CBFBF1] text-primary">
              {article.category}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {article.date}
            </span>
          </div>

          <CardTitle className="line-clamp-2">{article.title}</CardTitle>

          <CardDescription className="mt-1 text-sm line-clamp-3">
            {article.description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
