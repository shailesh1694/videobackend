import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import { app } from "./app.js"

dotenv.config({ path: `./${process.env.NODE_ENV}.env` })
console.log(process.env.PORT,"Port")
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8080, () => {
            console.log(`server start at ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log("DB Connection Failed :", error)
    })










