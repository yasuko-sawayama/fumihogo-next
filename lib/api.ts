async function fetchGraphQL(query, preview = false) {
    return fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            preview
              ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
              : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
        },
        body: JSON.stringify({ query }),
      }
    ).then((response) => response.json())
}

const PRODUCT_GRAPHQL_FIELDS = `
slug
title
description
`

function extractProductEntries(fetchResponse) {
    return fetchResponse?.data?.productCollection?.items
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
    )
    return extractProductEntries(entries)
  }