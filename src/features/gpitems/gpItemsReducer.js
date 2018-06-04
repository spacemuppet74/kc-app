import { createReducer } from "../../app/util/reducerUtil"

import { FETCH_GP_ITEMS_REQUEST, FETCH_GP_ITEMS_SUCCESS, FETCH_GP_ITEMS_ERROR } from './gpItemsConstant'

const initialState = {
  loading: false,
  byIds: {},
  listing: [],
  error: null
}

const fetchGPItemsRequest = (state) => {
  return {
    ...state,
    loading: true
  }
}

const fetchGPItemsSuccess = (state, payload) => {
  const byIds = payload.items.reduce((prev, next) => {
    return {
      ...prev,
      [next.ID]: next
    }
  }, {})

  const listing = Object.keys(byIds)

  return {
    ...state,
    loading: false,
    byIds: { ...byIds },
    listing: [...listing]
  }
}

const fetchGPItemsError = (state, payload) => {
  return {
    loading: false,
    error: payload.error
  }
}

export default createReducer(initialState, {
  [FETCH_GP_ITEMS_REQUEST]: fetchGPItemsRequest,
  [FETCH_GP_ITEMS_SUCCESS]: fetchGPItemsSuccess,
  [FETCH_GP_ITEMS_ERROR]: fetchGPItemsError
})