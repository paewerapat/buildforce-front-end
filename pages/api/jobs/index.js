import { axiosQL } from "../../../lib/axios";
const limitQuery = process.env.NEXT_PUBLIC_QUERY_LIMIT;

export default async function handler(req, res) {
    try {

        const { page, limit, jobFilter } = req.body
        const { data } = await axiosQL.post('', {
            query: `query Jobs($page: Int, $limit: Int, $filter: JSONObject) {
                jobs(page: $page, limit: $limit, filter: $filter) {
                    id, jobTitle, description, jobPosition, specialisms, workplaceModes, employmentType, salary, experience, 
                    qualification, expiredDate, display, createdAt, employer {
                        logo,
                        id,
                        companyName
                    }, contact {
                        country, city
                    }
                }
            }`,
            variables: {
                page,
                limit: limit || parseInt(limitQuery),
                filter: jobFilter
            }
        })

        const { jobs } = data.data
        return res.status(200).json({jobs, result: jobs?.length})
        
    } catch (err) {
        return res.status(500).json({msg: err.response.data.errors})
    }
}