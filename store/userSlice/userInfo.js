import {createSlice} from "@reduxjs/toolkit"

const UserInfoSlice=createSlice({
name:"userinfo",
initialState:{
    walletAddress:"",
    firstName:"", 
    lastName:"",
    email:"",
    role:"", 
    phone:""
},
reducers:{
    updateuserinfo:(state,action)=>{
        // state.walletAddress=action.payload.walletAddress;
        // state.name=action.payload.name;
        // state.role=action.payload.role;
        return {
            ...state, // Keep the existing state
            ...action.payload, // Override with the new value(s)
          };
    }
}
})
export const  {updateuserinfo}=UserInfoSlice.actions;
export default UserInfoSlice.reducer;