import axios from "../../lib/axios"
import { setLoadingState } from "../features/alertSlice"
import { addSortDate, resetJobFilter } from "../features/filter/jobFilterSlice"
import { getJobs, getMoreJobs, loadingJob } from "../features/job/jobSlice"



export const getJobsAction = () => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post(`/api/jobs`)
        dispatch(getJobs(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[getJobsAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}

export const getMoreJobsAction = ({page, jobFilter}) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post('/api/jobs', { page: page + 1, jobFilter })
        dispatch(getMoreJobs(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[getMoreJobsAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}

export const filterJobsAction = ({ jobFilter }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post('/api/jobs', { jobFilter })
        dispatch(getJobs(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[filterJobsAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}

export const sortDateFilterJobsAction = (value) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        dispatch(addSortDate(value))
        const { data } = await axios.post('/api/jobs', { jobFilter: { sortDate: value } })
        dispatch(getJobs(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[sortDateFilterJobsAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}

export const resetFilterJobsAction = () => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post('/api/jobs')
        dispatch(getJobs(data))
        dispatch(resetJobFilter())
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[filterJobsAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}