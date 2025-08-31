import { File } from "../models/file.model.js";
import { User } from "../models/user.model.js";
import ApiError from "./ApiError.js";
import deletefromcloudinary from "./deletecloudinary.js";
const deleteExpiredFiles=async(user_id)=>{
    try {  
        // const expiredFiles=await File.aggregate([{
        //     $match:{
        //         expiryTimestamp: { $lt: new Date()}
        //     }},{
        //         $lookup:{
        //             from: 'users',
        //             localField:'owner',  
        //             foreignField: '_id', 
        //             as: 'owner'
        //     }
        // }])
        let user = await User.findById(user_id).select("-password");
        if(!user) throw new ApiError(400,"User not authenticated")
        if(user.allVideos.length==0){
            console.log("No files Uploaded!!!");
            return 1;
        }
        for (let i = 0; i < user.allVideos.length; i++) {
            const file_id = user.allVideos[i];
            const file=await File.findById(file_id);
            if(!file){
                throw new ApiError(400,"File not found!!!")
            }

            if(new Date()>file.expiryTimestamp){
            // Delete file from Cloudinary
            const delFromCloud=await deletefromcloudinary(file.public_id)
            if(!delFromCloud){
             throw new ApiError(400,"Error while deleting the file from cloud")
            }
            // Delete record from MongoDB
            user.allVideos.splice(i,1);
            const delFromDatabase=await File.findByIdAndDelete(file._id);
            if(!delFromDatabase){
             throw new ApiError(400,"Error while deleting fromn database")
            }
            console.log(`File deleted!!! with publicId '${file.public_id}'`);   
            // const user =await User.findById(file.owner)          
            //  const index =user.allVideos.indexOf(file._id)
         
             await user.save({validateBeforeSave:false})
             return 0;}
             return;
    }
        
           
        
        
       // }
   
 } catch (error) {
    console.log("Error while deletion of file",error);
 }
}
export default deleteExpiredFiles