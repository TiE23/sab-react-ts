/**
 * To create a page that is responsible for a path with a dynamtic route segment
 *  -> https://nextjs.org/docs/routing/dynamic-routes
 * we should add brackets this page filename.
 */

import { GetStaticProps } from "next";
import { useRouter} from "next/router";
import { fetchPost } from "../../api/post";
import { Post as PostType } from "../../shared/types";
import { Loader } from "../../components/Loader";
import { postPaths as paths } from "../../shared/staticPaths";
import { PostBody } from "../../components/Post/PostBody";

type PostProps = {
  post: PostType,
};

// Pre-rendered pages pretty much require this function.
// -> https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export const getStaticProps: GetStaticProps<PostProps> = async ({
  params, // This is a context argument we're destructuring. See docs above.
}) => {
  if (typeof params.id !== "string") {
    // Need to check because Next can give us either string or string[].
    throw new Error("Unexpected id");
  }

  // This is how we get the `post` prop for the component below!
  const post = await fetchPost(params.id);
  return { props: { post } };
};

// Determines which paths should be rendered to HTML at build-time.
// -> https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export async function getStaticPaths() {
  return { paths, fallback: true };
}

const Post = ({ post }: PostProps) => {
  /**
   * This is a Hook.
   * -> pathname - current route, the path of the page in pages directory.
   * -> query - the query string parsed to an object.
   *
   * A query object will contain the id of a current post. So, we access it and
   * use it for loading data later on.
   */
  const router = useRouter();

  // If the route hasn't been pre-rendered we show Loader instead.
  if (router.isFallback) return <Loader />;

  return <PostBody post={post} />;
};

export default Post;
