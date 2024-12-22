import { axiosQL } from "../../../../lib/axios"


export default async function handler(req, res) {
    try {
        const { id } = req.query
        const { data } = await axiosQL.post('', {
            query: `query employerById($id: ID) {
                employerById(id: $id) {
                    id, shortlisted {
                        applicants {
                            id, status, candidate {
                                id, fullName, avatar, jobPosition, expectedSalary, specialisms, 
                                contact {
                                    country, city
                                }
                            }, 
                        }, candidates {
                            id, fullName, avatar, jobPosition, expectedSalary, specialisms, 
                            contact {
                                country, city
                            }
                        }
                    }
                }
            }`,
            variables: {
                id
            }
        })

        const { employerById } = data.data;
        return res.status(200).json({applicants: employerById.shortlisted.applicants, candidates: employerById.shortlisted.candidates});

    } catch (err) {
        console.log("[id-shortlisted-err] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}