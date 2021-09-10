import storage from 'redux-persist/lib/storage'
import { applyMiddleware, compose, createStore } from "redux"
import Logger from "redux-logger"
import { persistReducer, persistStore } from "redux-persist"
import createSagaMiddleware from "redux-saga"

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth", "student", "examPeriod", "exam", "course", "teacher", "document", "payment"],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (rootReducer, rootSaga) => {
  const middleware = []
  const enhancers = []

  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)
  middleware.push(Logger)

  enhancers.push(applyMiddleware(...middleware))

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer, compose(...enhancers))
  const persistor = persistStore(store)

  // Kick off the root saga
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
 