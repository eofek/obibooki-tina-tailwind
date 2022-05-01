import { mediaHandlerConfig, createMediaHandler} from 'next-tinacms-cloudinary/dist/handlers'
import { isAuthorized } from '@tinacms/auth'

export const config = mediaHandlerConfig

export default createMediaHandler({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_JEY,
    api_secret: process.env.CLOUDINARY_SECRET,

    authorized: async (req) => {
        if(process.env.NODE_ENV == 'development') {
            return true
        }
        try {
            const user = await isAuthorized(req)
            return user && user.verified
        } catch(e) {
            console.log(e)
            return false
        }
    }
})