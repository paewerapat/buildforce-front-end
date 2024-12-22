import { axiosQL } from "../../../../../lib/axios";


export default async function handler(req, res) {
    try {
        const { id, shortlisted } = req.body;
        const { updatetype } = req.headers;
        
        if(updatetype === 'add') {
            const { data } = await axiosQL.post('', {
                query: `mutation addCandidateToShortlistedEmployer($id: ID, $shortlisted: ID) {
                    addCandidateToShortlistedEmployer(id: $id, shortlisted: $shortlisted) {
                        id
                    }
                }`,
                variables: {
                    id, shortlisted
                }
            })
    
            const { addCandidateToShortlistedEmployer } = data.data;
            return res.status(200).json(addCandidateToShortlistedEmployer)

        } else if(updatetype === 'delete') {

            const { data } = await axiosQL.post('', {
                query: `mutation deleteCandidateShortlistedEmployer($id: ID, $shortlisted: ID) {
                    deleteCandidateShortlistedEmployer(id: $id, shortlisted: $shortlisted) {
                        id
                    }
                }`,
                variables: {
                    id, shortlisted
                }
            })
    
            const { deleteCandidateShortlistedEmployer } = data.data;
            return res.status(200).json(deleteCandidateShortlistedEmployer)
        }

        return res.status(500).json({msg: 'Something wrong! Please try again.'})

    } catch (err) {
        console.log("[add-shortlisted-employer] err - ", err)
        return res.status(500).json({msg: err.response.data})
    }
}