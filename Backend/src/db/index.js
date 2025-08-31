import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
//DATABASE CONNECTION
import dotenv from "dotenv"
dotenv.config({path:".\env.sample"})
const ConnectDB = async () => {
    try {
        const connectionIns = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`\nMONGODB CONNECTED!|| DB HOST =>${connectionIns.connection.host}`);
    } catch (error) {
        console.log("ERROR IN CONNECTING DATABASE", error);
        process.exit(1);
    }
};
export default ConnectDB;
