import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/data";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return { title: "Catégorie non trouvée" };
  }
  return {
    title: `${category.name} - InfoFlash`,
    description: `Actualités et articles dans la catégorie ${category.name}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  const articles = await getArticlesByCategory(params.slug);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          {category.name}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Affichage des articles de la catégorie &quot;{category.name}&quot;.
        </p>
      </div>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={article.id} className="fade-in" style={{ animationDelay: `${index * 100}ms`}}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-16">
          <p>Aucun article trouvé dans cette catégorie pour le moment.</p>
        </div>
      )}
    </div>
  );
}
