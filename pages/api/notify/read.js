import { axiosQL } from "../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id } = req.body;
        const { data } = await axiosQL.post('', {
            query: `query notifyIsReadByRecipient($id: ID) {
                notifyIsReadByRecipient(id: $id) {
                    id, isRead
                }
            }`,
            variables: {
                id
            }
        })

        const { notifyIsReadByRecipient } = data.data;
        return res.status(200).json(notifyIsReadByRecipient);

    } catch (err) {
        console.log("[notify-id] err - ", err.response.data)
        return res.status(500).json({msg: err.response.data})
    }
}