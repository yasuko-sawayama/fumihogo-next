import { Document } from "@contentful/rich-text-types";

export type Product = {
  title: string;
  slug: string;
  scope: number;
  description?: string;
  pagesCollection: {
    total: number;
    items: Array<PageInfo>;
  };
};

export type PageInfo = {
  slug: string;
  sys: {
    id: string;
  };
  title?: string;
  pageNumber: number;
};

export type Page = {
  title?: string;
  pageNumber: number;
  content: {
    json: Document;
  };
};
