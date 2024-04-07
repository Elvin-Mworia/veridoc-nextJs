import {createSlice} from "@reduxjs/toolkit"

const FileSlice=createSlice({
name:"file",
initialState:{
  file:null,  
},
reducers:{
    updateFile:(state,action)=>{
       
        state.file=action.payload.file;
        
    }
}
})
export const  {updateFile}=FileSlice.actions;
export default FileSlice.reducer;