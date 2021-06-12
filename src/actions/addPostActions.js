import { SAVE_POST, SAVE_QUE } from "../reducers/addPostReducer";

export const savePost = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_POST,
    payload: data,
  });
};

export const saveQue = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_QUE,
    payload: data,
  });
};
