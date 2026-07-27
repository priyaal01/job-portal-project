import { createSlice } from "@reduxjs/toolkit";


const applicationSlice= createSlice({
    name:"application",
    initialState:{
        applicants:[],
        applications:[],
        
    },

    reducers:{
        setApplicants: (state,action)=>{
            state.applicants=action.payload
        },
        setApplications:(state,action)=>{
            state.applications=action.payload
        }
    }
})
export const {setApplicants,setApplications}= applicationSlice.actions
export default applicationSlice.reducer;