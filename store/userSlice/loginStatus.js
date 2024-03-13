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

export default LoginSlice.reducer;