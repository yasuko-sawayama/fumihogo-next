import {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { getAllProductsWithSlug, getPage, getProduct } from "../../lib/api";
import { Page, Product } from "../../models/product";

const ProductPage: NextPage<{
  productData: Product;
  firstPageData: Page;
}> = ({
  productData,
  firstPageData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className="p-5 pb-10 border-b border-gray-200 mb-10 lg:w-2/3 mx-auto ">
        <div className="flex items-center ">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {productData.title}
          </h1>
        </div>
        <p className="mt-1 text-lg text-gray-500">{productData.description}</p>
        <div>{JSON.stringify(productData)}</div>
      </div>
      <section className="relative">
        <div className="container px-5 py-8 mx-auto">
          <div className="lg:w-2/3 mx-auto leading-8 tracking-wide text-base">
            <div className="mb-4">
              {firstPageData.title && (
                <h2 className="font-semibold text-lg">{firstPageData.title}</h2>
              )}
              <span className="text-sm text-gray-500 right-10 absolute">
                Page {firstPageData.pageNumber}
              </span>
            </div>
            <div>{JSON.stringify(firstPageData)}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const data: Product = await getProduct(params?.slug ?? "");
  const firstPageId = data.pagesCollection.items[0].sys.id;
  const firstPageData: Page = await getPage(firstPageId);

  return {
    props: {
      productData: data ?? null,
      firstPageData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allProducts: Product[] = await getAllProductsWithSlug();
  const paths = allProducts.map((product) => ({
    params: { slug: product.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};
