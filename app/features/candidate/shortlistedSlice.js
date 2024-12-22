

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs: [],
    employers: [],
    loading: false,
}

export const shortlistedSlice = createSlice({
    name: 'Shortlisted-By-Candidate',
    initialState,
    reducers: {
        getShortlistedByCandidate: (state, { payload }) => {
            return {
                ...state,
                jobs: payload.jobs,
                employers: payload.employers,
            }
        },
        loadingShortlistedByCandidate: (state, { payload }) => {
            state.loading = payload;
        },
        deleteJobFromShortlistedCandidate: (state, { payload }) => {
            const newShortlisted = state.jobs.filter((item) => 
              item.id !== payload
            )
            state.jobs = newShortlisted
          },
        deleteEmployersFromShortlistedCandidate: (state, { payload }) => {
            const newShortlisted = state.employers.filter((item) => 
                item.id !== payload
            )
            state.employers = newShortlisted
        }
    }    
})

export const { 
    getShortlistedByCandidate,
    loadingShortlistedByCandidate,
    deleteJobFromShortlistedCandidate,
    deleteEmployersFromShortlistedCandidate,
} = shortlistedSlice.actions
export default shortlistedSlice.reducer