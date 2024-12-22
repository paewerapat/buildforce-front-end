import { axiosQL } from "../../../../lib/axios";

export default async function handler(req, res) {
    try {
        const {
            id, avatar, fullName, jobPosition, phone, email, website, expectedSalary, 
            experience, age, qualification, languages, 
            specialisms, description, user, cv, contact, social
        } = req.body;
        const { updatetype: updateType } = req.headers

        if(updateType === "create") {
            const { data: createProfile } = await axiosQL.post('', {
                query: `mutation createCandidate(
                    $avatar: String, $fullName: String, $jobPosition: String, $phone: String, $email: String,
                    $website: String, $expectedSalary: Int, $experience: String, $age: Int,
                    $education: String, $languages: [String], $specialisms: [String],
                    $description: String, $user: ID
                ) {
                    createCandidate(
                        avatar: $avatar, fullName: $fullName, jobPosition: $jobPosition, phone: $phone, email: $email,
                        website: $website, expectedSalary: $expectedSalary, experience: $experience, age: $age,
                        education: $education, languages: $languages, specialisms: $specialisms,
                        description: $description, user: $user,
                    ) {
                        id
                    }
                }`,
                variables: {
                    avatar, fullName, jobPosition, phone, email, website, expectedSalary, 
                    experience, age, qualification, languages, specialisms, description, user
                }
            })

            if(createProfile?.errors) return res.status(400).json({msg: createProfile.errors.message})

            // Update Candidate info of User
            const { data: updateUser} = await axiosQL.post('', {
                query: `mutation updateUserCandidateInfo($id: ID, $candidateInfo: ID) {
                    updateUserCandidateInfo(id: $id, candidateInfo: $candidateInfo) {
                        id
                    }
                }`,
                variables: {
                    id: user,
                    candidateInfo: createProfile.data.createCandidate.id,
                }
            })

            if(updateUser?.errors) return res.status(400).json({msg: updateUser.errors.message})

            const { createCandidate } = createProfile.data;
            return res.status(200).json({ msg: 'Create Candidate profile successful', createCandidate })
        
        } else if (updateType === "update") {
            const { data: update } = await axiosQL.post('', {
                query: `mutation updateCandidate(
                    $id: ID, $avatar: String, $fullName: String, $jobPosition: String, $phone: String, $email: String,
                    $website: String, $expectedSalary: Int, $experience: String, $age: Int,
                    $education: String, $languages: [String], $specialisms: [String],
                    $description: String, $qualification: String,
                ) {
                    updateCandidate(
                        id: $id, avatar: $avatar, fullName: $fullName, jobPosition: $jobPosition, phone: $phone, email: $email,
                        website: $website, expectedSalary: $expectedSalary, experience: $experience, age: $age,
                        education: $education, languages: $languages, specialisms: $specialisms,
                        description: $description, qualification: $qualification,
                    ) {
                        id
                    }
                }`,
                variables: {
                    fullName, jobPosition, phone, email, website, experience, age, 
                    qualification, languages, 
                    specialisms, description, expectedSalary, id
                }

            })

            const { updateCandidate } = update.data;
            return res.status(200).json({ msg: 'Update Candidate profile successful', updateCandidate })

        } else if (updateType === "social") {
            const { data: updateSocial } = await axiosQL.post("", {
                query: `mutation updateSocialCandidate($id: ID, $social: SocialInput) {
                    updateSocialCandidate(id: $id, social: $social) {
                        id
                    }
                }`,
                variables: {
                    id, social
                }
            })

            const { updateSocialCandidate } = updateSocial.data;
            return res.status(200).json({ msg: 'Update Social of Candidate successful', updateSocialCandidate });

        } else if (updateType === "contact") {

            const { data } = await axiosQL.post('', {
                query: `mutation updateContactCandidate($id: ID, $contact: ContactInput) {
                    updateContactCandidate(id: $id, contact: $contact) {
                        id
                    }
                }`,
                variables: {
                    id, contact
                }
            })

            const { updateContactCandidate } = data.data;
            return res.status(200).json({ msg: 'Update contact of Candidate successful', updateContactCandidate })

        } else if (updateType === "cv") {
            const { data } = await axiosQL.post('', {
                query: `mutation updateCvCandidate($id: ID, $cv: CvInput) {
                    updateCvCandidate(id: $id, cv: $cv) {
                        id
                    }
                }`,
                variables: {
                    id, cv
                }
            })
            
            const { updateCvCandidate } = data.data;
            return res.status(200).json({ msg: 'Update Cv of Candidate successful', updateCvCandidate})

        }

        // If not match update type return;
        return res.status(400).json({msg: 'Something wrong! Please try again.'})
    } catch (err) {
        console.log("[update-profile] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}