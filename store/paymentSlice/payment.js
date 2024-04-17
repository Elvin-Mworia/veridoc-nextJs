import {createSlice} from "@reduxjs/toolkit"

const PaymentSlice=createSlice({
name:"mpesa-online",
initialState:{
  paid:false,  
},
reducers:{
    updatePayment:(state,action)=>{
       
        state.paid=action.payload.paid;
        
    }
}
})
export const  {updatePayment}=PaymentSlice.actions;
export default PaymentSlice.reducer;