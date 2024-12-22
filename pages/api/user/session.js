import { axiosQL } from "../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { email } = req.body;
        const { data } = await axiosQL.post('', {
            query: `query userByEmailOrUsername($email: String) {
                userByEmailOrUsername(email: $email) {
                    id, email, type, avatar, provider, candidateInfo { 
                        id, fullName, avatar, jobPosition, shortlisted {
                            jobs {
                                id
                            }, employers {
                                id
                            }
                        } 
                    }, employerInfo {
                        id, companyName, logo, shortlisted {
                            applicants {
                                id
                            }, candidates {
                                id
                            }
                        } 
                    },
                }
            }`,
            variables: {
                email
            }
        })
        
        const { userByEmailOrUsername } = data.data;
        return res.status(200).json(userByEmailOrUsername)
        
    } catch (err) {
        console.log("[auth-session] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}