import { toast } from "react-toastify"
import axios from "../../lib/axios"
import { setLoadingState } from "../features/alertSlice"
import { addApplicantToShortlistedEmployer, deleteApplicantToShortlistedEmployer } from "../features/auth/userSlice"
import { getEmployers, getMoreEmployers, loadingEmployers } from "../features/employer/employerSlice"
import { deleteApplicantFromShortlistedEmployerPage, deleteCandidateToShortlistedEmployer } from "../features/employer/shortlistedSlice"
import { addSortDate, resetEmployerFilter } from "../features/filter/employerFilterSlice"


export const getEmployersAction = () => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post(`/api/employers`)
        dispatch(getEmployers(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[getEmployersAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}

export const getMoreEmployersAction = ({ page, employerFilter }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post(`/api/employers`, { employerFilter, page: page + 1 })
        dispatch(getMoreEmployers(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[getMoreEmployersAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}

export const filterEmployerListingAction = ({ employerFilter }) => async (dispatch) => {
    try {
        console.log("employerFilter - ", employerFilter)
        dispatch(setLoadingState(true))
        const { data } = await axios.post('/api/employers', { employerFilter })
        dispatch(getEmployers(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[getMoreEmployersAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}

export const sortDateFilterEmployerAction = (value) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        dispatch(addSortDate(value))
        const { data } = await axios.post(`/api/employers`, { employerFilter: { sortDate: value } })
        dispatch(getEmployers(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[sortDateFilterEmployerAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}

export const resetEmployerFilterAction = () => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        dispatch(resetEmployerFilter())
        const { data } = await axios.post(`/api/employers`)
        dispatch(getEmployers(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[getMoreEmployersAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}

export const addCandidateToShortlistedEmployerAction = ({body, updateType, router, sessionUpdate}) => async (dispatch) => {
    try {

        dispatch(setLoadingState(true))
        await axios.post('/api/employers/shortlisted/candidate/update', body, {
            headers: {
                updateType: updateType
            }
        })

        await sessionUpdate()
        dispatch(setLoadingState(false))
        router.replace(router.asPath)
    } catch (err) {
        console.log("[action-addCandidateToShortlistedEmployer] err - ", err)
        toast.error(err.response.data.msg)
    }
} 

export const addApplicantToShortlistedEmployerAction = (body, applicantId) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        await axios.post('/api/employers/shortlisted/applicant/add', body)
        dispatch(addApplicantToShortlistedEmployer(applicantId))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[action-addApplicantToShortlistedEmployer] err - ", err)
        toast.error(err.response.data.msg)
    }
}

export const deleteApplicantFromShortlistedEmployerAction = (body, applicantId) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        await axios.post('/api/employers/shortlisted/applicant/delete', body)
        dispatch(deleteApplicantToShortlistedEmployer(applicantId))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[deleteApplicantFromShortlistedEmployerAction] err - ", err)
        toast.error(err.response.data.msg)
    }
}

export const deleteApplicantFromShortlistedEmployerPageAction = (body, applicantId) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        await axios.post('/api/employers/shortlisted/applicant/delete', body)
        dispatch(deleteApplicantFromShortlistedEmployerPage(applicantId))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[deleteApplicantFromShortlistedEmployerPageAction] err - ", err)
        toast.error(err.response.data.msg)
    }
}

export const deleteCandidateFromShortlistedEmployerAction = ({body, id}) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        await axios.post('/api/employers/shortlisted/candidate/update', body, {
            headers: {
                updateType: 'delete'
            }
        })
        dispatch(deleteCandidateToShortlistedEmployer(id))
    } catch (err) {
        console.log("[action-deleteApplicantToShortlistedEmployer] err - ", err)
        toast.error(err.response.data.msg)
    }
}