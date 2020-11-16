import Head from "next/head";
import NextLink from "next/link";
import { GetStaticProps } from "next";
import { Heading, Link, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import styles from "../styles/Home.module.css";
import { getAllProductsWithSlug } from "../lib/api";

const Main = styled.main`
  padding: 5rem 0;
`;

export default function Home({
  allContentData,
}: {
  allContentData: {
    title: string;
    slug: string;
    description: string;
  }[];
}): JSX.Element {
  return (
    <Flex flexDirection="column" alignItems="center" margin={4}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Heading as="h1" size="4xl" marginY="2rem">
          learning <a href="https://nextjs.org">Next.js!</a>
        </Heading>
        <p>fumihogoをNext.jsで作ってみる</p>
        <ul>
          {allContentData.map(({ slug, title }) => (
            <li key={slug}>
              <NextLink href={`/products/${slug}`} passHref>
                <Link>{title}</Link>
              </NextLink>
            </li>
          ))}
        </ul>
      </Main>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allContentData = (await getAllProductsWithSlug()) ?? [];
  return {
    props: { allContentData },
  };
};
