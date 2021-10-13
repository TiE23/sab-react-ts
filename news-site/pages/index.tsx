import React from "react";
import Head from "next/head";

// Next requires that page components use default export.
export default function Front() {
  return (
    <>
      {/* Head is a component that injects everything we pass as children inside
      of the head element on an HTML page */}
      <Head>
        <title>Front page of the Internet</title>
      </Head>
      <main>Hello world from Next!</main>
    </>
  )
}
