import { axiosQL } from "../../../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id, shortlisted } = req.body;
        const { data } = await axiosQL.post('', {
            query: `mutation deleteApplicantShortlistedEmployer($id: ID, $shortlisted: ID) {
                deleteApplicantShortlistedEmployer(id: $id, shortlisted: $shortlisted) {
                    id
                }
            }`,
            variables: {
                id, shortlisted
            }
        })

        const { deleteApplicantShortlistedEmployer } = data.data;
        return res.status(200).json(deleteApplicantShortlistedEmployer);

    } catch (err) {
        console.log("[delete-applicant-shortlisted-to-employer] err - ", err.response.data)
        return res.status(500).json({msg: err.response.data})
    }
}