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
import StaffStationSlice from "./userSlice/staffStation"
import CaseIdSlice from './caseSlice/caseId';
import FileSlice from  "./fileSlice/file";
import PaymentSlice from  "./paymentSlice/payment";
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
  division:CaseDivisionSlice,
  staffStation:StaffStationSlice,
  caseId:CaseIdSlice,
  file:FileSlice,
  paid:PaymentSlice

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

