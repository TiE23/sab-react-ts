// The Thunk!
import { AppThunk } from "../../store";
import { Project } from "../../utils/types";
import {
  getProjectsListSuccess,
  getProjectsListFailed,
} from "./slice";
import { fetchProjectsList } from "./api";

export const getProjectsList = (): AppThunk => async (dispatch) => {
  try {
    const projectsList: Project[] = await fetchProjectsList();
    dispatch(getProjectsListSuccess(projectsList));
  } catch (e: unknown) {
    dispatch(getProjectsListFailed(String(e)));
  }
};