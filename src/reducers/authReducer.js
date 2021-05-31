export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const SET_TOKEN = "SET_TOKEN";
export const SET_AUTH = "SET_AUTH";
export const ON_EXIT = "ON_EXIT";

const defaultState = {
  isAuth: false,
  isAdmin: false,
  name: "",
  token: "",
  error: "",
};

export default function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_SUCCES:
      return { ...state, name: action.payload, error: "" };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_AUTH:
      return { ...state, isAuth: action.payload };
    case LOGIN_FAIL:
      return { ...state, error: action.payload.message };
    case ON_EXIT:
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
}

export const onExit = () => ({
  type: ON_EXIT,
  payload: false,
});
export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});
export const setAuth = (isAuth) => ({
  type: SET_AUTH,
  payload: isAuth,
});
