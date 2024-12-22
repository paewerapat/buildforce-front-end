import { axiosQL } from "../../../lib/axios"


export default async function handler(req, res) {
    try {
        const { id } = req.query
        const { data } = await axiosQL.post('', {
            query: `query resumeByCandidate($candidate: ID) {
                resumeByCandidate(candidate: $candidate) {
                    id, description, education {
                        academicFields, college, educationYear, educationDescription
                    }, experience {
                        jobPosition, companyName, experienceYear, experienceDescription
                    }, portfolio {
                        name, url
                    }, awards {
                        awardTitle, awardProject, awardYear, awardDescription
                    }, specialisms, candidate {
                        avatar, fullName, jobPosition, phone, email, website, expectedSalary, 
                        experience, age, qualification, languages, specialisms, description, contact {
                            country, city, address
                        }, createdAt, social {
                            facebook, twitter, linkedin
                        }
                    }, cv {
                        name, url
                    }
                }
            }`,
            variables: {
                candidate: id
            }
        })

        const { resumeByCandidate } = data.data
        return res.status(200).json(resumeByCandidate)

    } catch (err) {
        console.log("[err-candidate-id] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}