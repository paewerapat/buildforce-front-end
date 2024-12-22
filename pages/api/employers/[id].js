import { axiosQL } from "../../../lib/axios";

export default async function handler(req, res) {
    try {
        const { id } = req.query;
        const { data } = await axiosQL.post('', {
            query: `query employerById($id: ID) {
                employerById(id: $id) {
                    id, companyName, phone, contactEmail, website,
                    industry, about, companySize, logo, cover, founded, companySize, social {
                        facebook, twitter, linkedin
                    }, contact {
                        country, city, address
                    }
                }
            }`,
            variables: {
                id
            }
        })
        const { employerById } = data.data;
        return res.status(200).json(employerById)
    } catch (error) {
        
    }
}