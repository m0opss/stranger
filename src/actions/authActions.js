import {
  LOGIN_REQUEST,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  ON_EXIT,
  SET_TOKEN,
  SET_AUTH
} from "../reducers/authReducer";

export function handleLogin() {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });

    VK.Auth.login((r) => {
      if (r.session) {
        let username = r.session.user.first_name;

        dispatch({
          type: LOGIN_SUCCES,
          payload: username,
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
          error: true,
          payload: new Error("Ошибка авторизации"),
        });
      }
    }, 4);
  };
}

export function onExitAccount() {
  return function (dispatch) {
    dispatch({
      type: ON_EXIT,
    });
  };
}

export function onLogin(token) {
  return function (dispatch) {
    dispatch({
      type: SET_TOKEN,
      payload: token
    });
    dispatch({
      type: SET_AUTH,
      payload: true
    });
  };
}
