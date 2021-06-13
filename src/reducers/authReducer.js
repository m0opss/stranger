export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const SET_TOKEN = "SET_TOKEN";
export const SET_AUTH = "SET_AUTH";
export const SET_BLOCK = "SET_BLOCK";
export const SET_ADMIN = "SET_ADMIN";
export const ON_EXIT = "ON_EXIT";
export const SET_TYPE = "SET_TYPE";
export const SET_VALUE = "SET_VALUE";

const defaultState = {
  isAuth: false,
  isAdmin: false,
  withdrawal_type: 0,
  withdrawal_value: '',
  name: "",
  token: "",
  error: "",
  isBlock: false,
  // token: "f0b3d07942238757c47a920a4cf3b2957847dd5a",
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
    case SET_TYPE:
      return { ...state, withdrawal_type: action.payload };
    case SET_VALUE:
      return { ...state, withdrawal_value: action.payload };
    case ON_EXIT:
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
}
