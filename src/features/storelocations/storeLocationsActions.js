import { FETCH_STORE_LOCATIONS_REQUEST, FETCH_STORE_LOCATIONS_SUCCESS, FETCH_STORE_LOCATIONS_ERROR } from './storeLocationConstants'

import { getStoreLocations } from './store-location-api'

const fetchStoreLocationsRequest = () => {
  return {
    type: FETCH_STORE_LOCATIONS_REQUEST
  }
}

const fetchStoreLocationsSuccess = (stores) => {
  return {
    type: FETCH_STORE_LOCATIONS_SUCCESS,
    payload: {
      stores
    }
  }
}

const fetchStoreLocationsError = (error) => {
  return {
    type: FETCH_STORE_LOCATIONS_ERROR,
    payload: {
      error
    }
  }
}

export const fetchStoresLocations = () => {
  return async dispatch => {
    try {
      dispatch(fetchStoreLocationsRequest())
      const stores = await getStoreLocations()
      dispatch(fetchStoreLocationsSuccess(stores))
    } catch (error) {
      console.log(error)
      dispatch(fetchStoreLocationsError(error))
    }
  }
}