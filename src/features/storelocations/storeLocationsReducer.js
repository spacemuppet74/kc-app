import { createReducer } from "../../app/util/reducerUtil";
import { createSelector } from 'reselect'

import { FETCH_STORE_LOCATIONS_REQUEST, FETCH_STORE_LOCATIONS_SUCCESS, FETCH_STORE_LOCATIONS_ERROR } from './storeLocationConstants'

const initialState = {
  loading: false,
  byIds: {},
  listing: [],
  error: null
}

const fetchStoresRequest = state => {
  return {
    ...state,
    loading: true
  }
}

const fetchStoresSuccess = (state, payload) => {
  const byIds = payload.stores.reduce((prev, next) => {
    return { ...prev, [next.Id]: next }
  }, {})

  const listing = Object.keys(byIds)

  return {
    ...state,
    loading: false,
    byIds: { ...byIds },
    listing: [...listing]
  }
}

const fetchStoresError = (state, payload) => {
  return {
    ...state,
    loading: false,
    error: payload.error
  };
};

export default createReducer(initialState, {
  [FETCH_STORE_LOCATIONS_REQUEST]: fetchStoresRequest,
  [FETCH_STORE_LOCATIONS_SUCCESS]: fetchStoresSuccess,
  [FETCH_STORE_LOCATIONS_ERROR]: fetchStoresError
})


//*******************************************
//  SELECTORS
//
//******************************************/

const storesObj = state => state.stores.byIds

export const selectorStoesOptions = createSelector(
  storesObj,
  (stores) => Object.values(stores).map(store => ({ key: store.Id, value: store.Id, text: store.Title }))
)