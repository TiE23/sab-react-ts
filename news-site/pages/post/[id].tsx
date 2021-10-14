/**
 * To create a page that is responsible for a path with a dynamtic route segment
 *  -> https://nextjs.org/docs/routing/dynamic-routes
 * we should add brackets this page filename.
 */

import { useRouter} from "next/router";

const Post = () => {
  /**
   * This is a Hook.
   * pathname - current route, the path of the page in pages directory.
   * query - the query string parsed to an object.
   *
   * A query object will contain the id of a current post. So, we access it and
   * use it for loading data later on.
   */
  const { pathname, query } = useRouter();

  return (
    <div>
      Pathname: {pathname}; <br />
      Post Id: {query.id}.
    </div>
  );
};

export default Post;
