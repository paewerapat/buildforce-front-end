import { axiosQL } from "../../../../lib/axios"

export default async function handler(req, res) {
    try {
        const {
            logo, cover, admin, companyName, phone, contactEmail, website, industry, about,
            companySize, founded, social, contact, id, userId
        } = req.body
        const { updatetype: updateType } = req.headers

        if(updateType === "create"){
            const { data: createProfile } = await axiosQL.post('', {
                query: `mutation createEmployer(
                    $logo: String, $cover: String, $companyName: String, $phone: String, $contactEmail: String,
                    $website: String, $industry: String, $about: String,
                    $companySize: String, $admin: [ID], $founded: String,
                ) {
                    createEmployer(
                        logo: $logo, cover: $cover,
                        companyName: $companyName, phone: $phone, contactEmail: $contactEmail,
                        website: $website, industry: $industry, about: $about, companySize: $companySize,
                        admin: $admin, founded: $founded,
                    ) {
                        id
                    }
                }`,
                variables: {
                    logo, cover, admin, companyName, phone, contactEmail, website, industry, about, companySize, founded
                }
            })

            if(createProfile?.errors) return res.status(400).json({msg: createProfile.errors.message})
            const { createEmployer } = createProfile.data;

            const { data: updateUser} = await axiosQL.post('', {
                query: `mutation updateUserEmployerInfo($id: ID, $employerInfo: ID) {
                    updateUserEmployerInfo(id: $id, employerInfo: $employerInfo) {
                        id
                    }
                }`,
                variables: {
                    id: userId, employerInfo: createEmployer.id
                }
            })

            if(updateUser?.errors) return res.status(400).json({msg: updateUser.errors.message})

            return res.status(200).json({msg: "Create Employer profile successful", createEmployer})

        } else if(updateType === "profile") {
            const { data } = await axiosQL.post('', {
                query: `mutation updateEmployer(
                    $id: ID, $logo: String, $cover: String, $companyName: String, $phone: String, $contactEmail: String,
                    $website: String, $industry: String, $about: String,
                    $companySize: String, $founded: String,
                ) {
                    updateEmployer(
                        id: $id, logo: $logo, cover: $cover,
                        companyName: $companyName, phone: $phone, contactEmail: $contactEmail,
                        website: $website, industry: $industry, about: $about, companySize: $companySize,
                        founded: $founded,
                    ) {
                        id
                    }
                }`,
                variables: {
                    id, logo, cover, companyName, phone, contactEmail, website, industry, about, companySize, founded
                }
            })

            const { updateEmployer } = await data.data;
            return res.status(200).json({msg: 'Update profile successful', updateEmployer})

        } else if (updateType === "social") {
            const { data: updateSocial } = await axiosQL.post('', {
                query: `mutation updateSocialEmployer($id: ID, $social: SocialInput) {
                    updateSocialEmployer(id: $id, social: $social) {
                        id
                    }
                }`,
                variables: {
                    id,
                    social
                }
            })

            const { updateSocialEmployer } = updateSocial.data;
            return res.status(200).json({msg: 'Update Social Employer profile successful', updateSocialEmployer})

        } else if (updateType === "contact") {
            const { data } = await axiosQL.post('', {
                query: `mutation updateContactEmployer($id: ID, $contact: ContactInput) {
                    updateContactEmployer(id: $id, contact: $contact) {
                        id
                    }
                }`,
                variables: {
                    id,
                    contact
                }
            })

            const { updateContactEmployer } = data.data;
            return res.status(200).json({msg: 'Update Contact Employer profile successful', updateContactEmployer})
        }

        return res.status(400).json({msg: 'Something wrong! Please try again.'})

    } catch (err) {
        console.log("[update-profile] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}