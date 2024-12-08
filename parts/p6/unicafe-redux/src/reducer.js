import { createStore } from "redux"

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}
const counterReducer = (state = initialState, action) => {
  console.log(action, state)
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state['good'] + 1 }
    case 'OK':
      return { ...state, ok: state['ok'] + 1 }
    case 'BAD':
      return { ...state, bad: state['bad'] + 1 }
    case 'ZERO':
      return initialState
    default:
      return state
  }
}
const store = createStore(counterReducer)

// Actions
const goodReview = () => {
  store.dispatch({
    type: 'GOOD'
  })
}
const okReview = () => {
  store.dispatch({
    type: 'OK'
  })
}
const badReview = () => {
  store.dispatch({
    type: 'BAD'
  })
}
const resetStats = () => {
  store.dispatch({
    type: 'ZERO'
  })
}

export default counterReducer
export {counterReducer, store, goodReview, okReview, badReview, resetStats}