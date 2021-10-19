/**
 * This config contains the images field that sets up how Next will handle our
 * images. The domains array specifies what external domains are allowed to load
 * images from. By default, Next won't let us load an image from external domains.
 *  -> https://nextjs.org/docs/api-reference/next.config.js/introduction
 *
 * The deviceSizes property tells Next what breakpoints we're going to consider
 * in the app layout. These breakpoints define how to scale images and what
 * images for the browser to load.
 *
 * By default, Next uses [640, 750, 828, 1080, 1200, 1920, 2048, 3840]—that's a
 * lot of breakpoints! For each of them Next creates an image with the corresponding
 * size. So when the deviseSizes is not set Next generates 8 different variants
 * for each image. In some cases, 8 variants for each image is too many. In our
 * app, we use 4 different breakpoints because we don't need extra-large images
 * since the app container's max-width is 1000px.
 *    For intrinsic and fixed image layouts we should use imageSizes instead of
 *    deviceSizes.
 */
module.exports = {
  images: {
    domains: ["ichef.bbci.co.uk"],
    deviceSizes: [320, 640, 860, 1000]
  }
}
