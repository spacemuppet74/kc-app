import { createReducer } from "../../app/util/reducerUtil"

import { FETCH_GP_SITES_REQUEST, FETCH_GP_SITES_SUCCESS, FETCH_GP_SITES_ERROR } from './gpSitesConstants';

const initialState = {
  loading: false,
  byIds: {},
  listing: [],
  error: null
}

const fetchGPSitesRequest = (state) => {
  return {
    ...state,
    loading: true
  }
}

const fetchGPSiteSuccess = (state, payload) => {
  const byIds = payload.sites.reduce((prev, next) => {
    return { ...prev, [next.LOCNCODE]: next }
  }, {})

  const listing = Object.keys(byIds)

  return {
    ...state,
    byIds: { ...byIds },
    listing: [...listing],
    loading: false
  }
}

const fetchGPSiteError = (state, payload) => {
  return {
    ...state,
    loading: false,
    error: payload.error
  }
}

export default createReducer(initialState, {
  [FETCH_GP_SITES_REQUEST]: fetchGPSitesRequest,
  [FETCH_GP_SITES_SUCCESS]: fetchGPSiteSuccess,
  [FETCH_GP_SITES_ERROR]: fetchGPSiteError
})