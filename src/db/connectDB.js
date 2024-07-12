import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

async function connectDB() {

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        // console.log(connectionInstance?.connections[0].readyState, "connectionInstance")
        console.log(`MONGOdb connected at host : ${connectionInstance.connection.host}`)

    } catch (error) {
        console.error("Error In DB Connect :", error)
        process.exit(1)
    }

}

export default connectDB;
