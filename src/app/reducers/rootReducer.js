import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'

import testReducer from "../../features/testarea/testReducer";

import hubSitesReducer from "../../features/hubsites/hubSitesReducer";
import gpSitesReducer from "../../features/gpsites/gpSitesReducer";
import gpItemsReducer from "../../features/gpitems/gpItemsReducer";
import storesReducer from '../../features/storelocations/storeLocationsReducer'

const rootReducer = combineReducers({
  test: testReducer,
  form: formReducer,
  hubSites: hubSitesReducer,
  gpItems: gpItemsReducer,
  gpSites: gpSitesReducer,
  stores: storesReducer
});

export default rootReducer;
