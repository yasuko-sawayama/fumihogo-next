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
      <a className="hover:text-gray-800 hover:bg-scarlet-200 flex items-center p-2 my-1 transition-colors duration-200  text-gray-800 rounded-md bg-white">
        Page{pageNumber}. {title}
      </a>
    </Link>
  );
}
