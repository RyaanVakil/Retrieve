import mongoose from"mongoose"
import bcrypt  from "bcrypt";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
const userSchema= mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        trim:true,
        index:true,
        required:true,
        
    },rollNumber:{trim:true,
        index:true,
        type:Number,
    },
    fullName:{
        type:String,
        trim:true,
        index:true
    },
        password:{
            type:String,
            required:true
        },
        refreshToken:{
            type:String
        },
        allVideos:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"File"
        }],email:{
            type:String
        }
    
},{timestamps:true})
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=await bcrypt.hash(this.password,10)
    next();
})
userSchema.methods.isPasswordCorrect= async function(password){
if(!password){
    throw new ApiError(400,"Password is missing")
}
return await  bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessToken=function(){
return jwt.sign({
    _id:this._id,
    userName:this.userName
},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
}
userSchema.methods.generateRefershAccessToken=function(){
return jwt.sign({
    _id:this._id
},process.env.REFRESH_ACCESS_TOKEN_SECRET,{expiresIn:process.env.REFRESH_ACCESS_TOKEN_EXPIRY});
}
export const User=mongoose.model("User",userSchema)