import * as bcrypt from 'bcrypt'
import { axiosQL } from '../../../lib/axios';

export default async function handler(req, res) {
    try {
        const { email, password, type } = req.body;
        const { data: findUser } = await axiosQL.post('', {
            query: `query userByEmailOrUsername($email: String, $username: String) { 
                userByEmailOrUsername(email: $email, username: $username) { 
                email, type, avatar, password, username
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

        const { userByEmailOrUsername } = findUser.data

        // if found email in DB then return status 400 and send errors messsage
        if(userByEmailOrUsername) return res.status(400).json({
            msg: {
                email: "This email already exists"
            }
        })

        // Create new user
        await axiosQL.post('', {
            query: `mutation createUser($email: String, $password: String, $type: String, $provider: String) { 
                createUser(email: $email, password: $password, type: $type, provider: $provider) { 
                    id
                } 
            }`,
            variables: {
                email,
                password: await bcrypt.hash(password, 10),
                type,
                provider: 'credentials'
            }
        })

        return res.status(200).json({
            msg: "User created successfully! Now you can login"
        })

    } catch (error) {
        console.log("[register-error] catch - ", error)
        return res.status(500).json({
            msg: error.messages
        })
    }
}