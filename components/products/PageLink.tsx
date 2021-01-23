import Link from "next/link";
import { PageInfo } from "../../models/product";

type PageLinkProps = {
  slug: string;
  pageInfo: PageInfo;
};

export default function PageLink({
  slug,
  pageInfo: { title, pageNumber },
}: PageLinkProps) {
  return (
    <Link href={`/products/${slug}/${pageNumber}`} passHref>
      <a>
        Page{pageNumber}. {title}
      </a>
    </Link>
  );
}
