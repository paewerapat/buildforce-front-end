import axios from '../../../lib/axios'
import { setLoadingState } from "../../features/alertSlice"
import { getApplicantByCandidate, getMoreApplicantByCandidate, setFilterApplicantByCandidate } from "../../features/candidate/applicantSlice"


export const getApplicantByCandidateAction = ({ id, filter }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post('/api/applicants/candidate', { id, filter })
        dispatch(getApplicantByCandidate(data))
        dispatch(setFilterApplicantByCandidate(filter))
        dispatch(setLoadingState(false))
    } catch (err) {
        dispatch(setLoadingState(false))
        console.log("[getApplicantByCandidate] err - ", err)
    }
}

export const getMoreApplicantByCandidateAction = ({ id, filter, page }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post('/api/applicants/candidate', { id, filter, page: page +  1})
        dispatch(getMoreApplicantByCandidate(data))
        dispatch(setFilterApplicantByCandidate(filter))
        dispatch(setLoadingState(false))
    } catch (err) {
        dispatch(setLoadingState(false))
        console.log("[getApplicantByCandidate] err - ", err)
    }
}