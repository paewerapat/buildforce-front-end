import { axiosQL } from "../../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id } = req.body;
        const { data } = await axiosQL.post('', {
            query: `query employerByUser($admin: ID) {
                employerByUser(admin: $admin) {
                    id, logo, cover, companyName, contactEmail, phone, website, founded, companySize, 
                    industry, about, admin {
                        id
                    }, social {
                        facebook,
                        twitter,
                        linkedin
                    }, contact {
                        country,
                        city,
                        address
                    }
                }
            }`,
            variables: {
                admin: id
            }
        })

        const { employerByUser } = data.data;

        return res.status(200).json(employerByUser)
    } catch (err) {
        console.log("[profile-index] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }   
}