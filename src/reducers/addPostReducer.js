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
      q: "",
      descr: "",
      time: "",
      answ: [
        { id: 0, text: "", is_correct: false },
        { id: 1, text: "", is_correct: false },
        { id: 2, text: "", is_correct: false },
        { id: 3, text: "", is_correct: false },
      ],
    },
    {
      id: 1,
      q: "",
      descr: "",
      time: "",
      answ: [
        { id: 0, text: "", is_correct: false },
        { id: 1, text: "", is_correct: false },
        { id: 2, text: "", is_correct: false },
        { id: 3, text: "", is_correct: false },
      ],
    },
    {
      id: 2,
      q: "",
      descr: "",
      time: "",
      answ: [
        { id: 0, text: "", is_correct: false },
        { id: 1, text: "", is_correct: false },
        { id: 2, text: "", is_correct: false },
        { id: 3, text: "", is_correct: false },
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
            q: "",
            descr: "",
            time: "",
            answ: [
              { id: 0, text: "", is_correct: false },
              { id: 1, text: "", is_correct: false },
              { id: 2, text: "", is_correct: false },
              { id: 3, text: "", is_correct: false },
            ],
          },
        ],
      };
    case SAVE_QUE:
      const { id, val, type, a_id } = action.payload;
      let tmp = [...state.ques];
      tmp.map((item) => {
        if (item.id == id) {
          if (type == "q") item.q = val;
          else if (type == "decr") item.descr = val;
          else if (type == "time") item.time = val;
          else if (type == "answ") {
            item.answ.map((a) => {
              if (a.id == a_id) {
                a.text = val;
              }
            });
          }
        }
      });
      return { ...state, ques: tmp };
    default:
      return state;
  }
}
