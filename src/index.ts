import dotenv from "dotenv";
import { connect } from "mongoose";
dotenv.config();


export async function connectDB(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (process.env.MONGODB_URI === undefined) {
            return reject("MONGODB_URI not set, please provide a valid database url.");
        }

        connect(process.env.MONGODB_URI)
            .then(() => {
                console.log("Connected to database.");
                resolve();
            })
            .catch(err => {
                console.error(`Failed to connect to database: ${err}`);
                reject(err);
            });
    });
}
