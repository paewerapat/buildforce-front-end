import { axiosQL } from "../../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id } = req.body;
        const { data } = await axiosQL.post('', {
            query: `query candidateById($id: ID) {
                candidateById(id: $id) {
                    id, cv {
                        name, url
                    }
                }
            }`,
            variables: {
                id
            }
        })

        const { candidateById } = data.data;

        return res.status(200).json(candidateById)
    } catch (err) {
        console.log("[candidate-profile-cv] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}