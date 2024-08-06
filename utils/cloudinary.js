import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const CLOUD_NAME="dgrpeevml"
const CLOUD_API_KEY="162845759345931"
const CLOUD_API_SECRET="pcGPe3T29XQLBrf93-pMqI33LA4" 
const CLOUD_API_ENVIRONMENT_VARIABLE="CLOUDINARY_URL=cloudinary://162845759345931:pcGPe3T29XQLBrf93-pMqI33LA4@dgrpeevml"

cloudinary.config({
     cloud_name: CLOUD_NAME,
     api_key: CLOUD_API_KEY,
     api_secret: CLOUD_API_SECRET
});

const uploadOnCloudinary = async (locafilepath) => {
     try {
          console.log(locafilepath,"localfilePath")
          if (!locafilepath) {
               return null;
          }
          const response = await cloudinary.uploader.upload(locafilepath, {
               resource_type: "auto",
          });
          console.log(response, "cloudinar file-upload response");
          fs.unlinkSync(locafilepath);
          console.log(locafilepath,"localfilePath")
          return response;
     } catch (error) {
          console.log("Error in cloudinary image upload :", error);
          fs.unlinkSync(locafilepath);
          return null;
     }
};

export { uploadOnCloudinary };
