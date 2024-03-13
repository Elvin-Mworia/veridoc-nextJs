import { configureStore ,applyMiddleware,combineReducers} from '@reduxjs/toolkit'
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import UserRegInfoSlice from './userSlice/userRegistration';
import UserInfoSlice from './userSlice/userInfo';
import LoginSlice from './userSlice/loginStatus';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer=combineReducers({
  registrationDetail:UserRegInfoSlice,
  userInfo:UserInfoSlice,
  login:LoginSlice
  })
const persistedReducer = persistReducer(persistConfig, rootReducer)

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
},composeWithDevTools(applyMiddleware(logger)))

export default Store;
