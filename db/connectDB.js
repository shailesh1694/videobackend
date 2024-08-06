import mongoose from "mongoose";
import { DB_NAME,PRODUCT_DB } from "../constant.js";

async function connectDB() {
     try {
          const connectionInstance = await mongoose.connect(
               `${process.env.MONGO_URI}/${PRODUCT_DB}`
          );
          // console.log(connectionInstance?.connections[0].readyState, "connectionInstance")
          console.log(
               `MONGOdb connected at host : ${connectionInstance.connection.host}`
          );
     } catch (error) {
          console.error("Error In DB Connect :", error);
          process.exit(1);
     }
}

export default connectDB;
