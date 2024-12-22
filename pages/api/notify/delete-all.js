import { axiosQL } from "../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id } = req.body;
        const { data } = await axiosQL.post('', {
            query: `mutation deleteAllNotify($id: ID) {
                deleteAllNotify(id: $id) {
                    id
                }
            }`,
            variables: {
                id
            }
        })

        const { deleteAllNotify } = data.data;
        return res.status(200).json(deleteAllNotify)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}