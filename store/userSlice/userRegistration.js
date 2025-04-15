import {createSlice} from "@reduxjs/toolkit"

const UserRegInfoSlice=createSlice({
name:"userRegistrationInfo",
initialState:{
   walletAddress:"",
   name:"",
   email:"",
   role:"",
   phone:"",
   category:"",
   firstName:"",
   lastName:"",
   password:"",
   confirmPassword:""
   
},
reducers:{
    userRegInfo:(state,action)=>{
 //state.walletAddress=action.payload.walletAddress;
//  state.name=action.payload.name;
//  state.email=action.payload.email;
//  state.role=action.payload.role;
//  state.phone=action.payload.phone;
//  state.category=action.payload.category;
//  state.firstName=action.payload.firstName;
//  state.lastName=action.payload.lastName;
//  state.password=action.payload.password;
//  state.confirmPassword=action.payload.confirmPassword;
 return {
   ...state, // Keep the existing state
   ...action.payload, // Override with the new value(s)
 };
    }
}
})
export const  {userRegInfo}=UserRegInfoSlice.actions;
export default UserRegInfoSlice.reducer;