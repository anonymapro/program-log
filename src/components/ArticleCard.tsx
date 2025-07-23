import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';
import type { Article } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <Link href={`/article/${article.id}`}>
          <div className="relative h-48 w-full">
            <Image
              src={article.generatedImageUrl}
              alt={article.title}
              fill
              className="object-cover"
              data-ai-hint={article.imageHint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        {article.categoryName && (
           <Link href={`/category/${article.categoryName.toLowerCase()}`}>
            <Badge variant="outline" className="mb-2">{article.categoryName}</Badge>
          </Link>
        )}
        <CardTitle className="font-headline text-xl leading-tight">
           <Link href={`/article/${article.id}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </CardTitle>
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <time dateTime={article.date}>
            {format(new Date(article.date), "d MMMM yyyy", { locale: fr })}
          </time>
        </div>
        <p className="mt-4 text-base text-muted-foreground font-body">
          {article.excerpt}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/article/${article.id}`}>
            Lire la suite
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
