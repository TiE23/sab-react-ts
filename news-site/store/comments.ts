/**
 * This file combines actions and reducers in one file, just FYI.
 */
import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { Comment } from "../shared/types";
import { HydrateAction } from "./hydrate";

export const UPDATE_COMMENTS_ACTION = "UPDATE_COMMENTS";

/**
 * We create an UpdateCommentsAction interface which extends AnyAction from redux.
 * We set the type field to be a type of UPDATE_COMMENTS_ACTION constant. The
 * second field in this action is comments which is an array of Comment.
 *
 *  Notice that we use an interface and not a type even though an action is not
 *  a “public API”. This is because we need to extend the AnyAction and interfaces
 *  are better at extension than types. They are better at merging fields than types
 *  and extending an interface is faster than using a union. In this project, when
 *  extending AnyAction we will always use interfaces.
 */
export interface UpdateCommentsAction extends AnyAction {
  type: typeof UPDATE_COMMENTS_ACTION,
  comments: Comment[],
}

export type CommentsState = Comment[];

type CommentsAction = HydrateAction | UpdateCommentsAction;

/**
 * The Redux reducer for comments
 * @param state default is an empty array.
 * @param action hydration or an update
 * @returns
 */
export const comments = (
  state: CommentsState = [],
  action: CommentsAction,
) => {
  switch (action.type) {
    /**
     * Note: It's OK we're overwriting the state in these returns.
     * Otherwise, follow this guide on how to merge properly:
     *  -> https://github.com/kirill-konshin/next-redux-wrapper#state-reconciliation-during-hydration
     */
    case HYDRATE:
      return action.payload?.comments ?? [];
    case UPDATE_COMMENTS_ACTION:
      console.log('UPDATE_COMMENTS_ACTION', action.comments);
      return action.comments;
    default:
      return state;
  }
}