import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
     cloud_name: process.env.CLOUD_NAME,
     api_key: process.env.CLOUD_API_KEY,
     api_secret: process.env.CLOUD_API_SECRET
});

const uploadOnCloudinary = async (locafilepath) => {
     try {
          if (!locafilepath) {
               return null;
          }
          const response = await cloudinary.uploader.upload(locafilepath, {
               resource_type: "auto",
          });
          console.log(response, "cloudinar file-upload response");
          fs.unlinkSync(locafilepath);
          return response;
     } catch (error) {
          console.log("Error in cloudinary image upload :", error);
          fs.unlinkSync(locafilepath);
          return null;
     }
};

export { uploadOnCloudinary };
