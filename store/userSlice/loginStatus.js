import {createSlice} from "@reduxjs/toolkit"

const LoginSlice=createSlice({
name:"login",
initialState:{
   loginStatus:false,
},
reducers:{
    updateLoginState:(state,action)=>{
        state.loginStatus=action.payload.loginStatus;
    }
}
})

export const  {updateLoginState}=LoginSlice.actions;
export default LoginSlice.reducer;