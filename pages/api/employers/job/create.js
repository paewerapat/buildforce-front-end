import { axiosQL } from "../../../../lib/axios";

export default async function handler(req, res) {
    try {
        const { 
            jobTitle, description, jobPosition, workplaceModes, employmentType, specialisms, experience, 
            qualification, salary, expiredDate, employer, display, contact
        } = req.body;

        const { data } = await axiosQL.post('', {
            query: `mutation createJob(
                $jobTitle: String, $description: String, $workplaceModes: String, 
                $specialisms: [String], $experience: Int, $qualification: String,
                $salary: Int, $expiredDate: Date, $display: Boolean, $jobPosition: String, 
                $employmentType: String, $employer: ID, $contact: ContactInput
            ) {
                createJob(
                    jobTitle: $jobTitle, description: $description, workplaceModes: $workplaceModes, 
                    specialisms: $specialisms, experience: $experience,
                    qualification: $qualification, salary: $salary, expiredDate: $expiredDate, 
                    employer: $employer, display: $display,
                    jobPosition: $jobPosition, employmentType: $employmentType, contact: $contact
                ) {
                    id
                }
            }`,
            variables: {
                jobTitle, description, specialisms, workplaceModes, experience, 
                qualification, salary, expiredDate, employer, display, jobPosition, 
                employmentType, contact
            }
        })

        const { createJob } = data.data
        return res.status(200).json({msg: 'Create Job Success', createJob})
        
    } catch (err) {
        console.log("[create-job] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}