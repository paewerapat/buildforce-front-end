import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./features/job/jobSlice";
import toggleSlice from "./features/toggle/toggleSlice";
import jobFilterSlice from "./features/filter/jobFilterSlice";
import employerSlice from "./features/employer/employerSlice";
import employerFilterSlice from "./features/filter/employerFilterSlice";
import candidateSlice from "./features/candidate/candidateSlice";
import candidateFilterSlice from "./features/filter/candidateFilterSlice";
import shopSlice from "./features/shop/shopSlice";
import userSlice from './features/auth/userSlice';
import notifySlice from './features/notifySlice';
import alertSlice from "./features/alertSlice";
import applicantByEmployer from "./features/employer/applicantSlice";
import jobByEmployer from './features/employer/jobSlice';
import applicantByCandidate from './features/candidate/applicantSlice'
import shortlistedByCandidate from './features/candidate/shortlistedSlice'
import shortlistedByEmployer from './features/employer/shortlistedSlice'
import employerDashboard from './features/employer/dashboardSlice'
import candidateDashboard from './features/candidate/dashboardSlice'
import homePage from './features/homeSlice'


export function initializeStore(preloadedState = {}) {
    return configureStore({
        reducer: {
            job: jobSlice,
            toggle: toggleSlice,
            jobFilter: jobFilterSlice,
            employer: employerSlice,
            employerFilter: employerFilterSlice,
            candidate: candidateSlice,
            candidateFilter: candidateFilterSlice,
            shop: shopSlice,
            user: userSlice,
            notify: notifySlice,
            alert: alertSlice,
            jobByEmployer: jobByEmployer,
            applicantByEmployer: applicantByEmployer,
            applicantByCandidate: applicantByCandidate,
            shortlistedByCandidate: shortlistedByCandidate,
            shortlistedByEmployer: shortlistedByEmployer,
            employerDashboard: employerDashboard,
            candidateDashboard: candidateDashboard,
            homePage: homePage,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        }).concat(),
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState,
    })
}
