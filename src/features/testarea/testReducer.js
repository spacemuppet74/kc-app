import { createReducer } from "../../app/util/reducerUtil";

import { TEST_AREA } from "./testareaConstants";

const initialState = {
  data: 42
};

const test = (state, payload) => {
  return { ...state };
};

export default createReducer(initialState, {
  [TEST_AREA]: test
});
