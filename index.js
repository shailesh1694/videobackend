import dotenv from "dotenv";
dotenv.config({ path: `./.env` });

import connectDB from "./db/connectDB.js";
import { app } from "./app.js";



connectDB()
     .then(() => {
          app.on("error", (error) => {
               console.log("ERRR : ", error);
               throw error;
          });
          app.listen(process.env.PORT || 8080, () => {
               console.log(`server start at ${process.env.PORT}`);
          });
     })
     .catch((error) => {
          console.log("DB Connection Failed :", error);
     });
