import { axiosQL } from "../../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { filter, id, page, limit } = req.body;
        const { data } = await axiosQL.post('', {
            query: `query applicantByEmployer($id: ID, $filter: JSONObject, $page: Int, $limit: Int) {
                applicantByEmployer(id: $id, filter: $filter, page: $page, limit: $limit) {
                    id, candidate {
                        id, avatar, jobPosition, expectedSalary, specialisms, contact {
                            country, city
                        }, user {
                            name
                        }, fullName
                    }, job {
                        id, jobTitle
                    }, status, createdAt
                }
            }`,
            variables: {
                id,
                filter,
                page,
                limit,
            }
        })

        const { applicantByEmployer: applicants } = data.data;
        return res.status(200).json({applicants, result: applicants?.length || 0});

    } catch (err) {
        console.log("[applicants/employer/filter] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data})
    }
}