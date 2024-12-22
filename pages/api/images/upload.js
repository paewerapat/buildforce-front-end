import firebase, { storage } from '../../../lib/firebase'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Middleware } from '../../../lib/middleware';

export const config = {
    api: {
        bodyParser: false,
    },
};


export default Middleware(async (req, res) => {
    try {
        const fileReadStream = req.files[0]

        const imageEmployerRef = ref(storage, `images/employers/${fileReadStream.filename}`)

        const uploadImg = await uploadBytes(imageEmployerRef, fileReadStream);

        return res.status(200)
    } catch (error) {
        
    }
})