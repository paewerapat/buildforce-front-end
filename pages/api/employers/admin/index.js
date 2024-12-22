import { axiosQL } from "../../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { admin } = req.body;
        const { data } = await axiosQL.post('', {
            query: `query Employer($admin: ID) {
                employerByUser(admin: $admin) {
                    id
                }
            }`,
            variables: {
                admin
            }
        })

        const { employerByUser } = data.data
        return res.status(200).json(employerByUser)

    } catch (err) {
        console.log("[employers-profile] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}