import { PageInfo, Product } from "../../models/product";
import PageLink from "./PageLink";
import { sortedPages } from "../../lib/utils";

type TOCProps = {
  data: Product;
  currentPage: number;
};

export default function TableOfContents({
  data: { slug, pagesCollection },
  currentPage,
}: TOCProps) {
  return (
    <div className="relative bg-white dark:bg-gray-800">
      <div className="flex flex-col sm:flex-row sm:justify-around">
        <div className="w-72 h-screen">
          <nav className="mt-10 px-6 ">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              もくじ
            </h3>
            <div className="text-sm text-right w-auto mr-10 mb-2">
              total {pagesCollection.total} pages.
            </div>

            <ul>
              {sortedPages(pagesCollection).map((page: PageInfo) => (
                <li key={page.sys.id}>
                  {page.pageNumber === currentPage ? (
                    <span className="text-gray-800 bg-scarlet-200 flex items-center p-2 my-1 rounded-md ">
                      Page1. {page.title}
                    </span>
                  ) : (
                    <PageLink slug={slug} pageInfo={page} />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
