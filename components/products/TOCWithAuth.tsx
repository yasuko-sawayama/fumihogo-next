import { useFetchUser } from "lib/user";
import TableOfContents from "./TableOfContents";
import { Product, Page } from "../../models/product";

type TOCWithAuthProps = {
  product: Product;
  page: Page;
};

export default function TOCWithAuth({ product, page }: TOCWithAuthProps) {
  const scope = product.scope;
  const { user, loading } = useFetchUser();

  if (scope > 0) {
    if (loading) return <div>...</div>;
    if (!user) return null;
    return <TableOfContents data={product} currentPage={page.pageNumber} />;
  }
  return <TableOfContents data={product} currentPage={page.pageNumber} />;
}
