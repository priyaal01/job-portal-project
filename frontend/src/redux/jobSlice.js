import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob:null,
    },
    reducers: {
        setAllJobs: (state, actions) => {
            state.allJobs = actions.payload;
        },
        setSingleJob:(state,actions)=>{
            state.singleJob = actions.payload;
        }
    }
});
export const { setAllJobs,setSingleJob } = jobSlice.actions
export default jobSlice.reducer;