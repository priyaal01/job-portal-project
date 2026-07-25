import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        allCompany:[],
        singleCompany: null,
        searchCompanyByText:""
    },
    reducers: {
        setAllCompany:(state,action)=>{
            state.allCompany= action.payload
        },
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload
        },
        setSerchCompanyByText: (state,action)=>{
            state.searchCompanyByText=action.payload
        }
    }
})
export const { setSingleCompany , setAllCompany, setSerchCompanyByText  } = companySlice.actions
export default companySlice.reducer;