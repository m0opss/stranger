export const SET_COAST = "SET_COAST";
export const SET_BRAND = "SET_BRAND";

const defaultState = {
  coast: "",
  brand: "",
};

export default function gameReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_COAST:
      return { ...state, coast: action.payload };
    case SET_BRAND:
      return { ...state, brand: action.payload };

    default:
      return state;
  }
}
