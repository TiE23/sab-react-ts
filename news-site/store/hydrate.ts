import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";

/**
 * Remember. Hydration is the term used to describe an initial loading of values
 * into a server-side-rendered page.
 *
 * This action has a type of HYDRATE, which is imported from next-redux-wrapper
 * package. This is a special action that must be used, in order to properly
 * reconcile the hydrated state on top of the existing state.
 *  -> https://github.com/kirill-konshin/next-redux-wrapper#usage
 *
 * Each reducer must have a handler for this action. Because each time when pages
 * that have getServerSideProps are opened by a user the HYDRATE action will be
 * dispatched.
 */
export interface HydrateAction extends AnyAction {
  type: typeof HYDRATE,
};
