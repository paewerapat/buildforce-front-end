import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    result: 0,
    page: 1,
};

export const employerSlice = createSlice({
    name: "employer",
    initialState,
    reducers: {
        getEmployers: (state, { payload }) => {
            console.log("payload - ", payload)
            return {
                ...state,
                data: payload.employers,
                result: payload.result,
                page: initialState.page,
            }
        },
        getMoreEmployers: (state, { payload }) => {
            if(payload.employers.length < 1) return {
                ...state,
                page: state.page + 1
            }
            return {
                ...state,
                data: [...state.data, ...payload.employers],
                result: state.result + payload.result,
                page: state.page + 1,
            }
        },
        loadingEmployers: (state, { payload }) => {
            state.loading = payload
        },
    },
});

export const {
    getEmployers,
    getMoreEmployers,
    loadingEmployers,
} = employerSlice.actions;
export default employerSlice.reducer;
