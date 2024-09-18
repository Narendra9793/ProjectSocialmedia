import React, { createContext, useMemo, useContext, useEffect } from "react";
import * as io from "socket.io-client";
import { SOCKET_BASE_URL } from "../constants/apiConstants";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {

  const socket = useMemo(() => {
    const newSocket = io(SOCKET_BASE_URL, {
      reconnection: false,
    });
    return newSocket;
  }, []); 

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the Socket server');
    });
    return () => {
      socket.disconnect();
      console.log('Socket disconnected');
    };
  }, [socket]);
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
