export const SAVE_POST = "SAVE_POST";

const defaultState = {
  brName: "",
  brLink: "",
  time: "",
  price: "",
  text: "",
};

export default function addPostReducer(state = defaultState, action) {
  switch (action.type) {
    case SAVE_POST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
