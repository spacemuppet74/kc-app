import { combineReducers } from "redux";

import testReducer from "../../features/testarea/testReducer";

import hubSitesReducer from "../../features/hubsites/hubSitesReducer";

const rootReducer = combineReducers({
  test: testReducer,
  hubSites: hubSitesReducer
});

export default rootReducer;
