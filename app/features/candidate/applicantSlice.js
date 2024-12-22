import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    page: 1,
    result: 0,
    filter: {}
}

export const applicantSlice = createSlice({
    name: 'Applicant-By-Candidate',
    initialState,
    reducers: {
        getApplicantByCandidate: (state, { payload }) => {
            return {
                ...state,
                data: payload.applicants,
                page: initialState.page,
                result: payload.result,
            }
        },
        getMoreApplicantByCandidate: (state, { payload }) => {
            if(payload.applicants.length < 1) return {
                ...state,
                page: state.page + 1
            }
            return {
                ...state,
                data: [payload.applicants, ...state.data],
                page: state.page + 1,
                result: state.result + payload.result,
            }
        },
        setFilterApplicantByCandidate: (state, { payload }) => {
            state.filter = payload
        },
        loadingApplicantByCandidate: (state, { payload }) => {
            state.loading = payload;
        },
        resetApplicantByEmployer: (state, action) => {
            return initialState
        }
    }    
})

export const { 
    getApplicantByCandidate,
    getMoreApplicantByCandidate,
    loadingApplicantByCandidate,
    setFilterApplicantByCandidate,
    resetApplicantByEmployer,
} = applicantSlice.actions
export default applicantSlice.reducer