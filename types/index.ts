interface IBaseArticle {
  source: {
    id: string | null;
    name: string;
  };
  image_url?: string;
  source_url?: string;
  author: string;
  title: string;
  description: string;
  // Use url as the unique identifier since the response does not have id
  url: string;
  urlToImage: string;
  pubDate?: string;
  publishedAt: string;
  content: string;
  isPinned?: boolean | null;
}

interface IArticle extends IBaseArticle {
  id: string;
}

type TArticlesReponse = {
  status: string;
  totalResults: number;
  articles: IBaseArticle[];
};
