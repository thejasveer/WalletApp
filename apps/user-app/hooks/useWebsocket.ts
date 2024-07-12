import { useEffect, useRef, useState } from 'react';
import { useMessage } from './useMessage';
import {  useBalance } from './useBalance';
import { useTransactions } from './useTransactions';
import {useRecoilValue} from '@repo/store';
import { userAtom } from '@repo/store';
 
 
 
export function useWebSocket() {
 
  const [messages, setMessages] = useState<{ userId:number, token:string, status :string}|null>(null);
  const ws = useRef<WebSocket | null>(null);
  const {bark} = useMessage()
    const {resetBalance} = useBalance()
    const {resetTransactions} = useTransactions()
    const user = useRecoilValue(userAtom)

 
  useEffect(() => {
    
    if (user && user.id) {
      
     if (ws.current == null) {
    
 
      ws.current = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL||'');
      console.log("Connected to WebSocket URL:", process.env.NEXT_PUBLIC_WEBSOCKET_URL);
     }

      ws.current.onopen = () => {
        console.log("WebSocket connection opened");
        ws.current?.send(JSON.stringify({ userId: user?.id }));
      };

      ws.current.onmessage = (event) => {
        console.log("WebSocket message received");
        const data = JSON.parse(event.data);
        resetBalance();
        resetTransactions();
        bark(data);
      };

      ws.current.onclose = () => {
        console.log("WebSocket connection closed");
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN && !user) {
        ws.current.close();
      }
    };
  }, [user]);

  const sendMessage = (message:any) => {
    
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
     
      ws.current.send(JSON.stringify(message));
    }
  };

  return { messages, sendMessage};
}
