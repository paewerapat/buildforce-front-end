import { toast } from "react-toastify"
import axios from "../../../lib/axios"
import { setLoadingState } from "../../features/alertSlice"
import { getApplicantByEmployer, getMoreApplicantByEmployer } from "../../features/employer/applicantSlice"

export const getApplicantByEmployerAction = ({ filter, id }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post('/api/applicants/employer', {filter, id})
        dispatch(getApplicantByEmployer(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[filterApplicantByEmployerAction] err - ", err)
        dispatch(setLoadingState(false))
        return toast.error(err.response.data.msg)       
    }
}

export const getMoreApplicantByEmployerAction = ({ filter, id, page }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post('/api/applicants/employer', {filter, id, page: page + 1} );
        dispatch(getMoreApplicantByEmployer(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[filterMoreApplicantByEmployerAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}