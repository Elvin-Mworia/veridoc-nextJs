import {createSlice} from "@reduxjs/toolkit"

const CaseDivisionSlice=createSlice({
name:"caseDivision",
initialState:{ 
    courtDivision:"",   
},
reducers:{
    updateCaseDivision:(state,action)=>{
        state.courtDivision=action.payload.courtDivision;
    }
}
})
export const  {updateCaseDivision}= CaseDivisionSlice.actions;
export default  CaseDivisionSlice.reducer;