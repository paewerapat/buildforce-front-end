import axios from "axios"
import { toast } from "react-toastify"
import { createNotifyAction } from "./notifyAction"
import { setLoadingState } from "../features/alertSlice"


export const applyJobAction = ({ candidate, job, employer, router, body }) => async (dispatch) => {
    try {

        dispatch(setLoadingState(true))
        const msg = {
            user: {id: candidate.id, name: candidate.fullName},
            text: 'has applied on your job.',
            recipients: [employer],
            url: `/job/${job.id}`,
            image: candidate.avatar,
            content: job.jobTitle,
            userType: 'Candidate',
            recipientsType: 'Employer'
        }

        const { data } = await axios.post('/api/applicants/create', body)
        toast.success(data.msg)
        
        dispatch(createNotifyAction({msg}))
        await router.replace(router.asPath)
        dispatch(setLoadingState(false))

    } catch (err) {
        console.log("[applyJob-action] err - ", err)
        dispatch(setLoadingState(false))
        return toast.error(err.response.data.msg)
    }
}

export const updateStatusApplicantAction = ({ body, employer, candidate, job, router }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const msg = {
            user: {id: employer.id, name: employer.companyName},
            text: `has ${body.status} on your applicant.`,
            recipients: [candidate.id],
            url: `/job/${job.id}`,
            image: employer.logo,
            content: job.jobTitle,
            userType: 'Employer',
            recipientsType: 'Candidate'
        }

        const { data } = await axios.post('/api/applicants/update', body)
        toast.success(data.msg)

        dispatch(createNotifyAction({msg}))
        await router.replace(router.asPath)
        dispatch(setLoadingState(false))
    } catch (err) {
        console.log("[applyJob-action] err - ", err)
        dispatch(setLoadingState(false))
        return toast.error(err.response.data.msg)
    }
}