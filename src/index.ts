import dotenv from "dotenv";
import { connect } from "mongoose";
dotenv.config();


export async function connectDB() {
    return new Promise((resolve, reject) => {
        if (process.env.MONGODB_URI === undefined) {
            return reject("MONGODB_URI not set, please provide a valid database url.");
        }

        connect(process.env.MONGODB_URI).then(resolve).catch(reject);
    });
}
