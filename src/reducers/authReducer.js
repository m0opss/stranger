export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const SET_TOKEN = "SET_TOKEN";
export const SET_AUTH = "SET_AUTH";
export const SET_BLOCK = "SET_BLOCK";
export const SET_ADMIN = "SET_ADMIN";
export const ON_EXIT = "ON_EXIT";

const defaultState = {
  isAuth: true,
  isAdmin: true,
  name: "",
  token: "fa52819beaa0f72773eae7457586179144f25d77",
  error: "",
  isBlock: false,
};

export default function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_SUCCES:
      return { ...state, name: action.payload, error: "" };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_AUTH:
      return { ...state, isAuth: action.payload };
    case SET_ADMIN:
      return { ...state, isAdmin: action.payload };
    case SET_BLOCK:
      return { ...state, isBlock: action.payload };
    case LOGIN_FAIL:
      return { ...state, error: action.payload.message };
    case ON_EXIT:
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
}
