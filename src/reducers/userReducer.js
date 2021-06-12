export const SET_BALANCE = "SET_BALANCE";
export const SET_PROGRESS = "SET_PROGRESS";
export const SET_TR_HISTORY = "SET_TR_HISTORY";

const defaultState = {
  cardNum: "",
  phone: "",
  transaction_history: [],
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    // case SET_BALANCE:
    //   return { ...state, balance: action.payload };
    // case SET_PROGRESS:
    //   return { ...state, progress: action.payload };
    case SET_TR_HISTORY:
      return { ...state, transaction_history: action.payload };

    default:
      return state;
  }
}
