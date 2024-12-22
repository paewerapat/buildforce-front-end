import { axiosQL } from "../../../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id, shortlisted } = req.body;
        const { updatetype } = req.headers
        if(updatetype === "add") {
            const { data } = await axiosQL.post('', {
                query: `mutation addEmployerShortlistedCandidate($id: ID, $shortlisted: ID) {
                    addEmployerShortlistedCandidate(id: $id, shortlisted: $shortlisted) {
                        id 
                    }
                }`,
                variables: {
                    id, shortlisted
                }
            })

            const { addEmployerShortlistedCandidate } = data.data;
            return res.status(200).json(addEmployerShortlistedCandidate)

        } else if (updatetype === "delete") {
            const { data } = await axiosQL.post('', {
                query: `mutation deleteEmployerShortlistedCandidate($id: ID, $shortlisted: ID) {
                    deleteEmployerShortlistedCandidate(id: $id, shortlisted: $shortlisted) {
                        id 
                    }
                }`,
                variables: {
                    id, shortlisted
                }
            })

            const { deleteEmployerShortlistedCandidate } = data.data;
            return res.status(200).json(deleteEmployerShortlistedCandidate)
        }
        
        return res.status(500).json({msg: 'Something wrong! Please try again.'})

    } catch (err) {
        console.log("[candidate-shortlisted-update] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.messages})
    }
}