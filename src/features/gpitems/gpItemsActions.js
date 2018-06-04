import { FETCH_GP_ITEMS_REQUEST, FETCH_GP_ITEMS_SUCCESS, FETCH_GP_ITEMS_ERROR } from './gpItemsConstant'

import { getGPItems } from './gpItems-api'

const fetchGPItemsRequest = () => {
  return {
    type: FETCH_GP_ITEMS_REQUEST
  }
}

const fetchGPItemsSuccess = (items) => {
  return {
    type: FETCH_GP_ITEMS_SUCCESS,
    payload: {
      items
    }
  }
}

const fetchGPItemsError = (error) => {
  return {
    type: FETCH_GP_ITEMS_ERROR,
    payload: {
      error
    }
  }
}

export const fetchGPItems = () => {
  return async dispatch => {
    try {
      dispatch(fetchGPItemsRequest())
      const items = await getGPItems()
      dispatch(fetchGPItemsSuccess(items))
    } catch (error) {
      console.log(error)
      dispatch(fetchGPItemsError())
    }
  }
}