import { useFetchUser } from "lib/user";
import TableOfContents from "./TableOfContents";

export default function TOCWithAuth({ product, page }) {
  const scope = product.scope;
  const { user, loading } = useFetchUser();
  if (scope > 0) {
    if (loading) return <div>...</div>;
    if (!user) return null;
    return <TableOfContents data={product} currentPage={page.pageNumber} />;
  }
  return <TableOfContents data={product} currentPage={page.pageNumber} />;
}
