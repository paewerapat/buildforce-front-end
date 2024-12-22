import { axiosQL } from "../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id } = req.query
        const { data } = await axiosQL.post('', {
            query: `query jobById($id: ID) {
                jobById(id: $id) {
                    id, jobTitle, description, jobPosition, specialisms, workplaceModes, employmentType, salary, experience, 
                    qualification, expiredDate, display, jobPosition, createdAt, contact {
                        country, city, address
                    }, employer {
                        logo,
                        id,
                        companyName,
                        industry,
                        companySize,
                        contactEmail,
                        phone,
                        founded,
                        website,
                        contact {
                            country,
                            city,
                        },
                        social {
                            facebook,
                            twitter,
                            linkedin
                        },
                    }
                }
            }`,
            variables: {
                id
            }
        })

        const { jobById } = data.data;
        return res.status(200).json(jobById)
    } catch (err) {
        console.log("[jobs-id] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}