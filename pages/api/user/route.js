import { axiosQL } from "../../../lib/axios";


export default async function handler(req, res) {
    const { data } = await axiosQL.post('', {
        query: `query userByEmailOrUsername($email: String, $username: String) { 
          userByEmailOrUsername(email: $email, username: $username) { 
            id, email, type, avatar, username
          } 
        }`,
        variables: {
          email: email,
        }
    }, {
        headers: {
            'Apollo-Require-Preflight': 'true', 
            'Content-Type': 'application/json'
        }
    })

    const { userByEmailOrUsername: user } = data.data;
    return res.json(user)
}