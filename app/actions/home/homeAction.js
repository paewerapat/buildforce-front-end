import axios from "../../../lib/axios"
import { setLoadingState } from "../../features/alertSlice"
import { getJobHomeData } from "../../features/homeSlice"


export const getJobHomePageAction = ({ filter, limit, filterType }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post(`/api/jobs`, { jobFilter: {
            options: true,
            [filterType]: filter
        }, limit})
        dispatch(getJobHomeData(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[getJobHomePageAction] err - ", err)
        dispatch(setLoadingState(false))
    }
}