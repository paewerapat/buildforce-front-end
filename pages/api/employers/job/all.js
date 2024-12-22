import { axiosQL } from "../../../../lib/axios"

export default async function handler(req, res) {
    try {
        const { id } = req.body
        const { data } = await axiosQL.post('', {
            query: `query allJobByEmployer($id: ID) {
                allJobByEmployer(id: $id) {
                    id, jobTitle, contact {
                        country, city
                    }, expiredDate, createdAt, employer {
                        logo
                    }, display, jobPosition, applied
                }
            }`,
            variables: {
                id
            }
        })

        const { allJobByEmployer: jobs } = data.data;
        return res.status(200).json(jobs)

    } catch (err) {
        console.log("[index-job] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}