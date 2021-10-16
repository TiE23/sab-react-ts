/**
 * To create a page that is responsible for a path with a dynamtic route segment
 *  -> https://nextjs.org/docs/routing/dynamic-routes
 * we should add brackets this page filename.
 */

import { GetServerSideProps } from "next";
import { useRouter} from "next/router";
import { fetchPost } from "../../api/post";
import { fetchComments } from "../../api/comments";

import { Loader } from "../../components/Loader";
import { PostBody } from "../../components/Post/PostBody";
import { Comments } from "../../components/Comments";

import { Comment, Post as PostType } from "../../shared/types";

type PostProps = {
  post: PostType,
  comments: Comment[],
};

/*
// Pre-rendered (SSG) pages require this function.
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
  const comments = await fetchComments(params.id);
  return { props: { post } };
};

// Determines which paths should be rendered to HTML at build-time.
// -> https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export async function getStaticPaths() {
  return { paths, fallback: true };
}
*/

// Pre-rendered (SSR) pages require this function.
// We removed getStaticProps AND getStaticPaths both to introduce this one.
// SSR is necessary because we have dynamic comments!
export const getServerSideProps: GetServerSideProps<PostProps> = async ({
  params,
}) => {
  if (typeof params.id !== "string") throw new Error("Unexpected id");
  const post = await fetchPost(params.id);
  const comments = await fetchComments(params.id);
  return { props: { post, comments } };

};

const Post = ({ post, comments }: PostProps) => {
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

  return (
    <>
      <PostBody post={post} />
      <Comments comments={comments} post={post.id} />
    </>
  );
};

export default Post;
