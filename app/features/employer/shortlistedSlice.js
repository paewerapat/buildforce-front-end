import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    applicants: [],
    candidates: [],
    loading: false,
}

export const shortlistedSlice = createSlice({
    name: 'Job-By-Employer',
    initialState,
    reducers: {
        getShortlistedByEmployer: (state, { payload }) => {
            return {
                ...state,
                applicants: payload.applicants,
                candidates: payload.candidates
            }
        },
        deleteCandidateToShortlistedEmployer: (state, { payload }) => {
            const newShortlisted = state.candidates.filter((item) => 
              item.id !== payload
            )
            state.candidates = newShortlisted
          },
        deleteApplicantFromShortlistedEmployerPage: (state, { payload }) => {
            const newShortlisted = state.applicants.filter((item) => 
                item.id !== payload
            )
            state.applicants = newShortlisted
        }
    }
})

export const { 
    getShortlistedByEmployer,
    deleteApplicantFromShortlistedEmployerPage,
    deleteCandidateToShortlistedEmployer,
} = shortlistedSlice.actions
export default shortlistedSlice.reducer