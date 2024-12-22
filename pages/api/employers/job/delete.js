import { axiosQL } from "../../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id } = req.body;
        const { data } = await axiosQL.post('', {
            query: `mutation deleteJob($id: ID) {
                deleteJob(id: $id) {
                    id, jobTitle
                }
            }`,
            variables: {
                id
            }
        })

        const { deleteJob } = data.data;
        return res.status(200).json({msg: `Delete ${deleteJob.jobTitle} successful`})

    } catch (err) {
        console.log("[delete-job] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}