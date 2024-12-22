import { axiosQL } from "../../../../lib/axios";


export async function handler(req, res) {
    try {

        const { data } = await axiosQL.post("", {
            query: `mutation updateSocialCandidate($id: ID, $social: SocialInput) {
                updateSocialCandidate(id: $id, social: $social) {
                    id
                }
            }`,
            variables: {
                id, social
            }
        })

        const { updateSocialCandidate } = data.data;
        return res.status(200).json({ msg: 'Update Social of Candidate successful', updateSocialCandidate });
    } catch (err) {
        console.log("[update-profile] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}