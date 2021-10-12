// The Thunk!
import { AppThunk } from "../../store";
import { newProject } from "./api";

export const saveProject = (
  projectName: string,
  thumbnail: string,
): AppThunk => async (dispatch, getState) => {
  try {
    const response = await newProject(
      projectName,
      getState().strokes,
      thumbnail,
    );
    console.log(response);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log('Unknown issue occured in saveProject()');
    }
  }
}