import React from "react";
import Head from "next/head";
import { Feed } from "../components/Feed";
import { fetchCategories, fetchPosts } from "../api/summary";

import { Category, Post } from "../shared/types";

type FrontProps = {
  posts: Post[],
  categories: Category[],
};

/**
 * Next has a concept of static props. Those are the props that Next will inject
 * at build time into a page component. In our case, those props would be
 * categories and posts for the main page.
 *  -> https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 * This will be called server-side only and will not be included in the bundle,
 * wow!
 */
export async function getStaticProps() {
  const categories = await fetchCategories();
  const posts = await fetchPosts();
  return { props: { posts, categories } };
}

// Next requires that page components use default export.
export default function Front({ posts, categories }: FrontProps) {
  return (
    <>
      {/* Head is a component that injects everything we pass as children inside
      of the head element on an HTML page */}
      <Head>
        <title>Front page of the Internet</title>
      </Head>
      <main>
        <Feed posts={posts} categories={categories} />
      </main>
    </>
  )
}
