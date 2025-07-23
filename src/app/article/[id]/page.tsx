import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';
import { getArticleById } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getArticleById(Number(params.id));
  if (!article) {
    return { title: "Article non trouvé" };
  }
  return {
    title: `${article.title} - InfoFlash`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleById(Number(params.id));

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto fade-in">
      <div className="space-y-4 text-center mb-8">
        {article.categoryName && (
          <Link href={`/category/${article.categoryName.toLowerCase()}`}>
            <Badge variant="default" className="text-sm">{article.categoryName}</Badge>
          </Link>
        )}
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center justify-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <time dateTime={article.date}>
            Publié le {format(new Date(article.date), "d MMMM yyyy", { locale: fr })}
          </time>
        </div>
      </div>
      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
        <Image
          src={article.generatedImageUrl}
          alt={article.title}
          fill
          className="object-cover"
          data-ai-hint={article.imageHint}
          priority
        />
      </div>
      <div className="prose lg:prose-xl max-w-none font-body text-foreground/90">
        <p className="text-lg leading-relaxed">{article.content}</p>
      </div>
    </article>
  );
}
