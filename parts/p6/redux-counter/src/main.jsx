import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {createStore} from 'redux'

const counterReducer = (state = 0, action) => {
  console.log({ state, action });
  switch (action.type) {
    case 'UP':
      return state + 1
    case 'DOWN':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}
const store = createStore(counterReducer)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
