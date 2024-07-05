import { useEffect, useRef, useState } from 'react';
import { useMessage } from './useMessage';
import {  useBalance } from './useBalance';
import { useTransactions } from './useTransactions';

export function useWebSocket(url:string|undefined,userId:number|null|undefined) {
  const [messages, setMessages] = useState<{ userId:number, token:string, status :string}|null>(null);
  const ws = useRef<WebSocket | null>(null);
  const {bark} = useMessage()
    const {resetBalance} = useBalance()
    const {resetTransactions} = useTransactions()

  useEffect(() => {
    console.log(url)
 
    if(userId&& url)  
  {  
    console.log("SS",url)
   
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("conn")
 
      // Send userId after connection is opened
     
      ws.current?.send(JSON.stringify({ userId: userId }));
    };

    ws.current.onmessage = (event) => {
      console.log("mess")
      const data = JSON.parse(event.data);
      resetBalance()
      resetTransactions()
      bark(data);

     
 
    };

    ws.current.onclose = () => {
      
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
 
}
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [userId]);

  const sendMessage = (message:any) => {
    
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
     
      ws.current.send(JSON.stringify(message));
    }
  };

  return { messages, sendMessage };
}
