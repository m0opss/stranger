export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const ON_EXIT = "ON_EXIT";

const defaultState = {
  isAuth: false,
  name: "",
  error: "",
};

export default function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_SUCCES:
      return { ...state, name: action.payload, error: "" };
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
// export const setFetching = (isFetching) => ({
//   type: SET_FETCHING,
//   payload: isFetching,
// });
