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
      body: JSON.stringify(),
    }
  );

  if (rawResponse.ok) {
    const userData = await rawResponse.json();

    dispatch({
      type: SET_BALANCE,
      payload: userData.balance,
    });
    dispatch({
      type: SET_PROGRESS,
      payload: userData.progress,
    });
    dispatch({
      type: SET_TR_HISTORY,
      payload: userData.transaction_history,
    });
  } else {
    const err = await rawResponse.json();
    alert("Ошибка HTTP: " + rawResponse.status + " " + JSON.stringify(err));
  }
};
