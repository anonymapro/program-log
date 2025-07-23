import { ArticleCard } from "@/components/ArticleCard";
import { getArticles } from "@/lib/data";

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Latest News</h1>
        <p className="text-muted-foreground mt-2 text-lg">Your daily flash of information.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div key={article.id} className="fade-in" style={{ animationDelay: `${index * 100}ms`}}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}
