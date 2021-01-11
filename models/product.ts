export type Product = {
  title: string;
  slug: string;
  description?: string;
  pagesCollection: {
    total: number;
    items: Array<PageInfo>;
  };
};

type PageInfo = {
  sys: {
    id: string;
  };
  title?: string;
  pageNumber: number;
};

export type Page = {
  title?: string;
  pageNumber: number;
  content: any;
};
