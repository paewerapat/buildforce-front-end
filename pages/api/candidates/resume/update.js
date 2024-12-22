import axios, { axiosQL } from "../../../../lib/axios"
const graphQLURL = process.env.GRAPHQL_URL

export default async function handler(req, res) {
    try {
        const { 
            id, candidate, cv, description, education, experience, portfolio, awards, specialisms
        } = req.body
        const { updatetype: updateType } = req.headers
        
        if( updateType === "create") {
            const { data } = await axiosQL.post('', {
                query: `mutation createResume(
                    $candidate: ID, $cv: CvInput, $description: String,
                    $education: [EducationInput], $experience: [ExperienceInput],
                    $portfolio: PortfolioInput, $awards: [AwardsInput], $specialisms: [String],
                ) {
                    createResume(
                        candidate: $candidate, cv: $cv, description: $description, 
                        education: $education, experience: $experience, portfolio: $portfolio,
                        awards: $awards, specialisms: $specialisms
                    ) {
                        id
                    }
                }`,
                variables: {
                    candidate, cv, description, education, experience, portfolio,
                    awards, specialisms
                }
            })

            const { createResume } = data.data

            // const { createResume } = data.data;
            return res.status(200).json({msg: 'Create Resume successful', createResume})

        } else if (updateType === "update") {
            const { data } = await axiosQL.post('', {
                query: `mutation updateResume(
                    $id: ID, $cv: CvInput, $description: String,
                    $education: [EducationInput], $experience: [ExperienceInput],
                    $portfolio: PortfolioInput, $awards: [AwardsInput], $specialisms: [String],
                ) {
                    updateResume(
                        id: $id, cv: $cv, description: $description, 
                        education: $education, experience: $experience, portfolio: $portfolio,
                        awards: $awards, specialisms: $specialisms
                    ) {
                        id
                    }
                }`,
                variables: {
                    id, cv, description, education, experience, portfolio,
                    awards, specialisms
                }
            })

            const { updateResume } = data.data;
            return res.status(200).json({msg: 'Update Resume successful', updateResume})
        }

        return res.status(400).json({msg: 'Something wrong! Please try again.'})
    } catch (err) {
        console.log("[candidate-resume-update] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}