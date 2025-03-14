import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useEffect, useContext, useRef } from "react";
import io from "socket.io-client";

const SocketContext = createContext<any>(null);

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({children}:{children:React.ReactNode}) => {
    const socketRef = useRef<any>(null);
    const {userInfo} = useAppStore();
    useEffect(()=>{
        if(userInfo){
            socketRef.current = io(HOST,{
                withCredentials:true,
                query:{
                    userId:userInfo.id
                }
            })
            socketRef.current.on("connect",()=>{
                console.log("connected to socket server");
            })
            return ()=>{
                socketRef.current.disconnect();
            }
        }
    },[userInfo])
    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    )
}
