import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useUser } from "./UserProvider";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [user] = useUser();

  // Connect socket only once
  useEffect(() => {
    const socketInstance = io(`${process.env.REACT_APP_SOCKET_BASE_URL}`, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socketRef.current = socketInstance;
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("✅ Socket connected");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log(`❌ Socket disconnected: ${reason}`);
      setIsConnected(false);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Emit after both socket connected and user is available
  useEffect(() => {
    if (isConnected && user != null) {
      socketRef.current.emit("ConnectEveryone", user);
      console.log("📡 Emitted ConnectEveryone on READY:", user);
    }
  }, [isConnected, user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
