import axios from "../../../lib/axios"
import { setLoadingState } from "../../features/alertSlice"
import { getJobByEmployer, getMoreJobByEmployer, setFilterJobByEmployer } from "../../features/employer/jobSlice"


export const filterJobsByEmployerAction = ({ jobFilter, employer }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        dispatch(setFilterJobByEmployer(jobFilter))
        const { data } = await axios.post('/api/employers/job', { jobFilter, employer })
        dispatch(getJobByEmployer(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[filterJobsByEmployerAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}

export const getMoreJobsByEmployerAction = ({ jobFilter, employer, page }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post('/api/employers/job', { jobFilter, employer, page: page + 1 })
        dispatch(getMoreJobByEmployer(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[filterMoreJobsByEmployerAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}