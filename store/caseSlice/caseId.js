import {createSlice} from "@reduxjs/toolkit"

const CaseIdSlice=createSlice({
name:"caseId",
initialState:{
  caseId:"",  
},
reducers:{
    updateCaseId:(state,action)=>{
       
        state.caseId=action.payload.caseId;
        
    }
}
})
export const  {updateCaseId}=CaseIdSlice.actions;
export default CaseIdSlice.reducer;