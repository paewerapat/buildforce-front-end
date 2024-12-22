import { axiosQL } from "../../../../lib/axios"
const limitQuery = process.env.NEXT_PUBLIC_QUERY_LIMIT;

export default async function handler(req, res) {
    try {
        const { employer, jobFilter, page, limit } = req.body
        const { data } = await axiosQL.post('', {
            query: `query jobByEmployer($employer: ID, $filter: String, $page: Int, $limit: Int) {
                jobByEmployer(employer: $employer, filter: $filter, page: $page, limit: $limit) {
                    id, jobTitle, contact {
                        country, city
                    }, expiredDate, createdAt, employer {
                        logo
                    }, display, jobPosition, applied, workplaceModes, experience, employmentType
                }
            }`,
            variables: {
                employer,
                filter: jobFilter,
                page: page,
                limit: limit,
            }
        })

        const { jobByEmployer: jobs } = data.data;
        return res.status(200).json({jobs, result: jobs?.length || 0})

    } catch (err) {
        console.log("[index-job] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}