import { axiosQL } from "../../../lib/axios"

export default async function handler(req, res) {

    const { id } = req.query
    const { page } = req.body;
    const { query_type } = req.headers

    try {
        if (query_type === "candidate") {
            const { data } = await axiosQL.post('', {
                query: `query applicantByCandidate($id: ID) {
                    applicantByCandidate(id: $id) {
                        id, candidate {
                            id, fullName
                        }, employer {
                            id, logo, contact {
                                country, city,
                            },
                        }, job {
                            id, jobTitle, employmentType
                        }, status, createdAt
                    }
                }`,
                variables: {
                    id
                }
            })
    
            const { applicantByCandidate } = data.data; 
            return res.status(200).json(applicantByCandidate);

        } else if (query_type === "job") {
            const { data } = await axiosQL.post('', {
                query: `query applicantByJob($id: ID) {
                    applicantByJob(id: $id) {
                        id, candidate {
                            id
                        }, employer {
                            id
                        }, job {
                            id
                        }, status
                    }
                }`,
                variables: {
                    id
                }
            })
    
            const { applicantByJob } = data.data; 
            return res.status(200).json(applicantByJob);

        } else if (query_type === "id") {
            const { data } = await axiosQL.post('', {
                query: `query applicantById($id: ID) {
                    applicantById(id: $id) {
                        id, candidate {
                            id
                        }, employer {
                            id
                        }, job {
                            id
                        }, status
                    }
                }`,
                variables: {
                    id
                }
            })
    
            const { applicantById } = data.data; 
            return res.status(200).json(applicantById);

        }

        return res.status(400).json({msg: "Something wrong! Please try again."})

    } catch (err) {
        console.log("[applicant-id] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}