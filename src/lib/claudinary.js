import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARYNAME, 
    api_key:    process.env.CLOUDINARYKEY, 
    api_secret: process.env.CLOUDINARYSECRET
});

export default cloudinary;
