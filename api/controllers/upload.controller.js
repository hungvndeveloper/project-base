import { v2 as cloudinary } from "cloudinary";
import createError from "../utils/createError.js";

export const uploadImageFromLocal = async (req, res, next) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        const { file } = req;
        const { upload_preset } = req.body;
        if (!file) {
            return next(createError(404, "You are missing file"));
        }
        const folderName = upload_preset ? upload_preset : "fiverr";
        const result = await cloudinary.uploader.upload(file.path, {
            folder: folderName,
        });
        const data = {
            url: result.secure_url,
            success: true
        };

        res.status(201).send(data);
    } catch (error) {
        next(error);
    }
};
