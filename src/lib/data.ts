import type { Article, Category } from './types';
import { generateImage } from '@/ai/flows/generate-image-flow';

const categories: Category[] = [
  { id: 1, name: 'Politique', slug: 'politique' },
  { id: 2, name: 'Sports', slug: 'sports' },
  { id: 3, name: 'Culture', slug: 'culture' },
  { id: 4, name: 'Économie', slug: 'economie' },
  { id: 5, name: 'International', slug: 'international' },
];

const articlesData: Omit<Article, 'imageUrl' | 'generatedImageUrl'>[] = [
  {
    id: 1,
    title: 'Une nouvelle législation est adoptée à l\'unanimité',
    imageHint: 'bâtiment gouvernemental',
    content: 'Dans une décision historique, le sénat a adopté une nouvelle législation visant à réformer le code des impôts. Le vote a été unanime, un spectacle rare dans le climat politique actuel. Les experts affirment que cela pourrait avoir un impact significatif sur l\'économie pour les années à venir. Le projet de loi comprend plusieurs dispositions clés, notamment une réduction des impôts sur les sociétés et une augmentation des crédits d\'impôt pour les énergies renouvelables. Les partisans du projet de loi soutiennent qu\'il stimulera la croissance économique et créera des emplois, tandis que les critiques expriment leur inquiétude quant à son impact potentiel sur la dette nationale.',
    excerpt: 'Dans une décision historique, le sénat a adopté une nouvelle législation visant à réformer le code des impôts...',
    date: '2023-10-26',
    categoryId: 1,
  },
  {
    id: 2,
    title: 'L\'équipe locale remporte le championnat dans une victoire surprise',
    imageHint: 'stade de sport',
    content: 'L\'équipe locale de la ville, les Wildcats, a remporté le championnat national dans un match dont on parlera pendant des générations. Ils ont battu les champions en titre, les Titans, dans une superbe victoire 4-3. Le but final a été marqué dans les 10 dernières secondes de la prolongation, plongeant la foule dans une frénésie. Le capitaine de l\'équipe a félicité les fans pour leur soutien indéfectible tout au long de la saison.',
    excerpt: 'L\'équipe locale de la ville, les Wildcats, a remporté le championnat national dans un match qui restera dans les mémoires.',
    date: '2023-10-25',
    categoryId: 2,
  },
  {
    id: 3,
    title: 'Une nouvelle exposition d\'art célèbre les talents locaux en centre-ville',
    imageHint: 'galerie d\'art',
    content: 'Le Musée d\'Art Moderne a dévoilé sa dernière exposition, "Paysages Urbains", présentant des œuvres de plus de 50 artistes locaux. La collection explore la relation entre les environnements urbains et l\'expérience humaine. La soirée d\'ouverture a été un succès retentissant, avec des centaines d\'amateurs d\'art présents. L\'exposition sera ouverte au public jusqu\'à la fin de l\'année.',
    excerpt: 'Le Musée d\'Art Moderne a dévoilé sa dernière exposition, "Paysages Urbains", qui met en vedette des œuvres de plus de 50 artistes locaux.',
    date: '2023-10-24',
    categoryId: 3,
  },
  {
    id: 4,
    title: 'Le marché boursier atteint un niveau record en plein essor technologique',
    imageHint: 'marché boursier',
    content: 'Le marché boursier a atteint un nouveau record cette semaine, porté par un boom dans le secteur de la technologie. Les principaux géants de la technologie ont annoncé des bénéfices supérieurs aux prévisions, renforçant la confiance des investisseurs. Les analystes financiers sont optimistes quant à l\'avenir du marché, but conseillent la prudence car la volatilité pourrait être à l\'horizon. La récente flambée a été attribuée aux innovations dans l\'intelligence artificielle et le cloud computing.',
    excerpt: 'Le marché boursier a atteint un nouveau record cette semaine, porté par une forte croissance du secteur technologique.',
    date: '2023-10-23',
    categoryId: 4,
  },
  {
    id: 5,
    title: 'Un sommet mondial aborde le changement climatique',
    imageHint: 'dirigeants mondiaux',
    content: 'Des dirigeants du monde entier se sont réunis pour un sommet mondial afin de discuter des stratégies de lutte contre le changement climatique. Le sommet a abouti à un nouvel accord international visant à réduire les émissions de carbone de 30 % au cours de la prochaine décennie. Les groupes environnementaux ont salué l\'accord comme une avancée significative, mais soulignent que des mesures supplémentaires sont nécessaires pour prévenir une catastrophe climatique.',
    excerpt: 'Des dirigeants du monde entier se sont réunis lors d\'un sommet mondial pour discuter des stratégies de lutte contre le changement climatique.',
    date: '2023-10-22',
    categoryId: 5,
  },
  {
    id: 6,
    title: 'Les résultats des élections signalent un changement politique',
    imageHint: 'bureau de vote',
    content: 'Les récentes élections nationales ont entraîné un changement politique important, le parti d\'opposition obtenant la majorité au parlement pour la première fois en deux décennies. Le nouveau gouvernement a promis de donner la priorité à la santé, à l\'éducation et aux infrastructures. Les analystes politiques observent de près comment ces changements affecteront les politiques nationales et étrangères du pays.',
    excerpt: 'Les récentes élections nationales ont entraîné un changement politique important, avec la victoire du parti d\'opposition.',
    date: '2023-10-21',
    categoryId: 1,
  },
  {
    id: 7,
    title: 'Un athlète vedette annonce sa retraite surprise',
    imageHint: 'portrait d\'athlète',
    content: 'Dans une annonce qui a choqué le monde du sport, le légendaire quarterback John "Le Canon" Davis a annoncé sa retraite. Après une carrière de 15 ans qui comprenait trois titres de champion et de nombreux records, Davis a déclaré vouloir passer plus de temps avec sa famille. Les hommages affluent de la part de ses coéquipiers, de ses rivaux et de ses fans, tous célébrant son incroyable carrière.',
    excerpt: 'Dans une annonce qui a choqué le monde du sport, le légendaire quarterback John "Le Canon" Davis a annoncé sa retraite.',
    date: '2023-10-20',
    categoryId: 2,
  }
];

