import { axiosQL } from "../../../../../lib/axios";

export default async function handler(req, res) {
    try {
        const { id, shortlisted } = req.body;
        const { updatetype } = req.headers;
        
        if(updatetype === "add") {
            const { data } = await axiosQL.post('', {
                query: `mutation addJobShortlistedCandidate($id: ID, $shortlisted: ID) {
                    addJobShortlistedCandidate(id: $id, shortlisted: $shortlisted) {
                        id
                    }
                }`,
                variables: {
                    id, shortlisted
                }
            })
    
            const { addJobShortlistedCandidate } = data.data;
            return res.status(200).json(addJobShortlistedCandidate)
        
        } else if (updatetype === "delete") {

            const { data } = await axiosQL.post('', {
                query: `mutation deleteJobShortlistedCandidate($id: ID, $shortlisted: ID) {
                    deleteJobShortlistedCandidate(id: $id, shortlisted: $shortlisted) {
                        id
                    }
                }`,
                variables: {
                    id, shortlisted
                }
            })

            const { deleteJobShortlistedCandidate } = data.data;
            return res.status(200).json(deleteJobShortlistedCandidate)
        }

        return res.status(500).json({msg: 'Something wrong! Please try again.'})

    } catch (err) {
        console.log("[candidate-shortlisted-update] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}