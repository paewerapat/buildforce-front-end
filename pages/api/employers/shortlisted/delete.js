import { axiosQL } from "../../../../lib/axios"


export default async function handler(req, res) {
    try {
        const { id } = req.body;
        const { data } = await axiosQL.post('', {
            query: `mutation deleteAllShortlistedEmployer($id: ID) {
                deleteAllShortlistedEmployer(id: $id) {
                    id
                }
            }`,
            variables: {
                id
            }
        })
        
        const { deleteShortlistedEmployer } = data.data;
        return res.status(200).json({msg: 'Delete shortlisted successful'})

    } catch (err) {
        console.log("[candidate-shortlisted-err] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}