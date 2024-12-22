import { axiosQL } from "../../../../lib/axios"


export default async function handler(req, res) {
    try {
        const { id, page, filter, limit } = req.body;
        const { data } = await axiosQL.post('', {
            query: `query applicantByCandidate($id: ID, $page: Int, $filter: String, $limit: Int) {
                applicantByCandidate(id: $id, page: $page, filter: $filter, limit: $limit) {
                    id, candidate {
                        id, fullName
                    }, employer {
                        id, logo, companyName, contact {
                            country, city,
                        },
                    }, job {
                        id, jobTitle, employmentType, workplaceModes, experience
                    }, status, createdAt
                }
            }`,
            variables: {
                id,
                page,
                filter,
                limit,
            }
        })

        const { applicantByCandidate: applicants } = data.data;
        return res.status(200).json({ applicants, result: applicants?.length || 0 });

    } catch (err) {
        console.log("[applicant/candidate/index] err - ", err.response.data)
        return res.status(500).json({msg: err.response.data})
    }
}