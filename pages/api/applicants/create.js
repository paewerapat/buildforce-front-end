import { axiosQL } from "../../../lib/axios"

export default async function handler(req, res) {
    try {
        const { candidate, employer, job, status } = req.body

        const { data } = await axiosQL.post('', {
            query: `mutation createApplicant($candidate: ID, $employer: ID, $job: ID, $status: String) {
                createApplicant(candidate: $candidate, employer: $employer, job: $job, status: $status) {
                    id
                }
            }`,
            variables: {
                candidate, employer, job, status
            }
        })

        // Update applied field in Job Model
        await axiosQL.post('', {
            query: `mutation appliedJob($id: ID) {
                appliedJob(id: $id) {
                    id
                }
            }`,
            variables: {
                id: job
            }
        })

        const { createApplicant } = data.data;
        return res.status(200).json({msg: 'Applied this job successful', createApplicant})

    } catch (err) {
        console.log("[applicant-create] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}