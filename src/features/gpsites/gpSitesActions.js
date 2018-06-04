import { FETCH_GP_SITES_REQUEST, FETCH_GP_SITES_SUCCESS, FETCH_GP_SITES_ERROR } from './gpSitesConstants';

import { getGPSites } from './gpsites-api'

const fetchGPSitesRequest = () => {
  return {
    type: FETCH_GP_SITES_REQUEST
  }
}
const fetchGPSitesSuccess = (sites) => {
  return {
    type: FETCH_GP_SITES_SUCCESS,
    payload: {
      sites
    }
  }
}

const fetchGPSitesError = (error) => {
  return {
    type: FETCH_GP_SITES_ERROR,
    payload: {
      error
    }
  }
}

export const fetchGPSites = () => {
  return async dispatch => {
    try {
      dispatch(fetchGPSitesRequest())
      const gpSites = await getGPSites()
      dispatch(fetchGPSitesSuccess(gpSites))
    } catch (error) {
      console.log(error)
      dispatch(fetchGPSitesError(error))
    }
  }
}