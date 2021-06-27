export const SET_COAST = "SET_COAST";
export const SET_BRAND = "SET_BRAND";
export const SET_GAME_PROGRESS = "SET_GAME_PROGRESS";

const defaultState = {
  coast: "",
  brand: "",
  game_progress: "",
};

export default function gameReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_COAST:
      return { ...state, coast: action.payload };
    case SET_BRAND:
      return { ...state, brand: action.payload };
    case SET_GAME_PROGRESS:
      return { ...state, game_progress: action.payload };

    default:
      return state;
  }
}
