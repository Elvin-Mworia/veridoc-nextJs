import UserRegInfoSlice from './userSlice/userRegistration';
import UserInfoSlice from './userSlice/userInfo';
import LoginSlice from './userSlice/loginStatus';

export const  {updateUserRegInfo}=UserRegInfoSlice.actions;
export const  {updateuserinfo}=UserInfoSlice.actions;
export const  {updateLoginState}=LoginSlice.actions;