import {createSlice} from "@reduxjs/toolkit"

const UserInfoSlice=createSlice({
name:"userinfo",
initialState:{
    walletAddress:"",
    name:"", 
    role:"",  
},
reducers:{
    updateuserinfo:(state,action)=>{
        state.walletAddress=action.payload.walletAddress;
        state.name=action.payload.name;
        state.role=action.payload.role;
    }
}
})
export const  {updateuserinfo}=UserInfoSlice.actions;
export default UserInfoSlice.reducer;