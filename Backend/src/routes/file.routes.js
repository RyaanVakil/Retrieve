import Router from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { fileUpload, getAllFiles } from "../controllers/file.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/fileUpload").post(verifyJWT, upload.single("file"), fileUpload);

router.route("/getAllFiles").get(verifyJWT, getAllFiles);

export default router;