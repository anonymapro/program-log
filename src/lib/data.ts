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
  // Politique
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
    id: 6,
    title: 'Les résultats des élections signalent un changement politique',
    imageHint: 'bureau de vote',
    content: 'Les récentes élections nationales ont entraîné un changement politique important, le parti d\'opposition obtenant la majorité au parlement pour la première fois en deux décennies. Le nouveau gouvernement a promis de donner la priorité à la santé, à l\'éducation et aux infrastructures. Les analystes politiques observent de près comment ces changements affecteront les politiques nationales et étrangères du pays.',
    excerpt: 'Les récentes élections nationales ont entraîné un changement politique important, avec la victoire du parti d\'opposition.',
    date: '2023-10-21',
    categoryId: 1,
  },
  {
    id: 8,
    title: 'Débat sur la réforme de la santé',
    imageHint: 'hôpital moderne',
    content: 'Un débat intense a lieu au parlement concernant une nouvelle proposition de réforme du système de santé. La proposition vise à universaliser la couverture tout en contrôlant les coûts. Les opinions sont partagées.',
    excerpt: 'Un débat intense a lieu au parlement concernant une nouvelle proposition de réforme du système de santé...',
    date: '2023-11-01',
    categoryId: 1,
  },
  {
    id: 9,
    title: 'Nouvelles régulations environnementales annoncées',
    imageHint: 'forêt luxuriante',
    content: 'Le gouvernement a annoncé une série de nouvelles régulations visant à protéger l\'environnement et à lutter contre le changement climatique. Celles-ci incluent des normes d\'émission plus strictes pour les industries.',
    excerpt: 'Le gouvernement a annoncé de nouvelles régulations pour protéger l\'environnement...',
    date: '2023-11-02',
    categoryId: 1,
  },
  {
    id: 10,
    title: 'Le gouvernement investit dans les infrastructures',
    imageHint: 'pont moderne',
    content: 'Un plan d\'investissement massif dans les infrastructures a été dévoilé, visant à moderniser les routes, les ponts et les transports publics à travers le pays. Le projet devrait créer des milliers d\'emplois.',
    excerpt: 'Un plan d\'investissement massif dans les infrastructures a été dévoilé...',
    date: '2023-11-03',
    categoryId: 1,
  },
  {
    id: 11,
    title: 'Cybersécurité : une priorité nationale',
    imageHint: 'code informatique',
    content: 'Face à l\'augmentation des cyberattaques, le gouvernement a déclaré que la cybersécurité était une priorité nationale. Des fonds supplémentaires seront alloués pour renforcer les défenses numériques du pays.',
    excerpt: 'La cybersécurité est désormais une priorité nationale pour le gouvernement...',
    date: '2023-11-04',
    categoryId: 1,
  },
  // Sports
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
    id: 7,
    title: 'Un athlète vedette annonce sa retraite surprise',
    imageHint: 'portrait d\'athlète',
    content: 'Dans une annonce qui a choqué le monde du sport, le légendaire quarterback John "Le Canon" Davis a annoncé sa retraite. Après une carrière de 15 ans qui comprenait trois titres de champion et de nombreux records, Davis a déclaré vouloir passer plus de temps avec sa famille. Les hommages affluent de la part de ses coéquipiers, de ses rivaux et de ses fans, tous célébrant son incroyable carrière.',
    excerpt: 'Dans une annonce qui a choqué le monde du sport, le légendaire quarterback John "Le Canon" Davis a annoncé sa retraite.',
    date: '2023-10-20',
    categoryId: 2,
  },
  {
    id: 12,
    title: 'Record du monde battu au marathon',
    imageHint: 'coureur de marathon',
    content: 'Un nouveau record du monde a été établi lors du marathon de la ville aujourd\'hui. L\'athlète kényan a terminé la course en un temps incroyable, battant le précédent record de près de deux minutes.',
    excerpt: 'Un nouveau record du monde a été établi lors du marathon de la ville aujourd\'hui...',
    date: '2023-11-05',
    categoryId: 2,
  },
  {
    id: 13,
    title: 'Le mercato estival secoue le monde du football',
    imageHint: 'ballon de football',
    content: 'Le marché des transferts estival a vu plusieurs mouvements de joueurs majeurs, avec des clubs dépensant des sommes records pour s\'attacher les services des plus grandes stars du football mondial.',
    excerpt: 'Le marché des transferts estival a vu plusieurs mouvements de joueurs majeurs...',
    date: '2023-11-06',
    categoryId: 2,
  },
  {
    id: 14,
    title: 'Jeux Olympiques : la ville hôte est annoncée',
    imageHint: 'flamme olympique',
    content: 'Le Comité International Olympique a annoncé la ville qui accueillera les Jeux d\'été dans huit ans. La ville choisie a célébré cette annonce avec des feux d\'artifice et des festivités.',
    excerpt: 'Le Comité International Olympique a annoncé la ville hôte des prochains Jeux d\'été...',
    date: '2023-11-07',
    categoryId: 2,
  },
  {
    id: 15,
    title: 'Une jeune prodige du tennis remporte son premier Grand Chelem',
    imageHint: 'joueuse de tennis',
    content: 'Une étoile montante du tennis a remporté son premier titre du Grand Chelem, battant la numéro un mondiale en finale. À seulement 18 ans, elle est la plus jeune gagnante depuis plus d\'une décennie.',
    excerpt: 'Une étoile montante du tennis a remporté son premier titre du Grand Chelem...',
    date: '2023-11-08',
    categoryId: 2,
  },
  // Culture
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
    id: 16,
    title: 'Un film indépendant remporte la palme d\'or',
    imageHint: 'salle de cinéma',
    content: 'Un film à petit budget a créé la surprise en remportant le premier prix lors d\'un prestigieux festival de cinéma. Le film, qui explore des thèmes sociaux, a été salué par la critique pour son scénario et sa réalisation.',
    excerpt: 'Un film à petit budget a créé la surprise en remportant le premier prix...',
    date: '2023-11-09',
    categoryId: 3,
  },
  {
    id: 17,
    title: 'Un nouvel album d\'un artiste légendaire sort aujourd\'hui',
    imageHint: 'disque vinyle',
    content: 'Après une attente de cinq ans, un musicien de renom a sorti son nouvel album. L\'album est un mélange de genres et a déjà reçu des critiques élogieuses de la part des critiques musicaux.',
    excerpt: 'Après une attente de cinq ans, un musicien de renom a sorti son nouvel album...',
    date: '2023-11-10',
    categoryId: 3,
  },
  {
    id: 18,
    title: 'Un best-seller est adapté en série télévisée',
    imageHint: 'livre ouvert',
    content: 'Un roman populaire qui s\'est vendu à des millions d\'exemplaires est en cours d\'adaptation en série télévisée. Les fans du livre attendent avec impatience de voir leurs personnages préférés prendre vie à l\'écran.',
    excerpt: 'Un roman populaire est en cours d\'adaptation en série télévisée...',
    date: '2023-11-11',
    categoryId: 3,
  },
  {
    id: 19,
    title: 'Un festival de musique annonce sa programmation',
    imageHint: 'scène de concert',
    content: 'Le plus grand festival de musique du pays a annoncé sa programmation pour l\'été prochain. La liste des artistes comprend des têtes d\'affiche de renommée mondiale ainsi que des talents émergents.',
    excerpt: 'Le plus grand festival de musique du pays a annoncé sa programmation...',
    date: '2023-11-12',
    categoryId: 3,
  },
  {
    id: 20,
    title: 'La gastronomie locale à l\'honneur',
    imageHint: 'plat gastronomique',
    content: 'Un événement culinaire met en lumière les saveurs et les traditions de la cuisine locale. Des chefs de renom préparent des plats exclusifs en utilisant des ingrédients locaux, célébrant ainsi le patrimoine culinaire de la région.',
    excerpt: 'Un événement culinaire met en lumière les saveurs et les traditions de la cuisine locale...',
    date: '2023-11-13',
    categoryId: 3,
  },
  // Économie
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
    id: 21,
    title: 'L\'inflation montre des signes de ralentissement',
    imageHint: 'graphique financier',
    content: 'Les derniers chiffres de l\'inflation montrent un ralentissement inattendu, offrant un répit aux consommateurs. La banque centrale pourrait reconsidérer sa politique de hausse des taux d\'intérêt.',
    excerpt: 'Les derniers chiffres de l\'inflation montrent un ralentissement inattendu...',
    date: '2023-11-14',
    categoryId: 4,
  },
  {
    id: 22,
    title: 'Les startups de la tech verte attirent des investissements records',
    imageHint: 'éoliennes',
    content: 'Les investissements dans les startups axées sur les technologies durables ont atteint un nouveau sommet ce trimestre. Les investisseurs sont de plus en plus attirés par les entreprises qui proposent des solutions innovantes aux problèmes environnementaux.',
    excerpt: 'Les investissements dans les startups de technologies durables ont atteint un nouveau sommet...',
    date: '2023-11-15',
    categoryId: 4,
  },
  {
    id: 23,
    title: 'Le chômage tombe à son plus bas niveau depuis 10 ans',
    imageHint: 'professionnels en réunion',
    content: 'Le taux de chômage national est tombé à son plus bas niveau de la décennie, grâce à une forte croissance de l\'emploi dans les secteurs des services et de la construction.',
    excerpt: 'Le taux de chômage national est tombé à son plus bas niveau de la décennie...',
    date: '2023-11-16',
    categoryId: 4,
  },
  {
    id: 24,
    title: 'Le commerce électronique continue sa croissance explosive',
    imageHint: 'personne faisant des achats en ligne',
    content: 'Les ventes du commerce électronique ont continué leur croissance rapide au dernier trimestre, de plus en plus de consommateurs choisissant de faire leurs achats en ligne pour des raisons de commodité et de sécurité.',
    excerpt: 'Les ventes du commerce électronique ont continué leur croissance rapide...',
    date: '2023-11-17',
    categoryId: 4,
  },
  {
    id: 25,
    title: 'L\'immobilier commercial face à de nouveaux défis',
    imageHint: 'gratte-ciel de bureaux',
    content: 'Le secteur de l\'immobilier commercial s\'adapte à l\'essor du télétravail. De nombreux bureaux restent vacants, forçant les propriétaires à repenser leurs modèles économiques et à trouver de nouvelles utilisations pour leurs espaces.',
    excerpt: 'Le secteur de l\'immobilier commercial s\'adapte à l\'essor du télétravail...',
    date: '2023-11-18',
    categoryId: 4,
  },
  // International
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
    id: 26,
    title: 'Un accord commercial majeur signé entre deux continents',
    imageHint: 'poignée de main',
    content: 'Un accord commercial historique a été signé, visant à réduire les barrières commerciales et à stimuler les échanges économiques entre deux grandes régions du monde. L\'accord devrait bénéficier à de nombreuses industries.',
    excerpt: 'Un accord commercial historique a été signé...',
    date: '2023-11-19',
    categoryId: 5,
  },
  {
    id: 27,
    title: 'Des tensions diplomatiques s\'apaisent dans une région clé',
    imageHint: 'colombe de la paix',
    content: 'Des négociations diplomatiques ont abouti à un apaisement des tensions entre deux pays voisins. Cette avancée est considérée comme une étape cruciale vers la paix et la stabilité régionales.',
    excerpt: 'Des négociations diplomatiques ont abouti à un apaisement des tensions...',
    date: '2023-11-20',
    categoryId: 5,
  },
  {
    id: 28,
    title: 'Une crise humanitaire nécessite une réponse mondiale',
    imageHint: 'camp de réfugiés',
    content: 'Les organisations internationales appellent à une action urgente pour faire face à une crise humanitaire croissante. Des millions de personnes ont besoin d\'une aide immédiate en matière de nourriture, d\'eau et d\'abris.',
    excerpt: 'Les organisations internationales appellent à une action urgente pour une crise humanitaire...',
    date: '2023-11-21',
    categoryId: 5,
  },
  {
    id: 29,
    title: 'Découverte scientifique révolutionnaire dans un laboratoire européen',
    imageHint: 'scientifique en laboratoire',
    content: 'Une équipe de scientifiques en Europe a annoncé une découverte qui pourrait révolutionner notre compréhension de la physique fondamentale. Leurs résultats ont été publiés dans une revue scientifique de premier plan.',
    excerpt: 'Une équipe de scientifiques en Europe a annoncé une découverte révolutionnaire...',
    date: '2023-11-22',
    categoryId: 5,
  },
  {
    id: 30,
    title: 'Élection d\'un nouveau dirigeant dans une grande puissance mondiale',
    imageHint: 'drapeau national',
    content: 'Les citoyens d\'une nation influente ont élu un nouveau dirigeant, ce qui pourrait avoir des répercussions importantes sur la géopolitique mondiale. Le monde observe attentivement les premières décisions du nouveau gouvernement.',
    excerpt: 'Les citoyens d\'une nation influente ont élu un nouveau dirigeant...',
    date: '2023-11-23',
    categoryId: 5,
  }
];

let articles: Article[] | null = null;
const ARTICLES_PER_PAGE = 6;

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


export async function getArticles(page = 1): Promise<{ articles: Article[], totalPages: number }> {
  await delay(200);
  const allArticles = await loadArticles();
  const articlesWithCategories = allArticles.map(article => {
    const category = categories.find(c => c.id === article.categoryId);
    return { ...article, categoryName: category?.name || 'Non classé' };
  });

  const sortedArticles = articlesWithCategories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalPages = Math.ceil(sortedArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (page - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = sortedArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  return { articles: paginatedArticles, totalPages };
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

export async function getArticlesByCategory(categorySlug: string, page = 1): Promise<{ articles: Article[], totalPages: number, category?: Category }> {
  await delay(200);
  const allArticles = await loadArticles();
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) {
    return { articles: [], totalPages: 0 };
  }
  const filteredArticles = allArticles.filter(a => a.categoryId === category.id);
  const articlesWithCategories = filteredArticles.map(article => {
    return { ...article, categoryName: category.name };
  });

  const sortedArticles = articlesWithCategories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const totalPages = Math.ceil(sortedArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (page - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = sortedArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
  
  return { articles: paginatedArticles, totalPages, category };
}