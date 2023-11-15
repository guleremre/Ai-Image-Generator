// import initialState from "../initialState";
// import action from "../actions/actionTypes";

const initialState = {
  profilePic: [],
  total: 0,
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case "AddProfilePic":
      return {
        ...state,
        total: [...state.total, action.payload],
      };
    default:
      return state;
  }
}
