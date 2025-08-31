import Router from "express";
import { upload } from "../middlewares/multer.middleware.js";
// MODIFIED: Import getAllFiles
import { fileUpload, getAllFiles } from "../controllers/file.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// MODIFIED: Switched to upload.single for simplicity, as it matches the controller logic
router.route("/fileUpload").post(verifyJWT, upload.single("file"), fileUpload);

// --- ADD THIS NEW ROUTE ---
router.route("/getAllFiles").get(verifyJWT, getAllFiles);

export default router;