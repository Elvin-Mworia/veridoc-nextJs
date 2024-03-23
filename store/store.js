import { configureStore ,applyMiddleware,combineReducers} from '@reduxjs/toolkit'
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer } from 'redux-persist';
import storage from "./storage"
import UserRegInfoSlice from './userSlice/userRegistration';
import UserInfoSlice from './userSlice/userInfo';
import LoginSlice from './userSlice/loginStatus';
import CaseStationSlice from "./caseSlice/caseStation"
import CaseRankSlice  from   "./caseSlice/caseRank";
import CaseDivisionSlice  from   "./caseSlice/caseDivision";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer=combineReducers({
  registrationDetail:UserRegInfoSlice,
  userInfo:UserInfoSlice,
  login:LoginSlice,
  station:CaseStationSlice,
  rank:CaseRankSlice,
  division:CaseDivisionSlice

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

