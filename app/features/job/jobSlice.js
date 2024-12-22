import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    result: 0,
    page: 1,
};

export const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        getJobs: (state, { payload }) => {
            return {
                ...state,
                data: payload.jobs,
                result: payload.result,
                page: initialState.page,
            }
        },
        getMoreJobs: (state, { payload }) => {
            if(payload.jobs.length < 1) return {
                ...state,
                page: state.page + 1
            }
            return {
                ...state,
                data: [...state.data, ...payload.jobs],
                result: state.result + payload.result,
                page: state.page + 1,
            }
        },
        loadingJob: (state, action) => {
            return {
                ...state,
                loading: action.payload
            }
        },
    },
});

export const {
    getJobs,
    getMoreJobs,
    loadingJob,
} = jobSlice.actions;
export default jobSlice.reducer;
