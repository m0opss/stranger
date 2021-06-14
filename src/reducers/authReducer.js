export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const SET_TOKEN = "SET_TOKEN";
export const SET_AUTH = "SET_AUTH";
export const SET_BLOCK = "SET_BLOCK";
export const SET_ADMIN = "SET_ADMIN";
export const SET_EMAIL = "SET_EMAIL";
export const ON_EXIT = "ON_EXIT";
export const SET_TYPE = "SET_TYPE";
export const SET_UID = "SET_UID";
export const SET_VALUE = "SET_VALUE";

const defaultState = {
  isAuth: false,
  isAdmin: false,
  withdrawal_type: 0,
  withdrawal_value: "",
  email: "",
  // token: "d70b85803c00420f123a088a30c79eec6e26e39a",
  token: "",
  uid: "",
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
    case SET_TYPE:
      return { ...state, withdrawal_type: action.payload };
    case SET_UID:
      return { ...state, uid: action.payload };
    case SET_VALUE:
      return { ...state, withdrawal_value: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case ON_EXIT:
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
}
