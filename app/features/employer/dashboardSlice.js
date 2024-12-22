import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    statPostedJob: [],
    statApplicant: [],
    recentApplicant: [],
    recentNotify: [],
    loading: false,
}

export const dashboardSlice = createSlice({
    name: 'Employer-Dashboard',
    initialState,
    reducers: {
        getStatisticsDashboard: (state, { payload }) => {
            state.statPostedJob = payload.postedJob
            state.statApplicant = payload.applicant
        },
        getRecentApplicantDashboard: (state, { payload }) => {
            state.recentApplicant = payload.applicants
        },
        getRecentNotificationDashboard: (state, { payload }) => {
            state.recentNotify = payload.notify
        }
    }
})

export const { 
    getStatisticsDashboard,
    getRecentApplicantDashboard,
    getRecentNotificationDashboard
} = dashboardSlice.actions
export default dashboardSlice.reducer