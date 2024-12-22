import { axiosQL } from "../../../lib/axios";


export default async function handler(req, res) {
    try {
        
        const { data } = await axiosQL.post('', {
            query: `query allJob {
                allJob {
                    jobPosition
                }
            }`
        })

        const { allJob } = data.data;
        return res.status(200).json(allJob)

    } catch (err) {
        console.log("[all-job] err - ", err)
        return res.status(500).json({msg: err.response.data.errors})
    }
}