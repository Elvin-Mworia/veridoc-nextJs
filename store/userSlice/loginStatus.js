import {createSlice} from "@reduxjs/toolkit"

const LoginSlice=createSlice({
name:"login",
initialState:{
email:"",
loginStatus:false,
password:""
},
reducers:{
    updateLoginState:(state,action)=>{
       // state.loginStatus=action.payload.loginStatus;
        return {
            ...state, // Keep the existing state
            ...action.payload, // Override with the new value(s)
          };
    }
}
})

export const  {updateLoginState}=LoginSlice.actions;
export default LoginSlice.reducer;