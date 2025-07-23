export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Article {
  id: number;
  title: string;
  imageUrl: string;
  imageHint: string;
  content: string;
  excerpt: string;
  date: string;
  categoryId: number;
  categoryName?: string;
}
