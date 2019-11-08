import * as Types from "./types";

export const defaultState = {
  count: 0
};

export default (state, action) => {
  switch (action.type) {
    case Types.EXAMPLE_TEST:
      return {
        ...state,
        count: action.count
      };
    default: {
      return state;
    }
  }
};
