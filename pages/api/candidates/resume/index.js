import { axiosQL } from "../../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { candidate } = req.body; 
        const { data } = await axiosQL.post('', {
            query: `query resumeByCandidate($candidate: ID), {
                resumeByCandidate(candidate: $candidate) {
                    id, cv { name, url }, description, education {
                        academicFields, 
                        college, 
                        educationYear, 
                        educationDescription,
                        id
                    }, experience {
                        jobPosition, 
                        companyName, 
                        experienceYear, 
                        experienceDescription,
                        id
                    }, portfolio {
                        name, url
                    }, awards {
                        awardTitle,
                        awardProject,
                        awardYear,
                        awardDescription,
                        id
                    }, specialisms
                }
            }`,
            variables: {
                candidate
            }
        })

        const { resumeByCandidate } = data.data;
        return res.status(200).json(resumeByCandidate)

    } catch (err) {
        console.log("[csv-upload] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}