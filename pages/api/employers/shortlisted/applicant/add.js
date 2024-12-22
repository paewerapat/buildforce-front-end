import { axiosQL } from "../../../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id, shortlisted } = req.body;
        const { data } = await axiosQL.post('', {
            query: `mutation addApplicantToShortlistedEmployer($id: ID, $shortlisted: ID) {
                addApplicantToShortlistedEmployer(id: $id, shortlisted: $shortlisted) {
                    id
                }
            }`,
            variables: {
                id, shortlisted
            }
        })

        const { addApplicantToShortlistedEmployer } = data.data;
        return res.status(200).json(addApplicantToShortlistedEmployer)

    } catch (err) {
        console.log("[add-shortlisted-applicant-to-employer] err - ", err.response.data)
        return res.status(500).json({msg: err.response.data})
    }
}