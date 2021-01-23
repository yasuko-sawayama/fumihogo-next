import { PageInfo, CollectionType } from "../models/product";

export const sortedPages = (
  pagesCollection: CollectionType<PageInfo>
): PageInfo[] =>
  pagesCollection.items.sort(
    (left, right): number => left.pageNumber - right.pageNumber
  );
