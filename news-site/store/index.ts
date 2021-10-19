import { createStore, combineReducers, Store } from "redux";
import { MakeStore, createWrapper } from "next-redux-wrapper";
import { comments, CommentsState } from "./comments";
import { post, PostState } from "./post";

/**
 * In this case, we only need a store for comments and a current post since only
 * a post page is dynamic.
 */
export interface State extends Store {
  post: PostState,
  comments: CommentsState,
};

const combinedReducer = combineReducers({ post, comments });
const makeStore: MakeStore<State> = () => createStore(combinedReducer);

export const wrapper = createWrapper<Store<State>>(makeStore, {
  debug: true,
});
