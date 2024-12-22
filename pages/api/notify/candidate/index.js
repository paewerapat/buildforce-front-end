import { axiosQL } from "../../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id, page, filter, limit } = req.body;
        const { data } = await axiosQL.post('', {
            query: `query notifyByRecipient($id: ID, $page: Int, $filter: String, $limit: Int) {
                notifyByRecipient(id: $id, page: $page, filter: $filter, limit: $limit) {
                    id, user {
                        __typename
                        ... on Candidate {
                            id, fullName, avatar
                        }
                        ... on Employer {
                            id, companyName, logo, industry, contact {
                                country, city
                            }
                        }
                    }, url, text, content, createdAt, isRead
                }
            }`,
            variables: {
                id, 
                page, 
                filter,
                limit,
            }
        })

        const { notifyByRecipient: notify } = data.data;
        return res.status(200).json({notify, result: notify?.length || 0});

    } catch (err) {
        console.log("[notify-candidate] err - ", err.response.data)
        return res.status(500).json({msg: err.response.data})
    }
}