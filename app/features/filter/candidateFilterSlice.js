import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    jobPosition: "",
    experience: "",
    qualification: "",
    sortDate: "",
    options: false,
};

export const candidateFilterSlice = createSlice({
    name: "candidate-filter-slice",
    initialState,
    reducers: {
        addFullName: (state, { payload }) => {
            state.fullName = payload;
            state.options = true;
        },
        addJobPosition: (state, { payload }) => {
            state.jobPosition = payload;
            state.options = true;
        },
        addExperience: (state, { payload }) => {
            state.experience = payload
            state.options = true;
        },
        addQualification: (state, { payload }) => {
            state.qualification = payload
            state.options = true;
        },
        addSortDate: (state, { payload }) => {
            state.sortDate = payload;
            state.options = true;
        },
        resetCandidateFilter: (state, { payload }) => {
            return initialState
        }
    },
});

export const {
    addFullName,
    addExperience,
    addJobPosition,
    addQualification,
    addSortDate,
    resetCandidateFilter,
} = candidateFilterSlice.actions;
export default candidateFilterSlice.reducer;
