import { axiosQL } from "../../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { job, candidate } = req.body;
        const { data } = await axiosQL.post('/', {
            query: `query applicantByJobAndCandidate($job: ID, $candidate: ID) {
                applicantByJobAndCandidate(job: $job, candidate: $candidate) {
                    id, candidate { id },
                }
            }`,
            variables: {
                job, candidate
            }
        })

        const { applicantByJobAndCandidate } = data.data;
        return res.status(200).json(applicantByJobAndCandidate)

    } catch (error) {
        console.log("[applicant-job-candidate] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}