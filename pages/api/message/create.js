import axios from "../../../lib/axios";
const graphqlURL = process.env.GRAPHQL_URL;

export default async function(req, res) {
    try {
        const { sender, recipient, text } = req.body;

        if(!recipient || (!text.trim())) return;

        const newConversation = await axios.post()

        const newMessage = await axios.post()

        return res.status(200).json({msg: 'Create message success'})
    } catch (error) {
        
    }
}