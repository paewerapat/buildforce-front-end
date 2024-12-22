import { axiosQL } from "../../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id } = req.body;

        const { data: allJob } = await axiosQL.post('', {
            query: `query allJobByEmployer($id: ID) {
                allJobByEmployer(id: $id) {
                    id
                }
            }`,
            variables: {
                id
            }
        })

        const { data: allApplicant } = await axiosQL.post('', {
            query: `query allApplicantByEmployer($id: ID) {
                allApplicantByEmployer(id: $id) {
                    id, createdAt
                }
            }`,
            variables: {
                id
            }
        })

        const { allJobByEmployer: postedJob } = allJob.data;
        const { allApplicantByEmployer: applicant } = allApplicant.data;

        return res.status(200).json({postedJob, applicant})

    } catch (err) {
        console.log("[employer-dashboard] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}