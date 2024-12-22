import * as bcrypt from 'bcrypt'
import { axiosQL } from '../../../lib/axios';

export default async function handler(req, res) {
    try {
        const { id, newPassword, oldPassword } = req.body;
        const { data } = await axiosQL.post('', {
            query: `query userById($id: ID) {
                userById(id: $id) {
                    password
                }
            }`,
            variables: {
                id
            }
        })

        const { userById } = data.data;
        const encryptPasword = await bcrypt.hash(newPassword, 10)

        if(await bcrypt.compare(oldPassword, userById.password)) {
           await axiosQL.post('', {
                query: `mutation updatePassword($id: ID, $password: String) {
                    updatePassword(id: $id, password: $password) {
                        id, password
                    }
                }`,
                variables: {
                    id,
                    password: encryptPasword
                }
            })

            return res.status(200).json({msg: 'Update Password Successful.'})
        }

        return res.status(400).json({msg: 'Password incorrect.'})

    } catch (err) {
        console.log("[change-password] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}