const SET_FETCHING = "SET_FETCHING";

const defaultState = {
  isFetching: true,
};

export default function reposReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    default:
      return state;
  }
}

export const setFetching = (isFetching) => ({
  type: SET_FETCHING,
  payload: isFetching,
});
