import { GetStaticProps } from "next";
import { getAllProductsWithSlug } from "../../lib/api";
import ListItem from "../../components/products/ListItem";
import { Product } from "../../models/product";

type ProductData = {
  allContentData: Product[];
};

export default function AllProducts({ allContentData }: ProductData) {
  return (
    <>
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
            小説一覧
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
            Blue bottle crucifix vinyl post-ironic four dollar toast vegan
            taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi
            pug.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-scarlet-500 inline-flex"></div>
          </div>
        </div>
      </div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <ul>
            {allContentData.map(({ slug, title, scope, description }) => (
              <li key={slug}>
                <ListItem
                  title={title}
                  scope={scope}
                  slug={slug}
                  description={description}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allContentData = (await getAllProductsWithSlug()) ?? [];
  return {
    props: { allContentData },
  };
};
