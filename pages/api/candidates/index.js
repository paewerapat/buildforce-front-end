import { axiosQL } from "../../../lib/axios";
const limitQuery = process.env.NEXT_PUBLIC_QUERY_LIMIT;

export default async function handler(req, res) {
    try {
        const { page, limit, candidateFilter } = req.body
        const { data } = await axiosQL.post('', {
            query: `query candidates($page: Int, $limit: Int, $filter: JSONObject) {
                candidates(page: $page, limit: $limit, filter: $filter) {
                    id, fullName, jobPosition, contact { country, city }, expectedSalary, 
                    avatar, specialisms, experience
                }
            }`,
            variables: {
                page: page || 1, 
                limit: limit || parseInt(limitQuery),
                filter: candidateFilter
            }
        })

        const { candidates } = data.data;
        return res.status(200).json({candidates, result: candidates?.length || 0});

    } catch (err) {
        console.log("[candidates] err - ", err.response.data)
        return res.status(500).json({msg: err.response.data})
    }
}