import * as ActionTypes from "./ActionTypes";

export const Leaders = (
  state = {
    isLoading: true,
    errMess: null,
    leaders: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_LEADERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        leaders: action.payload,
      };
    case ActionTypes.LEADERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        leaders: [],
      };
    case ActionTypes.ADD_LEADERS:
      let leader = action.payload;
      return { ...state, comments: state.leaders.concat(leader) };
    default:
      return state;
  }
};
