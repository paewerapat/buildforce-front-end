import { axiosQL } from "../../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id, position } = req.body;
        const { data: allApplicants } = await axiosQL.post('', {
            query: `query allApplicantByCandidate($id: ID) {
                allApplicantByCandidate(id: $id) {
                    id
                }
            }`,
            variables: {
                id
            }
        })

        const { data: allJobs } = await axiosQL.post('', {
            query: `query allJobPositionByCandidate($position: String) {
                allJobPositionByCandidate(position: $position) {
                    id, createdAt
                }
            }`,
            variables: {
                position
            }
        })

        const { allApplicantByCandidate: applicants } = allApplicants.data;
        const { allJobPositionByCandidate: jobs } = allJobs.data;

        return res.status(200).json({applicants, jobs})
        
    } catch (err) {
        console.log("[candidates-dashboard] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}