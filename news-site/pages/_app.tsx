/**
 * Once we've created all of the components we're going to need, we want to use
 * them in the app layout.
 *
 * One possibility for how to use them is to include components in pages/index.tsx
 * right away. That would work, but then we would have to include those components
 * in the code of every new page we're going to create. This is not convenient and
 * it violates the DRY principle (Don't Repeat Yourself).
 *
 * For this problem, Next has a solution. We can create a component that will be
 * like a wrapper for every page Next is going to render. This component is App.
 * -> https://nextjs.org/docs/advanced-features/custom-app
 *
 * Next uses the App component to initialize pages. We can override it and control
 * the page initialization. It may be useful for:
 *  * Persisting layout between page changes
 *  * Keeping state when navigating pages
 *  * Injecting additional data into pages
 *  * Adding global CSS
 *
 * Custom getInitialProps() in App will disable Automatic Static Optimization
 * in pages without Static Generation
 */
import React from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { Center } from "../components/Center";
import { GlobalStyle, theme } from "../shared/theme";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <Head>
        <title>What's Next?!</title>
      </Head>

      <Header />
      <main className="main">
        <Center>
          <Component {...pageProps} />
        </Center>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
