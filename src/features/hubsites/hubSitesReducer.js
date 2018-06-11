import { createReducer } from "../../app/util/reducerUtil";
import { createSelector } from 'reselect'

import {
  FETCH_HUBS_SITES_ERROR,
  FETCH_HUBS_SITES_SUCCESS,
  FETCH_HUBS_SITES_REQUEST,
  UPDATE_SELECTED_SITE
} from "./hubSitesConstants";


const initialState = {
  loading: false,
  loaded: false,
  byIds: {},
  listing: [],
  selectedSite: "",
  error: {}
};

const fetchHubSitesRequest = state => {
  return {
    ...state,
    loading: true
  };
};

const fetchHubSiteSuccess = (state, payload) => {
  const byIds = payload.sites.reduce((prev, next) => {
    return { ...prev, [next.Id]: next };
  }, {});

  const listing = Object.keys(byIds);

  return {
    ...state,
    loading: false,
    loaded: true,
    byIds: { ...byIds },
    listing: [...listing]
  };
};

const fetchHubSitesError = (state, payload) => {
  return {
    ...state,
    loading: false,
    error: payload.error
  };
};

const updateSelectedSite = (state, payload) => {
  const siteID = state.listing.find(key => state.byIds[key].Title === payload.site)
  const site =  { ...state.byIds[siteID]}
  
  return {
    ...state,
    selectedSite: site
  };
};

export default createReducer(initialState, {
  [FETCH_HUBS_SITES_REQUEST]: fetchHubSitesRequest,
  [FETCH_HUBS_SITES_SUCCESS]: fetchHubSiteSuccess,
  [FETCH_HUBS_SITES_ERROR]: fetchHubSitesError,
  [UPDATE_SELECTED_SITE]: updateSelectedSite
});


const selectorHubSite = (state) => state.hubSites.selectedSite

const hubSitesLoading = state => state.hubSites.loading

export const selectorHubSitesLoading = createSelector(
  [hubSitesLoading],
  (getLoading) => getLoading
)

export const selectorSelectedHubSite = createSelector(
  [selectorHubSite],
  (selectedHubSite) => selectedHubSite
)

