import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: [],
    loading: false,
    result: 0,
    filter: '',
    page: 1,
}

export const jobSlice = createSlice({
    name: 'Job-By-Employer',
    initialState,
    reducers: {
        getJobByEmployer: (state, { payload }) => {
            return {
                ...state,
                data: payload.jobs,
                result: payload.result,
                page: initialState.page
            }
        },
        getMoreJobByEmployer: (state, { payload }) => {
            if(payload.jobs.length < 1) return {
                ...state,
                page: state.page + 1
            }
            return {
                ...state,
                data: [...state.data, ...payload.jobs],
                result: payload.result + state.result,
                page: initialState.page + 1
            }
        },
        loadingJobByEmployer: (state, { payload }) => {
            state.loading = payload;
        },
        setFilterJobByEmployer: (state, { payload }) => {
            state.filter = payload
        }
    }
})

export const { 
    getJobByEmployer,
    getMoreJobByEmployer,
    loadingJobByEmployer,    
    setFilterJobByEmployer,
} = jobSlice.actions
export default jobSlice.reducer