export const SAVE_POST = "SAVE_POST";
export const SAVE_QUE = "SAVE_QUE";
export const REMOVE_QUE = "REMOVE_QUE";
export const ADD_QUE = "ADD_QUE";

const defaultState = {
  brName: "",
  brLink: "",
  time: "",
  price: "",
  text: "",
  ques: [
    {
      id: 0,
      descr: "",
      time: 0,
      answ: [
        { id: 11, text: "", is_correct: false },
        { id: 12, text: "", is_correct: false },
        { id: 13, text: "", is_correct: false },
        { id: 14, text: "", is_correct: false },
      ],
    },
    {
      id: 1,
      descr: "",
      time: 0,
      answ: [
        { id: 41, text: "", is_correct: false },
        { id: 42, text: "", is_correct: false },
        { id: 43, text: "", is_correct: false },
        { id: 44, text: "", is_correct: false },
      ],
    },
    {
      id: 2,
      descr: "",
      time: 0,
      answ: [
        { id: 21, text: "", is_correct: false },
        { id: 22, text: "", is_correct: false },
        { id: 23, text: "", is_correct: false },
        { id: 24, text: "", is_correct: false },
      ],
    },
  ],
};

export default function addPostReducer(state = defaultState, action) {
  switch (action.type) {
    case SAVE_POST:
      return { ...state, ...action.payload };
    case REMOVE_QUE:
      return {
        ...state,
        ques: state.ques.filter((item) => item.id != action.payload),
      };
    case ADD_QUE:
      return {
        ...state,
        ques: [
          ...state.ques,
          {
            id: state.ques.length,
            descr: "",
            time: 0,
            answ: [
              {
                id: parseFloat(String(state.ques.length) + "1"),
                text: "",
                is_correct: false,
              },
              {
                id: parseFloat(String(state.ques.length) + "2"),
                text: "",
                is_correct: false,
              },
              {
                id: parseFloat(String(state.ques.length) + "3"),
                text: "",
                is_correct: false,
              },
              {
                id: parseFloat(String(state.ques.length) + "4"),
                text: "",
                is_correct: false,
              },
            ],
          },
        ],
      };
    case SAVE_QUE:
      return { ...state, ques: action.payload };

    default:
      return state;
  }
}
