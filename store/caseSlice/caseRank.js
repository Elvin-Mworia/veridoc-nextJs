import {createSlice} from "@reduxjs/toolkit"

const CaseRankSlice=createSlice({
name:"caseRank",
initialState:{
    courtRank:""
    
},
reducers:{
    updateCaseRank:(state,action)=>{
        state.courtRank=action.payload.courtRank;
    
    }
}
})
export const  {updateCaseRank}=CaseRankSlice.actions;
export default CaseRankSlice.reducer;