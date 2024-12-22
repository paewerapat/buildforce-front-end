import cryptoJs from 'crypto-js';
import * as bcrypt from 'bcrypt'
import { axiosQL } from '../../../lib/axios';
const PASS_PHRASE = process.env.PASS_PHRASE || ""

export default async function handler(req, res) {
    try {

        const { token, password } = req.body;

        const { data } = await axiosQL.post('', {
            query: `query userByResetToken($hash: String) {
                userByResetToken(hash: $hash) {
                    resetToken {
                        hash
                    }, id
                }
            }`,
            variables: {
                hash: token
            }
        })

        const { userByResetToken } = data.data
        if(!userByResetToken?.id) return res.status(200).json({msg: 'Invalid token or has expired'})

        const encryptPasword = await bcrypt.hash(password, 10)

        await axiosQL.post('', {
            query: `mutation updatePassword($id: ID, $password: String) {
                updatePassword(id: $id, password: $password) {
                    id, password
                }
            }`,
            variables: {
                id: userByResetToken.id,
                password: encryptPasword
            }
        })

        await axiosQL.post('', {
            query: `mutation updateUserToken($id: ID, $resetToken: JSONObject) {
                updateUserToken(id: $id, resetToken: $resetToken) {
                    id, resetToken {
                        hash, expiredIn
                    }
                }
            }`,
            variables: {
                id: userByResetToken.id,
                resetToken: {
                    hash: "",
                    expiredIn: 0
                }
            }
        })

        return res.status(200).json({msg: 'Update Password Successful'})
        
    } catch (err) {
        console.log("[reset-password] err - ", err.response.data.errors)
        console.log("[reset-password] err only - ", err)
        return res.status(500).json({msg: err.response.data.errors})
    }
}