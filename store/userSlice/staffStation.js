import {createSlice} from "@reduxjs/toolkit"

const StaffStationSlice=createSlice({
name:"staffStation",
initialState:{
  station:"",  
},
reducers:{
    updateStaffStation:(state,action)=>{
       
        state.station=action.payload.station;
        
    }
}
})
export const  {updateStaffStation}=StaffStationSlice.actions;
export default StaffStationSlice.reducer;