let articles: Article[] | null = null;

async function loadArticles() {
  if (articles) {
    return articles;
  }

  const generatedArticles = await Promise.all(
    articlesData.map(async (articleData) => {
      const imageUrl = `https://placehold.co/800x450.png`;
      let generatedImageUrl = imageUrl;
      try {
        const generatedImage = await generateImage({ prompt: articleData.imageHint });
        generatedImageUrl = generatedImage.imageUrl;
      } catch (error) {
        console.warn(`La génération d'images a échoué pour l'article "${articleData.title}". Utilisation de l'image de remplacement. \nPour activer la génération d'images, assurez-vous d'avoir une GEMINI_API_KEY dans votre fichier .env. \nErreur: ${error instanceof Error ? error.message : String(error)}`);
      }
      return {
        ...articleData,
        imageUrl,
        generatedImageUrl,
      };
    })
  );
  articles = generatedArticles;
  return articles;
}


// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getCategories(): Promise<Category[]> {
  await delay(100);
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  await delay(100);
  return categories.find(c => c.slug === slug);
}


export async function getArticles(): Promise<Article[]> {
  await delay(200);
  const articles = await loadArticles();
  const articlesWithCategories = articles.map(article => {
    const category = categories.find(c => c.id === article.categoryId);
    return { ...article, categoryName: category?.name || 'Non classé' };
  });
  return articlesWithCategories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticleById(id: number): Promise<Article | undefined> {
  await delay(150);
  const articles = await loadArticles();
  const article = articles.find(a => a.id === id);
  if (article) {
    const category = categories.find(c => c.id === article.categoryId);
    return { ...article, categoryName: category?.name || 'Non classé' };
  }
  return undefined;
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  await delay(200);
  const articles = await loadArticles();
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) {
    return [];
  }
  const filteredArticles = articles.filter(a => a.categoryId === category.id);
  const articlesWithCategories = filteredArticles.map(article => {
    return { ...article, categoryName: category.name };
  });
  return articlesWithCategories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
