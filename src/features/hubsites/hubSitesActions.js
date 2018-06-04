import {
  FETCH_HUBS_SITES_ERROR,
  FETCH_HUBS_SITES_SUCCESS,
  FETCH_HUBS_SITES_REQUEST,
  UPDATE_SELECTED_SITE
} from "./hubSitesConstants";

import { getHubsSites } from "./hubSites-api";

const fetchHubSitesRequest = () => {
  return {
    type: FETCH_HUBS_SITES_REQUEST
  };
};

const fetchHubSitesSuccess = sites => {
  return {
    type: FETCH_HUBS_SITES_SUCCESS,
    payload: {
      sites
    }
  };
};

const fetchHubSitesError = error => {
  return {
    type: FETCH_HUBS_SITES_ERROR,
    payload: {
      error
    }
  };
};

export const updateSelectedSite = site => {
  return {
    type: UPDATE_SELECTED_SITE,
    payload: {
      site
    }
  };
};

export const fetchHubSites = () => {
  return async dispatch => {
    try {
      dispatch(fetchHubSitesRequest());
      const hubSites = await getHubsSites();
      dispatch(fetchHubSitesSuccess(hubSites));
    } catch (error) {
      console.log(error);
      dispatch(fetchHubSitesError(error));
    }
  };
};
