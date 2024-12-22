import { axiosQL } from "../../../../lib/axios"


export default async function handler(req, res) {
    try {
        const { id, shortlisted } = req.body
        const { updatetype } = req.headers;

        if(updatetype === "add") {
            const { data } = await axiosQL.post('', {
                query: `mutation addApplicantToShortlistedEmployer($id: ID, $shortlisted: ID) {
                    addApplicantToShortlistedEmployer(id: $id, shortlisted: $shortlisted) {
                        id
                    }
                }`,
                variables: {
                    id, shortlisted
                }
            })
    
            const { addApplicantToShortlistedEmployer } = data.data;
            return res.status(200).json(addApplicantToShortlistedEmployer);

        } else if (updatetype === "delete") {
            const { data } = await axiosQL.post('', {
                query: `mutation deleteApplicantShortlistedEmployer($id: ID, $shortlisted: ID) {
                    deleteApplicantShortlistedEmployer(id: $id, shortlisted: $shortlisted) {
                        id
                    }
                }`
            })

            const { deleteApplicantShortlistedEmployer } = data.data;
            return res.status(200).json(deleteApplicantShortlistedEmployer)

        }
        
        return res.status(400).json({msg: 'Something wrong! Please try again.'})

    } catch (err) {
        console.log("[update-shortlisted-employer] err - ", err.response.data.errors)
        return res.status(500).json({msg: err.response.data.errors})
    }
}