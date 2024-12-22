import { axiosQL } from "../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id } = req.body;
        await axiosQL.post('', {
            query: `mutation isReadNotify($id: ID) {
                isReadNotify(id: $id) {
                    id
                }
            }`,
            variables: {
                id
            }
        })

        return res.status(200);

    } catch (err) {
        console.log("[notify-update] err - ", err)
        return res.status(500).json({msg: err.response.data})
    }
}