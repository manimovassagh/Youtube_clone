import express from "express";


const PORT = process.env.PORT || 4000;
const app = express();



const server = app.listen(PORT, () => {
    console.log(`Youtube Clone Server Listning ot http://localhost:${PORT} `);

})


enum signalsEnum {
    SIGTERM = 'SIGTERM',
    SIGINT = 'SIGINT',
}
const signals: signalsEnum[] = [signalsEnum.SIGTERM, signalsEnum.SIGINT]



function gracefullShutDown(signal: signalsEnum) {
    process.on(signal, async () => {
        server.close()
        //disconnect from DB
        console.log(' Successfully ShutDown The Server');

        process.exit(0)
    })
}

for (let index = 0; index < signals.length; index++) {
    gracefullShutDown(signals[index]);
}