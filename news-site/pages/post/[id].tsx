/**
 * To create a page that is responsible for a path with a dynamtic route segment
 *  -> https://nextjs.org/docs/routing/dynamic-routes
 * we should add brackets this page filename.
 */

import { NextPage } from "next";
import { fetchPost } from "../../api/post";
import { fetchComments } from "../../api/comments";

import { Loader } from "../../components/Loader";
import { PostBody } from "../../components/Post/PostBody";
import { Comments } from "../../components/Comments";

import { connect } from "react-redux";
import { State, wrapper } from "../../store";
import { UPDATE_POST_ACTION } from "../../store/post";
import { UPDATE_COMMENTS_ACTION } from "../../store/comments";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ params }) => {
    if (typeof params.id !== "string") {
      throw new Error("Unexpected id");
    }

    const comments = await fetchComments(params.id);
    const post = await fetchPost(params.id);

    store.dispatch({ type: UPDATE_POST_ACTION, post });
    store.dispatch({ type: UPDATE_COMMENTS_ACTION, comments });

    return { props: null };
  },
);

const Post: NextPage<State> = ({ post, comments }) => {
  // const { post, comments } = useSelector<State, State>((state) => state);

  if (!post) {
    return <Loader />;
  }

  return (
    <>
      <PostBody post={post} />
      <Comments comments={comments} post={post.id} />
    </>
  );
};

export default connect((state: State) => state)(Post);
