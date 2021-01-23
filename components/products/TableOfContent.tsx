import { PageInfo, Product } from "../../models/product";
import PageLink from "./PageLink";

type TOCProps = {
  data: Product;
  currentPage: number;
};

export default function TableOfContent({
  data: { slug, pagesCollection },
  currentPage,
}: TOCProps) {
  return (
    <>
      {pagesCollection.total}
      <ul>
        {pagesCollection.items.map((page: PageInfo) => (
          <li key={page.sys.id}>
            {page.pageNumber === currentPage ? (
              <span>Page1. {page.title}</span>
            ) : (
              <PageLink slug={slug} pageInfo={page} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
