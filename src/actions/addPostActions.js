import { SAVE_POST } from "../reducers/addPostReducer";

export const savePost = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_POST,
    payload: data,
  });
};
