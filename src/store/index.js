import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import toastMiddleware from 'store/toastMiddleware'
import appReducer from './modules/rootReducer'
// eslint-disable-next-line import/no-cycle
import rootSaga from './modules/rootSaga'

const sagaMiddleware = createSagaMiddleware()

let enhancer = null

const middlewares = applyMiddleware(sagaMiddleware, toastMiddleware)

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(
          middlewares,
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
        )
      : middlewares
} else {
  enhancer = middlewares
}

const rootReducer = (state, action) => {
  let innerState = state
  if (action.type === 'AUTH_REQUEST_LOGOUT') {
    innerState = undefined
  }

  return appReducer(innerState, action)
}

const store = createStore(rootReducer, enhancer)

sagaMiddleware.run(rootSaga)

export default store
