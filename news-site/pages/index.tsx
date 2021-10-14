import React from "react";
import Head from "next/head";
import { Feed } from "../components/Feed";

// Next requires that page components use default export.
export default function Front() {
  return (
    <>
      {/* Head is a component that injects everything we pass as children inside
      of the head element on an HTML page */}
      <Head>
        <title>Front page of the Internet</title>
      </Head>
      <main>
        <Feed />
      </main>
    </>
  )
}
