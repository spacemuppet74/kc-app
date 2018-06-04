import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from '../reducers/rootReducer'

const configureStore = preloadedStore => {
  const middleware = [thunk]
  const middleEnhancer = applyMiddleware(...middleware)

  const storeEnhancer = [middleEnhancer]
  const composeEnhancer = composeWithDevTools(...storeEnhancer)

  const store = createStore(rootReducer, preloadedStore, composeEnhancer)

  return store
}

export default configureStore