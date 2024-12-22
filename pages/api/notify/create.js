import { axiosQL } from "../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { user, recipients, url, text, content, image, userType, recipientsType } = req.body;
        const { data } = await axiosQL.post('', {
            query: `mutation createNotify(
                    $user: ID, 
                    $recipients: [ID], 
                    $url: String, 
                    $text: String, 
                    $content: String, 
                    $image: String,
                    $userType: UserType,
                    $recipientsType: UserType,
                ) {
                createNotify(
                    user: $user,
                    recipients: $recipients,
                    url: $url,
                    text: $text,
                    image: $image,
                    content: $content,
                    userType: $userType,
                    recipientsType: $recipientsType,
                ) {
                    id, text, url, content, image, recipients {
                        __typename
                        ... on Candidate {
                            id, avatar
                        }
                        ... on Employer {
                            id, logo
                        }
                    }, user {
                        __typename
                        ... on Candidate {
                            id, fullName, avatar
                        }
                        ... on Employer {
                            id, companyName, logo
                        }
                    }, createdAt
                }
            }`,
            variables: {
                user: user.id, recipients, url, text, content, image, userType, recipientsType
            }
        })

        const { createNotify } = data.data;
        return res.status(200).json(createNotify)

    } catch (err) {
        console.log("[notify-create] err - ", err)
        return res.status(500).json({msg: err.response.data})
    }
}