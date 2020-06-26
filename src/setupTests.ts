import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import appReducer from 'store/modules/rootReducer'

import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

window.matchMedia =
  window.matchMedia ||
  function matchMedia() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    }
  }

const sagaMiddleware = createSagaMiddleware()
export const storeFactory = (initialState?: any) => {
  const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore)
  return createStoreWithMiddleware(appReducer, initialState)
}
