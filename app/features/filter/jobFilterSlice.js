import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobTitle: "",
    workplaceModes: "",
    jobPosition: "",
    experience: "",
    salary: {
        min: 0,
        max: 1000000,
    },
    specialisms: [],
    sortDate: "",
    options: false,
};

export const jobFilterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        addJobTitle: (state, { payload }) => {
            state.jobTitle = payload;
            state.options = true;
        },
        addWorkplaceModes: (state, { payload }) => {
            state.workplaceModes = payload;
            state.options = true;
        },
        addJobPosition: (state, { payload }) => {
            state.jobPosition = payload;
            state.options = true;
        },
        addExperience: (state, { payload }) => {
            state.experience = payload;
            state.options = true;
        },
        addSalary: (state, { payload }) => {
            state.salary.min = payload.min
            state.salary.max = payload.max
            state.options = true;
        },
        addSortDate: (state, { payload }) => {
            state.sortDate = payload
        },
        addFilterFromQuery: (state, { payload }) => {
            state.options = payload.options;
            state.jobTitle = payload.title;
            state.experience = payload.experience;
            state.jobPosition = payload.position
        },
        addSpecialisms: (state, { payload }) => {
            state.specialisms = payload;
            state.options = true;
        },
        resetJobFilter: (state, { payload }) => {
            return initialState
        },
    },
});

export const {
    addExperience,
    addJobTitle,
    addJobPosition,
    addWorkplaceModes,
    addSalary,
    addSortDate,
    addSpecialisms,
    resetJobFilter,
    addFilterFromQuery,
} = jobFilterSlice.actions;
export default jobFilterSlice.reducer;
