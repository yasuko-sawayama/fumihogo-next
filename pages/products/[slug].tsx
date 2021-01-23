import {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext,
  NextPage,
} from "next";
import React, { useState } from "react";

import { getAllProductsWithSlug, getPage, getProduct } from "../../lib/api";
import { Page, Product } from "../../models/product";

import AuthContent from "../../components/products/AuthContent";
import PageContent from "../../components/products/PageContent";
import TableOfContents from "../../components/products/TableOfContents";

const ProductPage: NextPage<{
  productData: Product;
  firstPageId: string;
  firstPageData: Page;
}> = ({
  productData,
  firstPageId,
  firstPageData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const scope = productData.scope;
  const [showToc, setShowToc] = useState(true);

  return (
    <>
      <div className="p-5 pb-10 border-b border-gray-200 mb-10 lg:w-2/3 mx-auto ">
        <div className="flex items-center ">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {productData.title}
          </h1>
        </div>
        <p className="mt-1 text-lg text-gray-500">{productData.description}</p>
      </div>
      <section className="relative">
        <div className="container px-5 py-8 mx-auto flex flex-col sm:flex-row sm:justify-around">
          {productData.pagesCollection.total > 0 && (
            <TableOfContents data={productData} currentPage={1} />
          )}

          <div className="lg:w-2/3 mx-auto leading-8 tracking-wide text-base relative">
            <div>
              {scope === 0 ? (
                <PageContent {...firstPageData} />
              ) : (
                <AuthContent pageId={firstPageId} />
              )}
            </div>
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
      firstPageId,
      firstPageData: firstPageData,
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
