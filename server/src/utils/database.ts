import mongoose from "mongoose";
import logger from "./logger";
const DB_Connection_STRING = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/youtube-clone";
export async function connectToDatabase() {
    try {
        await mongoose.connect(DB_Connection_STRING)
        logger.info("Connected to database")
    }
    catch (e) {
        logger.error("Failed to Connect to database, OOPS!!!")
        process.exit(1)
    }
}

export async function disconnectFromDatabase() {
    await mongoose.connection.close();
    logger.info("Disconnected From Database dude !!!")
    return
}