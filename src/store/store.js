import { configureStore ,applyMiddleware,combineReducers} from '@reduxjs/toolkit'
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from "redux-logger"
import {  FLUSH,REHYDRATE, PAUSE,PERSIST,PURGE,REGISTER, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer=combineReducers({
  })
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
},composeWithDevTools(applyMiddleware(logger)))

export default store;