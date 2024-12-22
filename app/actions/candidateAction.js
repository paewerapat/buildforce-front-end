import axios from "../../lib/axios"
import { setLoadingState } from "../features/alertSlice"
import { getCandidates, getMoreCandidates, loadingCandidate } from "../features/candidate/candidateSlice"
import { deleteEmployersFromShortlistedCandidate, deleteJobFromShortlistedCandidate } from "../features/candidate/shortlistedSlice"
import { addSortDate, resetCandidateFilter } from "../features/filter/candidateFilterSlice"


export const getCandidatesAction = () => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post(`/api/candidates`)
        dispatch(getCandidates(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[getCandidatesAction] err - ", err.response.data.msg)
        dispatch(setLoadingState(false))
    }
}

export const getMoreCandidatesAction = ({ page, candidateFilter }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post(`/api/candidates`, { candidateFilter, page: page + 1})
        dispatch(getMoreCandidates(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[getMoreCandidatesAction] err - ", err.response.data.msg)
        dispatch(setLoadingState(false))
    }
}

export const filterCandidatesListingAction = ({ candidateFilter, page }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post(`/api/candidates`, { candidateFilter, page })
        dispatch(getCandidates(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        dispatch(setLoadingState(false))
        console.log("[filterCandidatesListingAction] err - ", err)
    }
}

export const sortDateFilterCandidateAction = (value) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        dispatch(addSortDate(value))
        const { data } = await axios.post('/api/candidates', { candidateFilter: { sortDate: value }})
        dispatch(getCandidates(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        dispatch(setLoadingState(false))
        console.log("[sortDateFilterCandidateAction] err - ", err)
    }
}

export const resetFilterCandidatesAction = () => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.get('/api/candidates')
        dispatch(getCandidates(data))
        dispatch(resetCandidateFilter())
        dispatch(setLoadingState(false))
    } catch (err) {
        dispatch(setLoadingState(false))
        console.log("[filterCandidatesListingAction] err - ", err)
    }
}

export const addEmployerToShortlistedAction = ({ body, updateType, router, sessionUpdate }) => async (dispatch) => {
    try {

        dispatch(setLoadingState(true))
        await axios.post('/api/candidates/shortlisted/employers/update', body, {
            headers: {
                updateType: updateType
            }
        })
        await sessionUpdate()
        dispatch(setLoadingState(false))
        router.replace(router.asPath)
        
    } catch (err) {
        console.log("[addEmployerToShortlistedAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}

export const deleteJobShortlistedAction = ({ body, updateType }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        await axios.post('/api/candidates/shortlisted/jobs/update', body, {
            headers: {
                updateType: updateType
            }
        })
        dispatch(deleteJobFromShortlistedCandidate(body.shortlisted))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[deleteJobShortlistedAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}

export const deleteEmployerShortlistedAction = ({ body, updateType }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        await axios.post('/api/candidates/shortlisted/employers/update', body, {
            headers: {
                updateType: updateType
            }
        })
        dispatch(deleteEmployersFromShortlistedCandidate(body.shortlisted))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[deleteJobShortlistedAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}