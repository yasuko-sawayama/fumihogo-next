import { getAllProductsWithSlug, getProduct, getPageById } from "lib/api";
import { Page, Product } from "models/product";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { PageInfo } from "../../../models/product";
import PageContent from "../../../components/products/PageContent";
import AuthContent from "../../../components/products/AuthContent";
import TOCWithAuth from "../../../components/products/TOCWithAuth";

type PageProps = {
  product: Product;
  pageId: string;
  page: Page;
};

export default function ProductPerPage({ product, pageId, page }: PageProps) {
  const scope = product.scope;

  return (
    <>
      <div className="p-5 pb-10 border-b border-gray-200 mb-10 lg:w-2/3 mx-auto ">
        <div className="flex items-center ">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {product.title}
          </h1>
        </div>
      </div>
      <section className="relative">
        <div className="container px-5 py-8 mx-auto flex flex-col sm:flex-row sm:justify-around">
          <TOCWithAuth product={product} page={page} />
          <div className="lg:w-2/3 mx-auto leading-8 tracking-wide text-base relative">
            <div>
              {scope === 0 ? (
                <PageContent {...page} />
              ) : (
                <AuthContent pageId={pageId} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const pageNumber = params?.page ? params.page : 1;

  // 一度でQueryする方法がわからないので
  const product = await getProduct(params?.slug ?? "");
  const pageId = product.pagesCollection.items.find(
    (item: PageInfo) => item.pageNumber === Number(pageNumber)
  )?.sys?.id;

  const page = await getPageById(pageId);

  return {
    props: {
      product,
      pageId,
      page,
    },
  };
};

type pageParam = {
  params: {
    slug: string;
    page: string;
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const allProducts: Product[] = await getAllProductsWithSlug();

  const allPageMap = allProducts.map((product) =>
    product.pagesCollection.items.map((page) => ({
      params: {
        slug: product.slug,
        page: page.pageNumber.toString(),
      },
    }))
  );

  const paths = ([] as pageParam[]).concat(...allPageMap);

  return {
    paths,
    fallback: false,
  };
};
