import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    result: 0,
    page: 1,
};

export const candidateSlice = createSlice({
    name: "candidate",
    initialState,
    reducers: {
        getCandidates: (state, { payload }) => {
            return {
                ...state,
                data: payload.candidates,
                result: payload.result,
                page: initialState.page
            }
        },
        getMoreCandidates: (state, { payload }) => {
            if(payload.candidates.length < 1) return {
                ...state,
                page: state.page + 1
            }
            return {
                ...state,
                data: [...state.data, ...payload.candidates],
                result: state.result + payload.result,
                page: state.page + 1,
            }
        },
        loadingCandidate: (state, { payload }) => {
            state.loading = payload
        },
    },
});

export const {
    getCandidates,
    getMoreCandidates,
    loadingCandidate,
} = candidateSlice.actions;
export default candidateSlice.reducer;
