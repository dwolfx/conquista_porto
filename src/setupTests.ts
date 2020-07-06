import { applyMiddleware, createStore } from 'redux'
import matchMediaPolyfill from 'mq-polyfill'
import createSagaMiddleware from 'redux-saga'
import appReducer from 'store/modules/rootReducer'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

matchMediaPolyfill(window)

window.matchMedia('(min-width: 1500px)')
window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'))
}

beforeEach(() => {
  window.resizeTo(1500, 600)
})

const sagaMiddleware = createSagaMiddleware()
export const storeFactory = (initialState?: any) => {
  const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore)
  return createStoreWithMiddleware(appReducer, initialState)
}
