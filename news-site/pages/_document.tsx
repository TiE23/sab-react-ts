/**
 * We've chosen to use "Pemanent Marker" font.
 *
 * We can use Google Fonts to get this font, however, it is not yet clear where
 * we can place a link element with a link to a stylesheet with this font. We
 * could include it in MyApp component, but Next has another option called custom
 * Document component.
 * -> https://nextjs.org/docs/advanced-features/custom-document
 *
 * Next's Document component not only encapsulates html and body declarations
 * but can also include initial props for expressing asynchronous server-rendering
 * data requirements. In our case, initial props would be the styles across the
 * application.
 * -> https://nextjs.org/docs/api-reference/data-fetching/getInitialProps#context-object
 *
 * But why not just render styled components as we usually do? That's a tricky
 * question because since we want to create an application that is being rendered
 * on a server and then gets “hydrated” on a client, we have to make sure that
 * page's markup from a server and markup on a client are the same. Otherwise,
 * we would get an error that some properties are not the same.
 *
 * To make the markup consistent, we have to make styles and class names consistent
 * as well. And that is what custom Document is going to help us to do.
 */
import React from "react";
import { ServerStyleSheet } from "styled-components";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

export default class MyDocument extends Document {
  /**
   * Inside of a Head we create a meta element with description and a link
   * element with a link to fonts from Google Fonts. This is the place where we
   * keep links to external resources like fonts. Then, we render
   * this.props.styles - those are the styles collected using ServerStyleSheet.
   * We collect them in getInitialProps() method.
   * @param ctx contains many useful things, see them here:
   *  https://nextjs.org/docs/api-reference/data-fetching/getInitialProps#context-object
   */
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      /**
       * The whole reason we're defining our own getInitialProps function is to
       * enhance our app with an updated renderPage function that feeds the
       * entire app through a function that collects all styles into one place.
       * This'll make our styles prop accessible in render() later.
       * -> https://styled-components.com/docs/advanced#example
       * We'll be able to extract the styles later by calling
       * sheet.getStyledElement().
       *
       * Then, we “remember” original initialProps by calling
       * Document.getInitialProps(). Notice that we call it like a static method.
       * That's why we had to make our getInitialProps() static as well - to
       * make sure that we don't break compatibility.
       *
       * As a result, we return from this method an object that contains all of
       * the original initialProps and a styles prop which contains a component
       * with style elements that contain all the styles that are required to be
       * sent along with the page markup.
       *
       * The override of `ctx.renderPage` is intentional and necessary.
       *
       * Lastly, seal() is used for garbage collection.
       */
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      // Finally is executed after return statement is reached but before the
      // value is actually returned (see top comment).
      // https://2ality.com/2013/03/try-finally.html
      sheet.seal();
    }
  }

  render() {
    /**
     * Notice that we don't use an html element, but we use an <Html> component
     * imported from next/document instead. This is because <Html>, <Head>,
     * <Main> and <NextScript> are required for the page to be properly rendered.
     * Html is a root element, <Main> is a component which will render pages,
     * and <NextScript> is a service component required for Next to work correctly.
     */
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="The Next generation of a news feed"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"
            rel="stylesheet"
          />

          {this.props.styles}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
