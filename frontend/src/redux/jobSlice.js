import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJob: [],
        searchJobByText: ""
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJob: (state, action) => {
            state.allAdminJob = action.payload
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload
        }
    }
});
export const { setAllJobs, setSingleJob, setAllAdminJob, setSearchJobByText } = jobSlice.actions
export default jobSlice.reducer;