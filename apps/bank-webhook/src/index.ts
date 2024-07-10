import express from "express";
import cors from 'cors'
import { webhookRouter } from "./routers/webhookRouter";
import dotenv from 'dotenv';
import { startWebSocketServer } from "./websocketServer";
 
dotenv.config({ path: __dirname + "/../../../.env" })
const PORT_EXPRESS_WEBHOOK =  process.env.PORT_EXPRESS_WEBHOOK 
 

const app = express();

// app.use(cors())
app.use(express.json())
 

app.use('/',webhookRouter);
//http server for web socket
 
const server = app.listen(PORT_EXPRESS_WEBHOOK,()=>{
    console.log("Web server running on port "+ PORT_EXPRESS_WEBHOOK)
})
startWebSocketServer(server)



 