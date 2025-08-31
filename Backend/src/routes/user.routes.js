import Router  from "express";
import { changePassword, generatenewtoken, loginUser, logoutUser, registerUser,getAllFiles, updateAccountDetails } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router()
router.route("/register").post(registerUser)//For registration of the user
router.route("/login").post(loginUser)//Logs in the user
router.route("/logout").post(logoutUser)//Logouts the user
router.route("/change-password").patch(verifyJWT,changePassword)//Changes the password
router.route("/refresh-token").post(generatenewtoken); //Generates new tokens for users who have logged out or token has expired
router.route("/getAllFiles").get(verifyJWT,getAllFiles) //Get all files for a particular user\
router.route("/update-account-details").post(verifyJWT,updateAccountDetails);//Updates account details of
export default router