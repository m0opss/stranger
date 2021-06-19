export const SET_BALANCE = "SET_BALANCE";
export const SET_PROGRESS = "SET_PROGRESS";
export const SET_TR_HISTORY = "SET_TR_HISTORY";
export const SET_FIRST_TIME = "SET_FIRST_TIME";
// export const SET_BALANCE = "SET_BALANCE";

const defaultState = {
  cardNum: "",
  phone: "",
  first_time: true,
  balance: 0,
  progress: 0,
  transaction_history: [],
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    // case SET_BALANCE:
    //   return { ...state, balance: action.payload };
    case SET_PROGRESS:
      return { ...state, progress: parseFloat(action.payload.toFixed(2)) };
    case SET_TR_HISTORY:
      return { ...state, transaction_history: action.payload };
    case SET_BALANCE:
      return { ...state, balance: action.payload };
    case SET_FIRST_TIME:
      return { ...state, first_time: false };

    default:
      return state;
  }
}
