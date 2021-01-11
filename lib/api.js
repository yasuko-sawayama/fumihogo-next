async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

const PRODUCT_GRAPHQL_FIELDS = `
slug
title
description
pagesCollection {
  total
  items {
    sys {
      id
    }
    title
    pageNumber
  }
}
`;

function extractProductEntries(fetchResponse) {
  return fetchResponse?.data?.productCollection?.items;
}

function extractProduct(fetchResponse) {
  return fetchResponse?.data?.productCollection?.items?.[0];
}

export async function getAllProductsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
        productCollection(where: { slug_exists: true }, order: slug_DESC) {
          items {
            ${PRODUCT_GRAPHQL_FIELDS}
          }
        }
      }`
  );
  return extractProductEntries(entries);
}

export async function getProduct(slug) {
  const entry = await fetchGraphQL(
    `query {
          productCollection(where: { slug: "${slug}"}, limit: 1) {
            items {
              ${PRODUCT_GRAPHQL_FIELDS}
            }
          }
        }`
  );

  return extractProduct(entry);
}

export async function getPage(id) {
  const data = await fetchGraphQL(
    `query {
        page(id: "${id}") {
          title
          pageNumber
          content {
            json
          }
        }
    }`
  );

  return data.data.page;
}
