import { getAllProductsWithSlug, getProduct } from "../../lib/api"

export default function Product({ product }) {
    return (
        <>
            <h2>{product.title}</h2>
            <p>{ product.description }</p>
        </>

    )
}

export async function getStaticProps({ params }) {
    const data = await getProduct(params.slug)

    return {
      props: {
        product: data　?? null,
      },
    }
  }
  
  export async function getStaticPaths() {
    const allProducts = await getAllProductsWithSlug()
    return {
      paths: allProducts?.map(({ slug }) => `/products/${slug}`) ?? [],
      fallback: true,
    }
  }