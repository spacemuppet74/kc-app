import { createReducer } from "../../app/util/reducerUtil"
import { createSelector } from 'reselect'

import { FETCH_GP_SITES_REQUEST, FETCH_GP_SITES_SUCCESS, FETCH_GP_SITES_ERROR } from './gpSitesConstants';

const initialState = {
  loading: false,
  loaded: false,
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
    loaded: true,
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

const gpSites = state => state.gpSites.byIds

export const selectGPSitesOptions = createSelector(
  gpSites,
  (gpSites) => Object.values(gpSites).filter(site => site.ADDRESS1.trim() !== "").map(site => ({ key: site.LOCNCODE.trim(), value: site.LOCNCODE.trim(), text: site.LOCNDSCR.trim() }))
)