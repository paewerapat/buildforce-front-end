import { axiosQL } from "../../../lib/axios";
const limitQuery = process.env.NEXT_PUBLIC_QUERY_LIMIT;

export default async function(req, res) {
    try {
        const { page, limit, employerFilter } = req.body
        const { data } = await axiosQL.post('', {
            query: `query employers($page: Int, $limit: Int, $filter: JSONObject) {
                employers(page: $page, limit: $limit, filter: $filter) {
                    id, logo, cover, companyName, contactEmail, phone, website, industry
                    about, founded, companySize, 
                    social {
                        facebook,
                        linkedin,
                        twitter,
                    }, contact {
                        country,
                        city,
                        address
                    }, admin {
                        id, 
                    }
                }
            }`,
            variables: {
                page, 
                limit: limit || parseInt(limitQuery),
                filter: employerFilter
            }
        })
        
        const { employers } = data.data;
        return res.status(200).json({employers, result: employers?.length || 0})
        
    } catch (err) {
        console.log("[update-profile] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}