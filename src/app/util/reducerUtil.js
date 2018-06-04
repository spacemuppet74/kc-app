export const createReducer = (initialState, fnMap) => {
  return (state = initialState, { type, payload }) => {

    // if the handler does exist in the fnMap then
    // handler will be undefined 
    const handler = fnMap[type];

    return handler ? handler(state, payload) : state
  }
}