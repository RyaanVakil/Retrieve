import { File } from "../models/file.model.js";
import cron from "node-cron";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import deleteExpiredFiles from "../utils/deleteExpiredFiles.js"
import moment from "moment-timezone"; 

const fileUpload = asyncHandler(async (req, res) => {
    // MODIFIED: Use req.file from upload.single for simplicity
    const filelocalPath = req.file?.path;

    if (!filelocalPath) {
        throw new ApiError(400, "File is missing!!!")
    }

    const uploadedfile = await uploadoncloudinary(filelocalPath);
    if (!uploadedfile) {
        throw new ApiError(400, "Error while uploading the file")
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(400, "User is not logged in!");
    }

    const file = await File.create({
        url: uploadedfile.url,
        // ADDED: Save the original filename for display
        originalName: req.file.originalname, 
        owner: user._id,
        public_id: uploadedfile.public_id,
        expiryTimestamp: moment().tz("Asia/Kolkata").add(2, "minutes").toDate()
    });

    const fileAsset = await File.findById(file._id).select("-owner -expiryTimestamp");
    if (!fileAsset) {
        throw new ApiError(500, "Internal Server Error!!");
    }
    
    const cronJob = cron.schedule('* * * * *', () => {
        const delFile = deleteExpiredFiles(user._id);
        if (delFile == 1) {
            cronJob.stop();
            console.log("No files Uploaded!!!");
        }
    }, {
        timezone: "Asia/Kolkata"
    });

    return res.status(200).json(new ApiResponse(200, fileAsset, "File has been uploaded successfully"));
});


const getAllFiles = asyncHandler(async (req, res) => {
    // Find all files where the owner matches the logged-in user's ID
    const files = await File.find({ owner: req.user._id }).sort({ createdAt: -1 });

    if (!files) {
        // This case is unlikely but good to handle
        throw new ApiError(404, "Could not find any files for this user.");
    }

    return res.status(200).json(new ApiResponse(200, files, "Files retrieved successfully"));
});


export { fileUpload, getAllFiles };