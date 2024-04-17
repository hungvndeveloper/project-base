import express from "express";
import { uploadImageFromLocal } from "../controllers/upload.controller.js";
import multer from "multer";
const uploadDisk = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./uploads/");
        },
        filename: function (req, file, cb) {
            // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            // cb(null, file.fieldname + '-' + uniqueSuffix)
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
});

const router = express.Router();

router.post("/image", uploadDisk.single("file"), uploadImageFromLocal);
export default router;
