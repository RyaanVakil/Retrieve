import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
const generateTokens = async (user_id) => {
    const user = await User.findById(user_id); //Finding the user
    //Generating the tokens
    const accessToken = user.generateAccessToken();
    const refreshAccessToken = user.generateRefershAccessToken();
    user.refreshToken = refreshAccessToken;
    await user.save({ validateBeforeSave: false }); //Saving it in the user
    return { accessToken, refreshAccessToken };
};
const registerUser = asyncHandler(async (req, res) => {
    //TODOS
    //Take input from the user
    //Check if input is coming correctly or not
    //Check if it exist or not
    //if not create a new user
    //from response remove password and refershToken
    const { userName, password } = req.body;
    //console.log(req.body);
    if (userName === "") {
        throw new ApiError(400, "Username is required!");
    }
    if (password === "") {
        throw new ApiError(400, "Password is required!");
    }
    //Checking if user exits or not
    const existedUser = await User.findOne({ userName });
    if (existedUser) {
        throw new ApiError(400, "User already exists");
    }
    //Creating the user
    const user = await User.create({
        userName: userName,
        password: password,
    });
    //Checking if user is created or not
    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if (!userCreated) {
        throw new ApiError(400, "Error in registering user!");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, userCreated, "User Registered Successfully")
        );
});
const loginUser = asyncHandler(async (req, res) => {
    const { userName, password } = req.body; //Takes input
    if (userName === "") {
        throw new ApiError(400, "Username required");
    }
    if (password === "") {
        throw new ApiError(400, "Password required");
    }

    const user = await User.findOne({userName}); //Finds the user in the database
    if (!user) {
        throw new ApiError(400, "User not found");
    }
    const isValid = await user.isPasswordCorrect(password); //Checks if the password is correct or not
    if (!isValid) {
        throw new ApiError(400, "Wrong password entered!");
    }
    const Options = {
        httpOnly: true,
        secure: true,
        domain: 'localhost',
        path: '/',
    };
    //Generating accesstokens
    const { accessToken, refreshAccessToken } = await generateTokens(user._id);
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    return res
        .status(200)
        .cookie("accessToken", accessToken, Options)
        .cookie("refreshAccessToken", refreshAccessToken, Options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshAccessToken },
                "User Logged in Successfully!"
            )
        );
});
const logoutUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        { new: true }
    );
    const Options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .clearCookie("accessToken", Options)
        .clearCookie("refreshAccessToken", Options)
        .json(new ApiResponse(200, "User Logged out successfully!!"));
});
const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (newPassword != confirmNewPassword) {
        throw new ApiError(400, "Password does not match");
    }
    if (!oldPassword) {
        throw new ApiError(400, "Password is required!!!");
    }

    const user = await User.findById(req.user?._id);
    const isPasswordValid = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Password");
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    return res
        .status(200)
        .json(new ApiResponse(200, "Password Changed Succssfully!!"));
});
const generatenewtoken = asyncHandler(async (req, res) => {
    const token = req.cookies?.refreshAccessToken;
    if (!token) {
        throw new ApiError(401, "Please login again to get access");
    }
    const decodedToken = jwt.verify(
        token,
        process.env.REFRESH_ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
        throw new ApiError(401, "The user no longer exists");
    }
    const { accessToken, refreshAccessToken } = await generateTokens(user._id);
    const Options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, Options)
        .cookie("refreshAccessToken", refreshAccessToken, Options)
        .json(
            new ApiResponse(
                200,
                { accessToken, refreshAccessToken },
                "Access Token changed Successfully!!"
            )
        );
});
const getAllFiles = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id:new mongoose.Types.ObjectId(req.user?._id)
            }
        },  
        {
            $lookup: {
                from: "files",
                localField: "allVideos",
                foreignField: "_id",
                as: "docs",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            
                        },
                    },{
                        $project:{
                            _id:0,
                            public_id:1,
                            url:1,
                            uploadTimestamp:1,
                            expiryTimestamp:1
                            
                        }
                    }
                ],
            },
        },
    ])
        return res
        .status(200)
        .json(new ApiResponse(200,user[0].docs, "Successfully got all files"));
});
const updateAccountDetails=asyncHandler(async(req,res)=>{
    const {rollNumber,email,fullName }= req.body;
    if(rollNumber===""){
        throw new ApiError(400,"Roll number is required!!!")
    }
    if(fullName===""){
        throw new ApiError(400,"Full Name is required!!!")
    }
    if(email===""){
        throw new ApiError(400,"Email is required!!!")
    }
    const user =await User.findByIdAndUpdate(req.user?._id,{$set:{
        fullName:fullName,email:email,rollNumber:rollNumber
    }},{new:true}).select("-password -refreshToken")
    if(!user){
        throw new ApiError(404,"User not found!!!");
    }
return res.status(200)
.json(new ApiResponse(200,{user},"Updated Account Details Successfully"))

});
export {
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    generatenewtoken,
    getAllFiles,
    updateAccountDetails
};
