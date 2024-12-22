import { axiosQL } from "../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id } = req.body;
        const { data } = await axiosQL.post('', {
            query: `mutation deleteNotify($id: ID) {
                deleteNotify(id: $id) {
                    id
                }
            }`,
            variables: {
                id
            }
        })

        const { deleteNotify } = data.data;
        return res.status(200).json(deleteNotify)

    } catch (err) {
        console.log("[notify-delete] err - ", err)
        return res.status(500).json({msg: err.response.data})
    }
}