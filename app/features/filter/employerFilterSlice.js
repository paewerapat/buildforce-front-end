import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    companyName: "",
    industry: "",
    sortDate: "",
    options: false,
}

export const employerFilterSlice = createSlice({
    name: "employer-filter",
    initialState,
    reducers: {
        addCompanyName: (state, { payload }) => {
            state.companyName = payload
            state.options = true
        },
        addIndustry: (state, { payload }) => {
            state.industry = payload
            state.options = true
        },
        addSortDate: (state, { payload }) => {
            state.sortDate = payload
        },
        resetEmployerFilter: (state, { payload }) => {
            return initialState
        }
    },
});

export const {
    addCompanyName,
    addIndustry,
    addSortDate,
    resetEmployerFilter,
} = employerFilterSlice.actions;
export default employerFilterSlice.reducer;
