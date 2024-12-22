import { axiosQL } from "../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id, status } = req.body;

        const { data } = await axiosQL.post('', {
            query: `mutation updateApplicant($id: ID, $status: String) {
                updateApplicant(id: $id, status: $status) {
                    id
                }
            }`,
            variables: {
                id, status
            }
        })

        const { updateApplicant } = data.data
        return res.status(200).json({updateApplicant, msg: `${status} successful`});

    } catch (err) {
        console.log("[applicant-update] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}