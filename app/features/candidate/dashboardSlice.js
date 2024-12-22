import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    statApplicant: [],
    statJobAlert: [],
    recentApplicant: [],
    recentNotify: [],
    loading: false,
}

export const dashboardSlice = createSlice({
    name: 'Candidate-Dashboard',
    initialState,
    reducers: {
        getStatisticsDashboard: (state, { payload }) => {
            state.statApplicant = payload.applicants
            state.statJobAlert = payload.jobs
        },
        getRecentApplicantDashboard: (state, { payload }) => {
            state.recentApplicant = payload.applicants
        },
        getRecentNotifyDashboard: (state, { payload }) => {
            state.recentNotify = payload.notify
        },
    }
})

export const { 
    getStatisticsDashboard,
    getRecentApplicantDashboard,
    getRecentNotifyDashboard,
} = dashboardSlice.actions
export default dashboardSlice.reducer