import { useEffect, useRef, useState } from 'react';
import { useMessage } from './useMessage';
import { useBalanace } from './useBalance';
import { useTransactions } from './useTransactions';

export function useWebSocket(url:string,userId:number|null|undefined) {
  const [messages, setMessages] = useState<{ userId:number, token:string, status :string}|null>(null);
  const ws = useRef<WebSocket | null>(null);
  const {bark} = useMessage()
    const {resetBalance} = useBalanace()
    const {resetTransactions} = useTransactions()

  useEffect(() => {
 
    if(userId)  
  {  
    console.log("user",userId)
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
      // Send userId after connection is opened
     
      ws.current?.send(JSON.stringify({ userId: userId }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      resetBalance()
      resetTransactions()
      bark(data);

      console.log(data)
 
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
      
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
    console.log(message)
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        console.log(message)
      ws.current.send(JSON.stringify(message));
    }
  };

  return { messages, sendMessage };
}
