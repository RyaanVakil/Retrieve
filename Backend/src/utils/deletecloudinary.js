import {v2 as cloudinary} from 'cloudinary';
//what we are gonna do is stpre the uploaded file temporarily in our server and
//then upload it to cloudinary and then delete it   (unlinking it)          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
}) 
const deletefromcloudinary=async(public_id)=>{
try {
    if(!public_id){
        return null
        
    }
    
    const deleteFile=await cloudinary.uploader.destroy(public_id);
    if(deleteFile)console.log("File is succesfully deleted from cloud");
    return deleteFile

} catch (error) {
    console.log("Error while deletion of the file in cloud",error);
}
}
export default deletefromcloudinary