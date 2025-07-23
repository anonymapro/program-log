import { ArticleCard } from "@/components/ArticleCard";
import { PaginationControls } from "@/components/PaginationControls";
import { getArticles } from "@/lib/data";

interface HomeProps {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const page = Number(searchParams.page) || 1;
  const { articles, totalPages } = await getArticles(page);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Dernières nouvelles</h1>
        <p className="text-muted-foreground mt-2 text-lg">Votre flash d'information quotidien.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div key={article.id} className="fade-in" style={{ animationDelay: `${index * 100}ms`}}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
       <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        baseUrl="/"
      />
    </div>
  );
}
