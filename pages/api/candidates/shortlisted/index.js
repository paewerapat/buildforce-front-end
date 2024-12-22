import { axiosQL } from "../../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id } = req.body;
        const { data } = await axiosQL.post('', {
            query: `query candidateById($id: ID) {
                candidateById(id: $id) {
                    shortlisted {
                        jobs {
                            id, jobTitle, contact {
                                city, country
                            }, expiredDate, jobPosition, employer {
                                logo
                            }, display
                        }, employers {
                            id, logo, companyName, industry, contact {
                                country, city
                            }, contactEmail, phone
                        }
                    }
                }
            }`,
            variables: {
                id
            }
        })

        const { shortlisted } = data.data.candidateById;
        return res.status(200).json({jobs: shortlisted.jobs, employers: shortlisted.employers})
        
    } catch (err) {
        console.log("[index-shortlisted-err] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}