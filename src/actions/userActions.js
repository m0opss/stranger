import {
  SET_BALANCE,
  SET_PROGRESS,
  SET_TR_HISTORY,
} from "../reducers/userReducer";

export const getUserData = (token) => async (dispatch) => {
  const rawResponse = await fetch(
    "https://stranger-go.com/api/v1/users/balance/",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );

  if (rawResponse.ok) {
    const userData = await rawResponse.json();
    dispatch({
      type: SET_TR_HISTORY,
      payload: userData,
    });
    dispatch({
      type: SET_BALANCE,
      payload: userData.length > 0 ? userData[userData.length - 1].balance : 0,
    });
    dispatch({
      type: SET_PROGRESS,
      payload: userData.length > 0 ? userData[userData.length - 1].progress : 0,
    });

  } else {
    const err = await rawResponse.json();
    alert("Ошибка HTTP: " + rawResponse.status + " " + JSON.stringify(err));
  }
};
