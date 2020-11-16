import {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { getAllProductsWithSlug, getProduct } from "../../lib/api";

const ProductPage: NextPage<{
  productData: Product;
}> = ({ productData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h2>{productData.title}</h2>
      <p>{productData.description}</p>
    </>
  );
};

type Product = {
  title: string;
  slug: string;
  description: string;
};

export default ProductPage;

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const data = await getProduct(params.slug);

  return {
    props: {
      productData: data ?? null,
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
