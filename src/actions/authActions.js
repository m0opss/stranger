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

export function handleLoginFace(handleClick, history) {
  return function (dispatch) {
    FB.login(function (response) {
      if (response.authResponse) {
        console.log("Welcome!  Fetching your information.... ", response);
        dispatch(
          getSocToken(
            "facebook",
            response.authResponse.accessToken,
            handleClick,
            history
          )
        );
        FB.api("/me", function (response) {
          console.log("Good to see you, " + response.name + ".");
        });
      } else {
        console.log("User cancelled login or did not fully authorize.");
      }
    });
  };
}
export function handleLoginVK(handleClick, history) {
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

        // dispatch(getSocToken("vk-oauth2", r.session.sid, handleClick, history));
        setTimeout(
          dispatch(
            getSocToken("vk-oauth2", r.session.sid, handleClick, history)
          ),
          1000
        );
      } else {
        dispatch({
          type: LOGIN_FAIL,
          error: true,
          payload: new Error("Ошибка авторизации"),
        });
      }
    });
  };
}

export function onExitAccount(token) {
  return function (dispatch) {
    dispatch({
      type: SET_AUTH,
      payload: false,
    });
    dispatch({
      type: SET_ADMIN,
      payload: false,
    });
    dispatch({
      type: SET_TOKEN,
      payload: "",
    });
    dispatch({
      type: SET_TYPE,
      payload: 0,
    });
    dispatch({
      type: SET_EMAIL,
      payload: "",
    });
    dispatch({
      type: SET_VALUE,
      payload: "",
    });
    dispatch({
      type: SET_BLOCK,
      payload: false,
    });
    dispatch({
      type: SET_BLOCK,
      payload: false,
    });

    dispatch(onLogout(token));
  };
}

export const getSocToken =
  (type, access_token, handleClick, history) => async (dispatch) => {
    const response = await fetch(
      `https://stranger-go.com/api/v1/auth-social/${type}/?access_token=${access_token}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const userData = await response.json();
      localStorage.setItem("token", userData.auth_token);
      dispatch({
        type: SET_TOKEN,
        payload: userData.auth_token,
      });
      dispatch(getMe(userData.auth_token, history, handleClick));
    } else {
      const err = await response.json();
      handleClick("Ошибка: " + err[Object.keys(err)[0]], "error");
    }
  };

export const getMe = (token, history, handleClick) => async (dispatch) => {
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
    if (history != undefined) {
      history.push("/");
    }
  } else {
    const err = await response.json();
    if (handleClick != undefined)
      handleClick("Ошибка: " + err[Object.keys(err)[0]], "error");
    else if (history != undefined) history.push("/");
  }
};

export const onLogin =
  (credentials, history, handleClick) => async (dispatch) => {
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
      handleClick("Ошибка: " + err[Object.keys(err)[0]], "error");
      // alert("Ошибка HTTP: " + rawResponse.status + " " + JSON.stringify(err));
    }
  };
export const onLogout = (token) => async (dispatch) => {
  const rawResponse = await fetch(
    "https://stranger-go.com/api/v1/token/logout/",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );
  if (rawResponse.ok) {
    dispatch(getTokenAnon());
  } else {
    const err = await rawResponse.json();
    console.log(err);
    // handleClick("Ошибка: " + err[Object.keys(err)[0]], "error");
    // alert("Ошибка HTTP: " + rawResponse.status + " " + JSON.stringify(err));
  }
};

export const getTokenAnon = () => async (dispatch) => {
  const rawResponse = await fetch(
    "https://stranger-go.com/api/v1/token/anonymity/",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (rawResponse.ok) {
    const content = await rawResponse.json();
    // localStorage.setItem("token", content.auth_token);
    dispatch({
      type: SET_TOKEN,
      payload: content.auth_token,
    });
  } else {
    const err = await rawResponse.json();
    handleClick("Ошибка: " + err[Object.keys(err)[0]], "error");
    // alert("Ошибка HTTP: " + rawResponse.status + " " + JSON.stringify(err));
  }
};
