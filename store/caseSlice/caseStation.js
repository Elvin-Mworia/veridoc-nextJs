import {createSlice} from "@reduxjs/toolkit"

const CaseStationSlice=createSlice({
name:"caseStation",
initialState:{
  courtStation:"",  
},
reducers:{
    updateCaseStation:(state,action)=>{
       
        state.courtStation=action.payload.courtStation;
        
    }
}
})
export const  {updateCaseStation}=CaseStationSlice.actions;
export default CaseStationSlice.reducer;