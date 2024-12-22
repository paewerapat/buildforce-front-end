import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    page: 1,
    result: 0,
    filter: {
        filterJob: '',
        filterDate: '',
        status: '',
    }
}

export const applicantSlice = createSlice({
    name: 'Applicant-By-Employer',
    initialState,
    reducers: {
        getApplicantByEmployer: (state, { payload }) => {
            return {
                ...state,
                data: payload.applicants,
                page: initialState.page,
                result: payload.result,
            }
        },
        getMoreApplicantByEmployer: (state, { payload }) => {
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
        setFilterTopBoxApplicantByEmployer: (state, { payload }) => {
            state.filter.filterDate = payload.filterDate;
            state.filter.filterJob = payload.filterJob;
        },
        setFilterStatusApplicantByEmployer: (state, { payload }) => {
            state.filter.status = payload;
        },
        loadingApplicantByEmployer: (state, { payload }) => {
            state.loading = payload;
        },
        resetApplicantByEmployer: (state, action) => {
            return initialState
        }
    }    
})

export const { 
    getApplicantByEmployer,
    getMoreApplicantByEmployer,
    loadingApplicantByEmployer,
    resetApplicantByEmployer,
    setFilterTopBoxApplicantByEmployer,
    setFilterStatusApplicantByEmployer,
 } = applicantSlice.actions
export default applicantSlice.reducer