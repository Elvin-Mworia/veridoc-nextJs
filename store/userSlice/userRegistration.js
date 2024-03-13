import {createSlice} from "@reduxjs/toolkit"

const UserRegInfoSlice=createSlice({
name:"userRegistrationInfo",
initialState:{
   walletAddress:"",
   name:"",
   email:"",
   role:"",
   phone:""
   
},
reducers:{
    userRegInfo:(state,action)=>{
        state.walletAddress=action.payload.walletAddress;
         state.name=action.payload.name;
 state.email=action.payload.email;
 state.role=action.payload.role;
 state.phone=action.payload.phone;

    }
}
})
export const  {userRegInfo}=UserRegInfoSlice.actions;
export default UserRegInfoSlice.reducer;