import type { Article, Category } from './types';
import { generateImage } from '@/ai/flows/generate-image-flow';

const categories: Category[] = [
  { id: 1, name: 'Politics', slug: 'politics' },
  { id: 2, name: 'Sports', slug: 'sports' },
  { id: 3, name: 'Culture', slug: 'culture' },
  { id: 4, name: 'Economics', slug: 'economics' },
  { id: 5, name: 'International', slug: 'international' },
];

const articlesData: Omit<Article, 'imageUrl' | 'generatedImageUrl'>[] = [
  {
    id: 1,
    title: 'New Legislation Passes in Unanimous Vote',
    imageHint: 'government building',
    content: 'In a landmark decision, the senate passed new legislation aimed at reforming the tax code. The vote was unanimous, a rare sight in today\'s political climate. Experts say this could have a significant impact on the economy for years to come. The bill includes several key provisions, including a reduction in corporate taxes and an increase in tax credits for renewable energy. Supporters of the bill argue that it will stimulate economic growth and create jobs, while critics express concern about its potential impact on the national debt.',
    excerpt: 'In a landmark decision, the senate passed new legislation aimed at reforming the tax code...',
    date: '2023-10-26',
    categoryId: 1,
  },
  {
    id: 2,
    title: 'Local Team Wins Championship in Stunning Upset',
    imageHint: 'sports stadium',
    content: 'The city\'s home team, the Wildcats, have won the national championship in a game that will be talked about for generations. They defeated the reigning champions, the Titans, in a stunning 4-3 victory. The final goal was scored in the last 10 seconds of overtime, sending the crowd into a frenzy. The team\'s captain praised the fans for their unwavering support throughout the season.',
    excerpt: 'The city\'s home team, the Wildcats, have won the national championship in a game that will be talked about for generations.',
    date: '2023-10-25',
    categoryId: 2,
  },
  {
    id: 3,
    title: 'New Art Exhibit Opens Downtown, Celebrates Local Talent',
    imageHint: 'art gallery',
    content: 'The Modern Art Museum has unveiled its latest exhibit, "CityScapes," featuring works from over 50 local artists. The collection explores the relationship between urban environments and the human experience. The opening night was a resounding success, with hundreds of art enthusiasts in attendance. The exhibit will be open to the public until the end of the year.',
    excerpt: 'The Modern Art Museum has unveiled its latest exhibit, "CityScapes," featuring works from over 50 local artists.',
    date: '2023-10-24',
    categoryId: 3,
  },
  {
    id: 4,
    title: 'Stock Market Reaches All-Time High Amidst Tech Boom',
    imageHint: 'stock market',
    content: 'The stock market surged to a new record high this week, driven by a boom in the technology sector. Major tech giants reported better-than-expected earnings, boosting investor confidence. Financial analysts are optimistic about the market\'s future, but advise caution as volatility could be on the horizon. The recent surge has been attributed to innovations in artificial intelligence and cloud computing.',
    excerpt: 'The stock market surged to a new record high this week, driven by a boom in the technology sector.',
    date: '2023-10-23',
    categoryId: 4,
  },
  {
    id: 5,
    title: 'Global Summit Addresses Climate Change',
    imageHint: 'world leaders',
    content: 'Leaders from around the world gathered for a global summit to discuss strategies for combating climate change. The summit resulted in a new international agreement to reduce carbon emissions by 30% over the next decade. Environmental groups have praised the agreement as a significant step forward, but stress that more action is needed to prevent a climate catastrophe.',
    excerpt: 'Leaders from around the world gathered for a global summit to discuss strategies for combating climate change.',
    date: '2023-10-22',
    categoryId: 5,
  },
  {
    id: 6,
    title: 'Election Results Signal Political Shift',
    imageHint: 'voting poll',
    content: 'The recent national election has resulted in a significant political shift, with the opposition party gaining a majority in parliament for the time in two decades. The new government has promised to prioritize healthcare, education, and infrastructure. Political analysts are closely watching to see how these changes will affect the country\'s domestic and foreign policies.',
    excerpt: 'The recent national election has resulted in a significant political shift, with the opposition party gaining a majority.',
    date: '2023-10-21',
    categoryId: 1,
  },
  {
    id: 7,
    title: 'Star Athlete Announces Surprise Retirement',
    imageHint: 'athlete portrait',
    content: 'In a move that has shocked the sports world, legendary quarterback John "The Cannon" Davis has announced his retirement. After a 15-year career that included three championship rings and numerous records, Davis said he wants to spend more time with his family. Tributes have been pouring in from teammates, rivals, and fans, all celebrating his incredible career.',
    excerpt: 'In a move that has shocked the sports world, legendary quarterback John "The Cannon" Davis has announced his retirement.',
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
        console.warn(`Image generation failed for article "${articleData.title}". Using placeholder image. \nTo enable image generation, make sure you have a GEMINI_API_KEY in your .env file. \nError: ${error instanceof Error ? error.message : String(error)}`);
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
    return { ...article, categoryName: category?.name || 'Uncategorized' };
  });
  return articlesWithCategories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticleById(id: number): Promise<Article | undefined> {
  await delay(150);
  const articles = await loadArticles();
  const article = articles.find(a => a.id === id);
  if (article) {
    const category = categories.find(c => c.id === article.categoryId);
    return { ...article, categoryName: category?.name || 'Uncategorized' };
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
