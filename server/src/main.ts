import express from "express";
import cookieParser from "cookie-parser";
import { connectToDatabase, disconnectFromDatabase } from "./utils/database";
import logger from "./utils/logger";
import cors from "cors";
import { CORS_ORIGIN } from "./constants";
import helmet from "helmet";
enum signalsEnum {
    SIGTERM = 'SIGTERM',
    SIGINT = 'SIGINT',
}
const signals: signalsEnum[] = [signalsEnum.SIGTERM, signalsEnum.SIGINT]

const PORT = process.env.PORT || 4000;
const app = express();


//define middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}));
app.use(helmet());

const server = app.listen(PORT, async () => {
    await connectToDatabase();
    logger.info(`Youtube Clone Server Listning ot http://localhost:${PORT} `);

})


function gracefullShutDown(signal: signalsEnum) {
    process.on(signal, async () => {
        server.close()
        //disconnect from DB
        await disconnectFromDatabase();
        logger.info(' Successfully ShutDown The Server');

        process.exit(0)
    })
}

signals.forEach((signal: signalsEnum) => {
    gracefullShutDown(signal)
})