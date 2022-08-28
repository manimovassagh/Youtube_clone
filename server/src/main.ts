import express from "express";


const PORT = process.env.PORT || 4000;
const app = express();



const server = app.listen(PORT, () => {
    console.log(`Youtube Clone Server Listning ot http://localhost:${PORT} `);

})

const signals = ['SIGTERM', 'SIGINT']

function gracefullShutDown(signal: string) {
    process.on(signal, async () => {
        server.close()
        //disconnect from DB
        process.exit(0)
    })
}

for (let index = 0; index < signals.length; index++) {
    gracefullShutDown(signals[index]);
}