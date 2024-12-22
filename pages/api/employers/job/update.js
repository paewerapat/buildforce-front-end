import { axiosQL } from "../../../../lib/axios"


export default async function handler(req, res) {
    try {
        const { 
            jobTitle, description, jobPosition, workplaceModes, employmentType, specialisms, experience, 
            qualification, salary, expiredDate, id, display, contact
        } = req.body
        const { data } = await axiosQL.post('', {
            query: `mutation updateJob($jobTitle: String, $description: String, $workplaceModes: String, 
                $specialisms: [String], $experience: String, $qualification: String,
                $salary: Int, $expiredDate: Date, $display: Boolean, $jobPosition: String, 
                $employmentType: String, $id: ID, $contact: ContactInput, $applied: Int
            ) {
                updateJob(jobTitle: $jobTitle, description: $description, workplaceModes: $workplaceModes, 
                    specialisms: $specialisms, experience: $experience,
                    qualification: $qualification, salary: $salary, expiredDate: $expiredDate, 
                    id: $id, display: $display,
                    jobPosition: $jobPosition, employmentType: $employmentType, contact: $contact
                ) {
                    id
                }
            }`,
            variables: {
                jobTitle, description, specialisms, workplaceModes, experience, 
                qualification, salary, expiredDate, id, display, jobPosition, 
                employmentType, contact
            }
        })

        const { updateJob } = data.data;
        return res.status(200).json({msg: 'Update Job successful', updateJob})

    } catch (err) {
        console.log("[create-job] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}