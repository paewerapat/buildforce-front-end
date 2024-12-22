import { axiosQL } from "../../../../lib/axios";


export default async function handler(req, res) {
    try {
        
        const { id } = req.body;
        const { data } = await axiosQL.post('', {
            query: `query allApplicantByEmployer($id: ID) {
                allApplicantByEmployer(id: $id) {
                    id, status
                }
            }`,
            variables: {
                id,
            }
        })
        const { allApplicantByEmployer: allApplicants } = data.data;
        return res.status(200).json(allApplicants);

    } catch (err) {
        console.log("[applicants/employer/filter] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data})
    }
}