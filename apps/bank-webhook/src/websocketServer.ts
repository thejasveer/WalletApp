import WebSocket,  { WebSocketServer } from 'ws';
 const clients: Record<string,WebSocket>= {}

 
 interface IncomingMessage {
  userId?: string;
  [key: string]: any; // For other possible properties
}


export function startWebSocketServer(server: any){
    const wss = new WebSocketServer({ server: server });
    console.log("websocket")
    wss.on('connection', function connection(ws:WebSocket) {
      console.log("websocket server started")   
      ws.on('error', console.error);
        ws.on('error', console.error);
        let userId: string | null = null;
    //on message
    ws.on('message',(message)=>{

        try {
            const data:IncomingMessage = JSON.parse(message.toString())
            
            if (data.userId) {
           
              
                if (data.userId) {
                  clients[data.userId] = ws;
                  console.log("user"+data.userId +"connected")
                }
            
              }
     } catch (error) {
            console.error('Invalid message format:',message)
            
        }
    })
    ws.on('close',()=>{
    if(userId){
        delete clients[userId];
       
    }

    })
 });
}
export const sendMessage = (userId:number, message:{message:string;success:boolean}) => {
    const client = clients[userId];
    if (client) {
      client.send(JSON.stringify(message));
    }
  };