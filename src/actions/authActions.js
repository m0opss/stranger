import {
  LOGIN_REQUEST,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  ON_EXIT,
  SET_TOKEN,
  SET_AUTH,
  SET_TYPE,
  SET_VALUE,
  SET_BLOCK,
  SET_EMAIL,
  SET_ADMIN,
} from "../reducers/authReducer";

import { getUserData } from "./userActions";

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
export const getMe = (token, history) => async (dispatch) => {
  dispatch(getUserData(token));

  const response = await fetch("https://stranger-go.com/api/v1/users/me/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (response.ok) {
    if (history != undefined) history.push("/");
    const userData = await response.json();
    dispatch({
      type: SET_TOKEN,
      payload: token,
    });
    dispatch({
      type: SET_AUTH,
      payload: true,
    });
    dispatch({
      type: SET_ADMIN,
      payload: userData.is_staff,
    });
    dispatch({
      type: SET_TYPE,
      payload: userData.withdrawal_type,
    });
    dispatch({
      type: SET_EMAIL,
      payload: userData.email,
    });
    dispatch({
      type: SET_VALUE,
      payload: userData.withdrawal_value,
    });
    dispatch({
      type: SET_BLOCK,
      payload: userData.is_block,
    });
  } else {
    const err = await response.json();
    alert("Ошибка HTTP: " + response.status + " " + JSON.stringify(err));
  }
};

export const onLogin = (credentials, history) => async (dispatch) => {
  const rawResponse = await fetch(
    "https://stranger-go.com/api/v1/token/login/",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        // email: "admin@stranger-go.com",
        // password: "qwe123!@#",
        credentials
      ),
    }
  );
  if (rawResponse.ok) {
    const content = await rawResponse.json();
    localStorage.setItem("token", content.auth_token);
    dispatch(getMe(content.auth_token, history));
  } else {
    const err = await rawResponse.json();
    alert("Ошибка HTTP: " + rawResponse.status + " " + JSON.stringify(err));
  }
};
